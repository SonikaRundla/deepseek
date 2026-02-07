import { Webhook } from "svix";
import { connectDB } from  "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    return NextResponse.json(
      { error: "Missing Clerk webhook secret" },
      { status: 500 }
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  // ✅ headers() MUST be awaited
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  // ✅ Get RAW body (this is the real fix)
  const body = await req.text();

  let event;
  try {
    event = wh.verify(body, svixHeaders);
  } catch (err) {
    console.error("Webhook verification error:", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  const { data, type } = event;

  const userData = {
    _id: data.id,
    email: data.email_addresses?.[0]?.email_address || "",
    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    image: data.image_url || "",
  };

  await connectDB();

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;

    case "user.updated":
      await User.findByIdAndUpdate(data.id, userData);
      break;

    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      break;

    default:
      break;
  }

  return NextResponse.json({ success: true });
}
