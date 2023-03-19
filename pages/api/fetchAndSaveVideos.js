// pages/api/fetchAndSaveVideos.js
import { getSession } from "next-auth/react";
import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    try {
      const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
      });

      const query = "programming";
      const { data } = await youtube.search.list({
        part: "snippet",
        type: "video",
        q: query,
        videoDefinition: "high",
        maxResults: 5,
        fields:
          "items(id(videoId),snippet(publishedAt,channelId,channelTitle,title,description,thumbnails(default(url))))",
      });

      const videos = data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl: item.snippet.thumbnails.default.url,
      }));

      await Promise.all(
        videos.map((video) =>
          prisma.video.upsert({
            where: { videoId: video.videoId },
            update: {},
            create: video,
          })
        )
      );

      res.status(200).json({ message: "Videos fetched and saved" });
    } catch (error) {
      console.error("Failed to fetch and save videos", error);
      res.status(500).json({ error: "Failed to fetch and save videos" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
