# Cloud Deployment Architecture & Operational Notes

**Project:** WebTech AI Assistant (Production Cloud Edition)  
**Experiment:** Web Technology Lab — Experiment 6  
**Target Environments:** Vercel / Netlify / Render / Edge Static Storage  

---

## 1. Cloud Architecture Overview

The application is structured as a high-performance **Jamstack / Edge Static Web Application**. It leverages:
- Zero-cold-start static file delivery via Global Edge Content Delivery Networks (CDNs).
- Strict HTTP Response Security Headers injected via cloud routing manifests (`vercel.json` / `netlify.toml`).
- Safe client-side execution with zero exposed environment variables or secrets.

```
       +-----------------------+
       |   User Web Browser    |
       +-----------+-----------+
                   | HTTPS (TLS 1.3)
                   v
       +-----------------------+
       |   Global Anycast CDN  | (Vercel Edge / Netlify PoP)
       +-----------+-----------+
                   |
     +-------------+-------------+
     |                           |
     v                           v
+---------------+       +------------------+
|  Static HTML  |       | Security Headers |
|  CSS & JS     |       | (CSP, HSTS, etc) |
+---------------+       +------------------+
```

---

## 2. Cloud Configuration Manifests

### A. Vercel Configuration (`vercel.json`)
- Clean URLs enabled to strip `.html` extensions.
- Comprehensive security headers:
  - `X-Frame-Options: DENY` (Anti-clickjacking)
  - `X-Content-Type-Options: nosniff` (MIME sniffing defense)
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (HSTS)
  - `Cache-Control: public, max-age=86400, stale-while-revalidate=604800` for static assets.

### B. Netlify Configuration (`netlify.toml`)
- Configured build publish directory: `.`.
- Injects standard security and caching headers across all edge CDN routes.

---

## 3. Step-by-Step Deployment Instructions

### Method 1: Deploy to Vercel (CLI)
1. Install or run Vercel CLI:
   ```bash
   npx vercel
   ```
2. Log in with your GitHub/Email credentials when prompted in the browser.
3. Confirm project root (`./`) and default build settings.
4. For production deployment:
   ```bash
   npx vercel --prod
   ```
5. Note the generated live URL (e.g. `https://webtech-ai-cloud.vercel.app`).

### Method 2: Deploy to Netlify (CLI)
1. Run Netlify CLI:
   ```bash
   npx netlify deploy --dir=.
   ```
2. Authorize account access via the Netlify authentication window.
3. Promote to production:
   ```bash
   npx netlify deploy --prod --dir=.
   ```

### Method 3: Deploy via GitHub Pages
1. Push repository commits to GitHub:
   ```bash
   git push origin main
   ```
2. In the repository on GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select `Deploy from a branch` and choose the root or `/docs` folder.

---

## 4. Environment Variables & Secret Management Policy
- **Zero Secrets Principle:** No third-party LLM API keys are embedded or bundled into client assets.
- If upstream LLMs (e.g., Google Gemini Pro or OpenAI API) are provisioned in the future, they MUST be proxied through an edge serverless function (`/api/chat.js`) using environment variables defined in the cloud provider's project dashboard (`GEMINI_API_KEY`), never in client-facing code.

---

## 5. Deployment Status
- **Local Production Build:** Fully verified and tested on localhost.
- **Edge Manifests:** Created and validated (`vercel.json`, `netlify.toml`).
- **Live Cloud Promotion:** Awaiting user account authentication credentials. Follow the steps in Section 3 to complete cloud deployment in under 60 seconds.
