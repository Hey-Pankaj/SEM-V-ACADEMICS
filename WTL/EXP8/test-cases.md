# Automated Test Suite: Bank of India Security Dashboard

**Target System:** `WTL/EXP2` (Multi-Page Responsive Security Dashboard)  
**Testing Protocol:** AI-Automated Functional, Responsive, and Form Validation Testing  
**Execution Timestamp:** 2026-10-10  
**Overall Suite Result:** 10 / 10 Tests Passed (100% Pass Rate)

---

## Comprehensive Test Execution Matrix

| Test ID | Category | Objective | Pre-conditions | Test Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EXP8-01** | Page Load | Initial Viewport Verification | Browser opened to `index.html` | 1. Load document<br>2. Inspect initial DOM visibility | `#login-page` is visible with `.active-page`; sidebar menu `#side-menu` is hidden | `#login-page` displayed; sidebar navigation menu hidden | **PASS** |
| **TC-EXP8-02** | Form Switch | Tab Switch Between Login & Signup | On Login View | 1. Click "Sign up" tab button<br>2. Inspect visible form elements | `#login-form` becomes hidden; `#signup-form` displays; Sign up tab gains active class | Form swapped cleanly to registration form | **PASS** |
| **TC-EXP8-03** | Form Validation | Password / PIN Mismatch Prevention | On Sign-up View | 1. Enter PIN: `1234`<br>2. Enter Confirm PIN: `9999`<br>3. Submit form | Submission aborted; warning displayed in `#auth-message`: "The PINs do not match" | Warning prompt shown; focus directed to `#confirm-pin` | **PASS** |
| **TC-EXP8-04** | Authentication | Successful User Login Flow | On Login View | 1. Enter Account: `123456789000`<br>2. Enter PIN: `1234`<br>3. Click "Log in" | Sidebar menu appears; `#dashboard-page` activates; Home menu button highlighted | User transitioned into Dashboard view; menu unlocked | **PASS** |
| **TC-EXP8-05** | View Routing | Navigation to Profile Details | Authenticated on Dashboard | 1. Click "Customer Details" in sidebar<br>2. Inspect active section | `#dashboard-page` deactivated; `#details-page` gains `.active-page` | Profile details view displayed; user metadata rendered | **PASS** |
| **TC-EXP8-06** | View Routing | Navigation to Fraud Detection | Authenticated on Details | 1. Click "Transaction Detection" in sidebar<br>2. Inspect timeline | `#transactions-page` activates; color guide and timeline rows display | Fraud detection feed displayed with visual warning badge | **PASS** |
| **TC-EXP8-07** | Session Management | User Logout & Security Reset | Authenticated on any page | 1. Click "Exit / Log Out" button in sidebar<br>2. Inspect state | Sidebar menu hides; inputs cleared; user redirected to `#login-page` | Session destroyed; redirected to `#login-page` | **PASS** |
| **TC-EXP8-08** | Responsive Layout | Mobile Viewport Adaptation | Screen width > 800px | 1. Resize viewport to 375px<br>2. Inspect sidebar & top navbar | Sidebar collapses; `#topNavBar` displays with hamburger menu button | Sidebar off-canvas; hamburger menu visible | **PASS** |
| **TC-EXP8-09** | Mobile Navigation | Mobile Off-Canvas Drawer Toggle | Viewport width <= 800px | 1. Click "☰ Open Menu"<br>2. Inspect sidebar class | Sidebar expands into view (`.collapsed` removed); close button visible | Off-canvas drawer opened smoothly | **PASS** |
| **TC-EXP8-10** | Asset Verification | Visual Branding & Emoji Rendering | Any view | 1. Inspect logo circle and action badges | Bank icon `🏢`, card badges, and status indicator render crisply | All visual indicators and assets load properly | **PASS** |

---

## Test Execution Summary
- **Total Test Cases Executed:** 10
- **Total Passed:** 10
- **Total Failed:** 0
- **Defects Discovered:** 0 blocking defects encountered during primary test execution.
- **Verification Statement:** All test cases in this suite were executed against the actual application DOM in the local browser environment and verified as passing.
