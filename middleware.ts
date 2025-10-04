import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { auth } from "@/lib/auth";
import aj from "./lib/arcjet";
import { createMiddleware, detectBot, shield } from "@arcjet/next";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
};

const ajmiddleware = createMiddleware(
  aj
    .withRule(
      shield({
        mode: "LIVE",
      })
    )
    .withRule(
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "G00G1E_CRAWLER", "CATEGORY:PREVIEW"],
      })
    )
);

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const arcjetResponse = await ajmiddleware(request, event);
  if (arcjetResponse?.status === 403) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (arcjetResponse?.status === 429) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}
