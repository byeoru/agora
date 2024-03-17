import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return notFound();
  }

  const accessTokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NAVER_CLIENT_ID!,
    client_secret: process.env.NAVER_CLIENT_SECRET!,
    code,
    state,
  }).toString();
  const accessTokenURL = `https://nid.naver.com/oauth2.0/token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const { error, access_token, token_type } = await accessTokenResponse.json();
  if (error) {
    return notFound();
  }

  const userProfileResponse = await fetch(
    "https://openapi.naver.com/v1/nid/me",
    {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
      cache: "no-cache",
    }
  );

  const {
    resultcode,
    response: { id, nickname, profile_image },
  } = await userProfileResponse.json();

  switch (resultcode) {
    case "024":
    case "028":
    case "403":
    case "404":
    case "500":
      return notFound();
  }

  const user = await db.user.findUnique({
    where: {
      naver_id: id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  } else {
    const user = await db.user.create({
      data: {
        naver_id: id.toString(),
        username: nickname,
        avatar: profile_image,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
