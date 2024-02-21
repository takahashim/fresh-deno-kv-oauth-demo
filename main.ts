/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import { kvOAuthPlugin } from "kv_oauth/fresh.ts";
import { githubOauth2Client, googleOauth2Client } from "./utils/kv_oauth.ts";

await start(
  manifest,
  {
    plugins: [
      kvOAuthPlugin(githubOauth2Client, {
        signInPath: "/oauth/github/signin",
        signOutPath: "/oauth/github/signout",
        callbackPath: "/oauth/github/callback",
      }),
      kvOAuthPlugin(googleOauth2Client, {
        signInPath: "/oauth/google/signin",
        signOutPath: "/oauth/google/signout",
        callbackPath: "/oauth/google/callback",
      }),
    ],
  },
);
