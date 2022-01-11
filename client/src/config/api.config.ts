const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export default {
  baseUrl,
  jsonPayloadSecret:
    process.env.REACT_APP_JSON_PAYLOAD_SECRET || 'AVerySecretSecret',
  routes: {
    discordAuth: `${baseUrl}/auth/discord/login`,
    currentUser: `${baseUrl}/user/current`,
    played: `${baseUrl}/games/flappydronie/played`,
    recentHighScores: `${baseUrl}/games/flappydronie/recent-highscores`,
  },
};
