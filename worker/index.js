const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const LIMITS = {
  name: 120,
  email: 254,
  interest: 120,
  message: 5000,
};

const jsonResponse = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

function normalizeSubmission(payload) {
  if (!isRecord(payload)) return null;

  const allowedFields = ["name", "email", "interest", "message"];
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

function safeHeaderValue(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function createEmailText(submission, timestamp) {
  return [
    "Meno:", submission.name,
    "", "E-mail:", submission.email,
    "", "Záujem:", submission.interest,
    "", "Správa:", submission.message,
    "", "Čas odoslania:", timestamp,
    "", "Web:", "urveo.sk",
  ].join("\n");
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

  // Turnstile verification can be inserted here before email delivery.
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
    return env.ASSETS.fetch(request);
  },
};
