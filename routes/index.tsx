import { getSessionAccessToken, getSessionId } from "kv_oauth/mod.ts";
import { githubOauth2Client, googleOauth2Client } from "../utils/kv_oauth.ts";

export default async function HomePage(req: Request) {
  const sessionId = await getSessionId(req);
  const isSignedIn = sessionId !== undefined;
  const githubAccessToken = isSignedIn
    ? await getSessionAccessToken(githubOauth2Client, sessionId)
    : null;
  const googleAccessToken = isSignedIn
    ? await getSessionAccessToken(googleOauth2Client, sessionId)
    : null;

  const accessToken = githubAccessToken || googleAccessToken;

  return (
    <>
      <p>Provider: GitHub / Google</p>
      <p>Signed in: {accessToken ? "true" : "false"}</p>
      <p>
        Your access token: {accessToken !== null
          ? (
            <span>
              <span style="filter:blur(3px)">
                ${accessToken}
              </span>
              <span>(intentionally blurred for security)</span>
            </span>
          )
          : null}
      </p>
      <p>
        <a href="/oauth/github/signin">GtiHub Sign in</a>
      </p>
      <p>
        <a href="/oauth/github/signout">GitHub Sign out</a>
      </p>
      <p>
        <a href="/oauth/google/signin">Google Sign in</a>
      </p>
      <p>
        <a href="/oauth/google/signout">Google Sign out</a>
      </p>
    </>
  );
}
