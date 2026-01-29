import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SubscribedEmail from "@/models/subscribedEmail";
import sendEmail from "@/lib/mail";

// GET: Fetch all subscribers
export async function GET() {
    try {
        await dbConnect();
        const emails = await SubscribedEmail.find({}).sort({ createdAt: -1 });
        return NextResponse.json(emails);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Subscribe
export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        await dbConnect();

        // Check if exists
        const existing = await SubscribedEmail.findOne({ email });
        if (existing) {
            return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
        }

        // Save to DB
        await SubscribedEmail.create({ email });

        // Send Welcome Email
        const subject = "Welcome to Desi Elegance! 🌿";
        const html = `
      <div style="font-family: 'Times New Roman', serif; color: #333; padding: 40px; background-color: #f9f8f6; text-align: center;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 40px; border: 1px solid #e5e5e5;">
          <h1 style="color: #1a1a1a; letter-spacing: 2px; margin-bottom: 20px;">DESI ELEGANCE</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Welcome to the Desi Elegance family!
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Thank you for subscribing to our newsletter. You've just unlocked exclusive access to our latest collections, styling tips, and special offers tailored just for you.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #555; margin-top: 30px;">
            We are thrilled to have you with us on this journey of timeless beauty and tradition.
          </p>
          <div style="margin-top: 40px; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} Desi Elegance. All rights reserved.
          </div>
        </div>
      </div>
    `;

        await sendEmail({ to: email, subject, html });

        return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Subscription Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
