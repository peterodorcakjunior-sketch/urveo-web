# URVEO — Context for Local Codex

Last updated: September 25, 2026

This file is the working handoff for Codex in the real repository at `C:\Users\peter\Desktop\urveo-web`. Do not restart the project or repeat a full audit without a new reason.

## 1. Project and verified state

- Project: **URVEO**
- Production website: `https://urveo.sk`
- Stack: React + Vite, Cloudflare Workers + Assets
- GitHub repository: `peterodorcakjunior-sketch/urveo-web`
- Production-candidate branch: `repair/production-candidate-20260903`
- Verified deployed application commit: `87b3f6c59f8f2645626f44c10a492da8fa67be17` (`Improve conversion clarity and local SEO`)
- The production-candidate branch must contain `87b3f6c` or a descendant. Always fetch before comparing the current local and remote heads.
- The live website was verified to use the same generated JS and CSS asset hashes as the local build from `87b3f6c`.
- Later documentation-only commits do not require a production redeploy because they do not change the generated website assets.
- The website is a good production baseline with no known critical issue.

Always distinguish between:

1. the local repository,
2. the GitHub branch,
3. the live Cloudflare production deployment.

A commit or push does not automatically mean a deployment. A deployment does not prove that the corresponding commit was pushed. Verify each state before making claims about production.

## 2. Working rules

- Never deploy to the live website without explicit user approval.
- Never commit or push without explicit user approval.
- Before editing, check the branch, `HEAD`, `git status --short`, and the difference from the remote branch.
- Do not automatically switch to `main`; use the production-candidate branch named above.
- Preserve the existing URVEO and D•ART visual design. Do not redesign the website unless explicitly requested.
- Change only files required for the current task.
- Do not touch the separate VAYREN concept unless explicitly requested.
- Do not install dependencies unless genuinely necessary and approved.
- Before a commit, inspect the diff and run lint and the production build.
- If PowerShell blocks `npm.ps1`, use `npm.cmd run lint` and `npm.cmd run build`.
- Never force-push or make unsolicited Cloudflare configuration changes.
- Keep work concise and credit-efficient. Do not repeat broad audits for simple tasks.

## 3. D•ART section — approved state

D•ART is URVEO's main project showcase. Preserve its current design and behavior.

The approved implementation includes:

- the heading **“Reštauračná platforma na mieru”**,
- a monitor displaying the D•ART logo,
- a realistic phone displaying the application,
- a clickable phone that opens the same interactive demo as the “Vyskúšať projekt” button,
- a subtle independent phone animation without unnatural movement of the screen content,
- subtle animation of the red background circles and glow,
- a DArtExperience overlay that opens without uncontrolled page movement,
- correct restoration of scroll position, focus, background inert state, Escape behavior, and Tab behavior,
- touch scrolling inside the phone,
- a phone clock showing the current time,
- a sharp restaurant image,
- cash payment, preorder/time selection, cart, and other demo interactions,
- corrected DArtExperience title letter spacing,
- polished mobile layout, monitor, and phone presentation.

The user approved this result. Modify D•ART only for a specific defect or an explicit request.

## 4. Latest production verification

Verified on the live website on September 25, 2026:

- the website loads and is visually consistent,
- the live title and metadata include the local SEO changes from `87b3f6c`,
- live JS and CSS asset hashes match the local production build,
- the D•ART phone and button open DArtExperience,
- the restaurant image and other images load correctly,
- Escape closes the overlay and restores focus,
- background scroll is locked while the overlay is open,
- the mobile menu works at a 390 px viewport,
- there is no usable horizontal page scrolling; decorative elements intentionally overflow and are clipped,
- there are no website-originated console warnings or errors,
- lint and the production build pass,
- the production dependency audit reports zero known vulnerabilities.

The repository currently has no automated test script. Historical contact hardening tests passed 22/22, but they cannot be rerun from the current package scripts.

Do not treat another complete technical or security audit as a priority without a new reason.

## 5. Backend, security, and privacy baseline

The contact form has been production-hardened with:

- Cloudflare Turnstile using the `contact` action,
- server-side Siteverify requiring success, hostname `urveo.sk`, and the correct action,
- a streamed 64 KiB request-body limit before `JSON.parse`,
- a Cloudflare rate limit of 5 requests per 60 seconds per IP address,
- validation before rate limiting and rate limiting before Turnstile,
- a 10-second Turnstile timeout and a 15-second Resend timeout, without retries,
- generic error responses and minimal logging without personal data,
- previously successful end-to-end contact form and email-delivery verification.

Email configuration:

- sender: `URVEO <noreply@urveo.sk>`,
- recipient: `info@urveo.sk`,
- Cloudflare Email Routing to consumer Gmail,
- SPF, DKIM, and DMARC previously verified as passing.

Security headers are deployed. CSP intentionally remains **Report-Only**, and HSTS intentionally uses the short `max-age=300`. These are not launch blockers. Cloudflare Bot Fight Mode remains enabled.

The Privacy Notice covers contact enquiries, Cloudflare/Turnstile, Resend, Gmail, data transfers, retention, and the absence of marketing or analytics cookies. Normal communication is retained for no longer than 12 months after the last communication, subject to necessary legal and contractual exceptions.

## 6. Legal context

- Sole legal operator: **Alex Volák – URVEO**
- Company ID (IČO): **50 604 431**
- Trade Register number: **230-19419**
- Contact: `info@urveo.sk`
- Alex Volák and Peter Odorčák are listed as contact persons in the Privacy Notice.
- Without additional evidence, do not describe Peter Odorčák as the legal owner, operator, founder, or partner.

## 7. Business direction and priorities

The URVEO website and D•ART showcase provide a finished foundation. The priority is no longer endless refinement of URVEO's own website. The next priorities are:

1. acquire and deliver the first client projects well,
2. prepare a website for a cleaning-services business as another real reference,
3. define clear pricing and service packages,
4. prepare a contract, handover process, and ongoing-management rules,
5. decide for each client whether URVEO or the client manages content through a simple CMS,
6. keep each client's domain, Cloudflare, GitHub, and credentials separate and documented,
7. gradually add references, outcomes, and credible client testimonials.

For simple presentation websites, prefer a model where URVEO manages the technical side and the client submits content changes. Add a CMS only when the client needs frequent direct editing. Cloudflare Free is normally sufficient at the start; consider a paid plan only for a concrete requirement.

## 8. Standard workflow for changes

1. Read this context and the current user request.
2. Verify the branch, `HEAD`, working tree, and difference from the remote branch.
3. Reproduce the issue in the complete real project.
4. Explain the cause and the precise proposed change.
5. Make the smallest safe local change.
6. Review the diff, then run lint and the production build.
7. Give the user a local preview or exact verification instructions.
8. Commit, push, or deploy only after explicit approval for that specific step.
9. After deployment, run a basic production smoke test.

## 9. Short startup prompt for Codex

> Continue working on the production URVEO project. First read `URVEO_KONTEXT_PRE_LOKALNY_CODEX_2026-09-25.md`. Work only in the current real repository and first verify the branch, HEAD, working tree, and remote difference. Preserve the existing website and D•ART design. Make only the changes required by my current request. Do not commit, push, or deploy without my explicit approval. After code changes, review the diff, run lint and the production build, and give me a local result to verify.
