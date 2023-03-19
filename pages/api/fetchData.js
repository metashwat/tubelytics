import { getSession } from "next-auth/react";
import { google } from "googleapis";
import axios from 'axios';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const authClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    authClient.setCredentials({ access_token: session.accessToken });

    const youtubeAnalytics = google.youtubeAnalytics_v2({ auth: authClient });

    const channelId = "UCCgvKmh0wJ59eqW2FyYPfSg"; // Replace with the channel ID you want to fetch data for

    const analyticsResponse = await youtubeAnalytics.reports.query({
      ids: `channel==${channelId}`,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      metrics: "views,likes,dislikes,shares,averageViewDuration",
    });

    // Process the data from the YouTube Analytics API as needed

    res.status(200).json({ data: analyticsResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data from YouTube Analytics API" });
  }
}
