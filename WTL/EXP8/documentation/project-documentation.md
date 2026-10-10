# Automated Project Documentation: Bank of India Security Dashboard

**Target Project:** Bank of India Security Dashboard (`WTL/EXP2`)  
**Experiment Context:** Web Technology Lab — Experiment 8 (Automated Documentation, Test Cases, and Code Comments)  
**Document Generated Via:** AI-Driven Static Code & Architectural Analysis

---

## 1. System Overview
The **Bank of India Security Dashboard** is a multi-page responsive web application built with semantic HTML5, modern CSS3 (Flexbox & Grid), and vanilla JavaScript. It demonstrates a secure client-side Single Page Application (SPA) architecture suitable for financial monitoring, featuring simulated user authentication, liquid balance tracking, verified customer profile records, and heuristic transaction fraud alerts.

```
+-------------------------------------------------------------------+
|                        Bank of India SPA                          |
+-------------------+-----------------------------------------------+
|  Collapsible      |                  Main Canvas                  |
|  Sidebar          +-----------------------------------------------+
|                   | View 1: Authentication (Login / Sign-up)      |
|  - Brand Logo     | View 2: Safe Money & Status Dashboard         |
|  - Nav Links      | View 3: Customer Profile Record               |
|  - Logout Action  | View 4: Fraud Detection Timeline              |
+-------------------+-----------------------------------------------+
```

---

## 2. Technology Stack

| Layer | Technology | Role & Purpose |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic page regions (`<aside>`, `<main>`, `<nav>`, `<section>`, `<form>`) |
| **Styles** | CSS3 | Flexbox structure, CSS Grid, media queries, custom card elevations |
| **Client Logic** | Vanilla JavaScript | View routing (`navigateTo`), modal/tab switches, authentication state |
| **Typography** | Segoe UI, system-ui | Clean high-legibility enterprise banking font stack |

---

## 3. Page Structure & User Flows

### A. Authentication View (`#login-page`)
- **Default State:** Visible upon application initialization. The sidebar navigation links are hidden until authentication succeeds.
- **Components:** Dual-tab switcher between Login and Sign-up forms, input validation for username and PIN, error notification banner (`#auth-message`).
- **Flow:** Submitting `#login-form` triggers `logIn(event)`, revealing the sidebar menu and navigating to the Dashboard view.

### B. Dashboard Overview (`#dashboard-page`)
- **Header:** Personalized greeting banner for the authenticated user (`John Doe 👤`).
- **KPI Summary Grid:** Two-column card grid displaying:
  1. *Liquid Safe Balance Card:* `$4,850.00`
  2. *Threat Level & Account Status Badge:* `SAFE & ACTIVE ✔️`
- **Notice Callout:** Directs users to the Fraud Detection module.

### C. Customer Profile Record (`#details-page`)
- **Layout:** High-contrast data layout mapping account records.
- **Fields:** Full Name (`John Doe`), Account Number (`1234 - 5678 - 9000`), Registered Phone (`+1 (555) 019-2834`).

### D. Fraud Detection & Transaction Timeline (`#transactions-page`)
- **Visual Color Legend:**
  - 🟢 Green: Money In (Safe)
  - 🔴 Red: Money Out (Safe)
  - 🟡 Amber: Warning (Suspicious / Anomalous Activity)
- **Timeline Records:**
  - *Monthly Salary Received:* `+$1,200.00` (Status: SAFE)
  - *Grocery Bill Paid:* `-$85.00` (Status: SAFE)
  - *Unknown Store Spend NYC:* `-$450.00` (Status: ⚠️ FRAUD DETECTED - Unusual Location)

---

## 4. Responsive Design Strategy
The layout adapts dynamically using CSS media queries targeted at an 800px breakpoint:
- **Desktop Viewports (>800px):** Permanent 280px sidebar on the left, multi-column dashboard grid, horizontal top bar hidden.
- **Mobile Viewports (<=800px):** Sidebar converts into an off-canvas slide-out drawer (`transform: translateX(-100%)`). A persistent top navigation bar (`#topNavBar`) renders a hamburger menu button (`☰ Open Menu`). Single-column layout for cards and tables.

---

## 5. Execution & Verification Steps
1. Navigate to `WTL/EXP2/index.html` or `WTL/EXP8/commented-source-code/index.html`.
2. Open the file in any modern web browser.
3. Authenticate using the sample credentials.
4. Interact with the navigation menu buttons to cycle across all views.
