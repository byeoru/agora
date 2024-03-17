import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseURL = "https://nid.naver.com/oauth2.0/authorize";
  const encodedRedirectURL = encodeURI(
    `http://${request.nextUrl.host}/naver/complete`
  );
  const params = {
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri: encodedRedirectURL,
    state: process.env.NAVER_OAUTH_STATE!,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
