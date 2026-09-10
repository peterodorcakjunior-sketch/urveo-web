const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const LIMITS = {
  name: 120,
  email: 254,
  interest: 120,
  message: 5000,
  turnstileToken: 2048,
};

const jsonResponse = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
const isFingerprintedAsset = (pathname) =>
  /^\/assets\/.+-[a-zA-Z0-9_-]{8,}\.(?:css|js|png|jpe?g|webp|avif|svg|woff2?)$/.test(pathname);

function normalizeSubmission(payload) {
  if (!isRecord(payload)) return null;

  const allowedFields = ["name", "email", "interest", "message", "turnstileToken"];
  if (Object.keys(payload).some((field) => !allowedFields.includes(field))) return null;

  const submission = {};
  for (const field of allowedFields) {
    if (typeof payload[field] !== "string") return null;
    submission[field] = payload[field].trim();
    if (!submission[field] || submission[field].length > LIMITS[field]) return null;
  }

  if (!isValidEmail(submission.email)) return null;
  return submission;
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) throw new Error("Turnstile binding is not configured");

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) formData.append("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) return false;

  const result = await response.json();
  return result?.success === true;
}

function safeHeaderValue(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function formatEmailTimestamp(timestamp) {
  const parts = new Intl.DateTimeFormat("sk-SK", {
    timeZone: "Europe/Bratislava",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.day}. ${values.month}. ${values.year} • ${values.hour}:${values.minute}`;
}

function createEmailText(submission, timestamp) {
  return [
    "Meno:", submission.name,
    "", "E-mail:", submission.email,
    "", "Záujem:", submission.interest,
    "", "Správa:", submission.message,
    "", "Čas odoslania:", formatEmailTimestamp(timestamp),
    "", "Web:", "urveo.sk",
  ].join("\n");
}

function createEmailHtml(submission, timestamp) {
  const name = escapeHtml(submission.name);
  const email = escapeHtml(submission.email);
  const interest = escapeHtml(submission.interest);
  const message = escapeHtml(submission.message).replace(/\r?\n/g, "<br>");
  const sentAt = escapeHtml(formatEmailTimestamp(timestamp));

  return `<!doctype html>
<html lang="sk">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f3f3f6;color:#17171c;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f3f3f6;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;background-color:#ffffff;border:1px solid #e7e7ec;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:24px 28px;background-color:#08080b;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 14px;">
            <tr>
              <td style="padding:0 8px 0 0;"><img src="https://urveo.sk/urveo-favicon.png" alt="URVEO V logo" width="20" height="20" style="display:block;width:20px;height:20px;border:0;"></td>
              <td style="padding:0;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:3px;line-height:20px;">URVEO</td>
            </tr>
          </table>
          <div style="width:32px;height:3px;margin:0 0 12px;background-color:#7c4dff;font-size:0;line-height:0;">&nbsp;</div>
          <h1 style="margin:0;color:#ffffff;font-size:23px;font-weight:600;line-height:1.3;">Nový dopyt z webu</h1>
        </td></tr>
        <tr><td style="padding:30px 28px 28px;">
          <h2 style="margin:0 0 8px;color:#111116;font-size:26px;font-weight:700;line-height:1.25;">${name}</h2>
          <div style="display:inline-block;margin:0 0 28px;padding:6px 10px;background-color:#f0ebff;border:1px solid #ded2ff;border-radius:999px;color:#5e35c8;font-size:13px;font-weight:600;line-height:1.2;">${interest}</div>
          <div style="margin:0 0 7px;color:#72727c;font-size:11px;font-weight:700;letter-spacing:1.4px;line-height:1.2;">E-MAIL</div>
          <div style="margin:0 0 28px;font-size:16px;line-height:1.5;"><a href="mailto:${email}" style="color:#5e35c8;text-decoration:underline;">${email}</a></div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f8f8fa;border:1px solid #e5e5ea;border-radius:8px;">
            <tr><td style="padding:20px 20px 22px;">
              <div style="margin:0 0 12px;color:#72727c;font-size:11px;font-weight:700;letter-spacing:1.4px;line-height:1.2;">SPRÁVA</div>
              <div style="color:#24242a;font-size:16px;line-height:1.65;overflow-wrap:anywhere;word-break:break-word;">${message}</div>
            </td></tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin-top:26px;border-top:1px solid #ececf0;">
            <tr>
              <td style="padding-top:18px;color:#72727c;font-size:12px;line-height:1.5;">
                <div style="margin-bottom:4px;font-size:10px;font-weight:700;letter-spacing:1.2px;">ODOSLANÉ</div>
                <div style="color:#3e3e46;">${sentAt}</div>
              </td>
              <td align="right" valign="bottom" style="padding-top:18px;color:#72727c;font-size:12px;line-height:1.5;"><a href="https://urveo.sk" style="color:#72727c;text-decoration:none;">urveo.sk</a></td>
            </tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendContactEmail(submission, env) {
  if (!env.EMAIL_API_KEY || !env.EMAIL_FROM || !env.CONTACT_RECIPIENT) {
    throw new Error("Contact email bindings are not configured");
  }

  const timestamp = new Date().toISOString();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.EMAIL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [env.CONTACT_RECIPIENT],
      reply_to: submission.email,
      subject: `Nový dopyt z URVEO — ${safeHeaderValue(submission.name)}`,
      text: createEmailText(submission, timestamp),
      html: createEmailHtml(submission, timestamp),
    }),
  });

  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
}

async function handleContact(request, env) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
      status: 405,
      headers: { ...JSON_HEADERS, Allow: "POST" },
    });
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (contentType.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return jsonResponse({ ok: false, error: "Invalid submission" }, 415);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid submission" }, 400);
  }

  const submission = normalizeSubmission(payload);
  if (!submission) return jsonResponse({ ok: false, error: "Invalid submission" }, 400);

  let verified;
  try {
    verified = await verifyTurnstile(submission.turnstileToken, request, env);
  } catch (error) {
    console.error("Contact verification failed", error instanceof Error ? error.message : "Unknown error");
    return jsonResponse({ ok: false, error: "Verification failed" }, 403);
  }
  if (!verified) return jsonResponse({ ok: false, error: "Verification failed" }, 403);

  try {
    await sendContactEmail(submission, env);
  } catch (error) {
    console.error("Contact email delivery failed", error instanceof Error ? error.message : "Unknown error");
    return jsonResponse({ ok: false, error: "Unable to send submission" }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    if (url.hostname === "www.urveo.sk") {
      url.hostname = "urveo.sk";
      return Response.redirect(url.toString(), 308);
    }
    const response = await env.ASSETS.fetch(request);
    if (!response.ok || !isFingerprintedAsset(url.pathname)) return response;

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
