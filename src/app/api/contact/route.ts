import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Helper function to escape HTML to prevent script injection in the email client
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Simple email regex validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message } = body;

    // 1. Server-Side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Invalid name. Name must be between 2 and 100 characters." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email) || email.length > 150) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    if (company && (typeof company !== "string" || company.length > 100)) {
      return NextResponse.json({ error: "Invalid company name. Maximum 100 characters." }, { status: 400 });
    }

    if (phone && (typeof phone !== "string" || phone.length > 30)) {
      return NextResponse.json({ error: "Invalid phone number. Maximum 30 characters." }, { status: 400 });
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3 || subject.length > 150) {
      return NextResponse.json({ error: "Invalid subject. Subject must be between 3 and 150 characters." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.length > 3000) {
      return NextResponse.json({ error: "Invalid message. Message must be between 10 and 3000 characters." }, { status: 400 });
    }

    // 2. Input Sanitization
    const cleanName = escapeHtml(name.trim());
    const cleanEmail = escapeHtml(email.trim());
    const cleanCompany = company ? escapeHtml(company.trim()) : "N/A";
    const cleanPhone = phone ? escapeHtml(phone.trim()) : "N/A";
    const cleanSubject = escapeHtml(subject.trim());
    const cleanMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
    const submissionDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + " (IST)";

    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "udhayakumars0101@gmail.com";

    // 3. Fallback Mode if API Key is not set
    if (!resendApiKey) {
      console.warn("====================================================================");
      console.warn("WARNING: RESEND_API_KEY is not configured in environment variables.");
      console.warn("CONTACT FORM IS RUNNING IN DEVELOPMENT / MOCK FALLBACK MODE.");
      console.warn("--------------------------------------------------------------------");
      console.warn(`Date: ${submissionDate}`);
      console.warn(`From: ${cleanName} <${cleanEmail}>`);
      console.warn(`Company: ${cleanCompany}`);
      console.warn(`Phone: ${cleanPhone}`);
      console.warn(`Subject: ${cleanSubject}`);
      console.warn(`Message: ${cleanMessage.replace(/<br \/>/g, "\n")}`);
      console.warn("====================================================================");

      return NextResponse.json(
        {
          success: true,
          message: "Contact form submitted successfully (Mock Mode).",
          mocked: true,
        },
        { status: 200 }
      );
    }

    // 4. Send Email via Resend
    const resend = new Resend(resendApiKey);
    const emailResult = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: receiverEmail,
      subject: `New Portfolio Contact from ${cleanName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Contact</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #f8fafc;
              background-color: #030014;
              margin: 0;
              padding: 24px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(9, 6, 28, 0.85);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 16px;
              padding: 32px;
              box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
            }
            .header {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .title {
              font-size: 20px;
              font-weight: 700;
              color: #00f0ff;
              margin: 0 0 6px 0;
            }
            .subtitle {
              font-size: 12px;
              color: #8b5cf6;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              font-family: monospace;
              margin: 0;
            }
            .field-row {
              margin-bottom: 18px;
            }
            .label {
              font-size: 11px;
              font-family: monospace;
              text-transform: uppercase;
              color: #64748b;
              margin-bottom: 4px;
              letter-spacing: 1px;
            }
            .value {
              font-size: 14px;
              color: #e2e8f0;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.05);
              border-radius: 8px;
              padding: 10px 14px;
              word-break: break-all;
            }
            .value-message {
              white-space: pre-wrap;
              line-height: 1.6;
            }
            .footer {
              margin-top: 32px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              padding-top: 16px;
              font-size: 11px;
              color: #475569;
              text-align: center;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 class="title">Contact Form Submission</h2>
              <p class="subtitle">Faang Portfolio Gateway</p>
            </div>
            
            <div class="field-row">
              <div class="label">Visitor Name</div>
              <div class="value">${cleanName}</div>
            </div>

            <div class="field-row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${cleanEmail}" style="color: #00f0ff; text-decoration: none;">${cleanEmail}</a></div>
            </div>

            <div class="field-row">
              <div class="label">Company</div>
              <div class="value">${cleanCompany}</div>
            </div>

            <div class="field-row">
              <div class="label">Phone Number</div>
              <div class="value">${cleanPhone}</div>
            </div>

            <div class="field-row">
              <div class="label">Subject</div>
              <div class="value">${cleanSubject}</div>
            </div>

            <div class="field-row">
              <div class="label">Message Payload</div>
              <div class="value value-message">${cleanMessage}</div>
            </div>

            <div class="field-row">
              <div class="label">Timestamp</div>
              <div class="value" style="font-family: monospace;">${submissionDate}</div>
            </div>

            <div class="footer">
              This message was sent automatically from your Next.js Portfolio Contact Gateway.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (emailResult.error) {
      console.error("Resend API error:", emailResult.error);
      return NextResponse.json({ error: emailResult.error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Internal Server Error in contact API:", error);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
