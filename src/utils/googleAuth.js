import axios from "axios";

export const handleGoogleCallback = async (code) => {
  const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

  try {
    const response = await axios.post(GOOGLE_TOKEN_URL, {
      code: code,
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/auth/callback",
      grant_type: "authorization_code",
    });

    return response.data;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return null;
  }
};

export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
