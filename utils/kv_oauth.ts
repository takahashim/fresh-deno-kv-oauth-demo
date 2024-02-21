import "$std/dotenv/load.ts";

import {
  createGitHubOAuth2Client,
  createGoogleOAuth2Client,
} from "kv_oauth/mod.ts";

const githubOauth2ClientConfig = {
  redirectUri: Deno.env.get("GITHUB_REDIRECT_URI")!,
};
export const githubOauth2Client = createGitHubOAuth2Client(githubOauth2ClientConfig);

const googleOauth2ClientConfig = {
  redirectUri: Deno.env.get("GOOGLE_REDIRECT_URI")!,
  defaults: {
    scope: "https://www.googleapis.com/auth/userinfo.email",
  },
};
export const googleOauth2Client = createGoogleOAuth2Client(googleOauth2ClientConfig);
