# Comparative Analysis of AI Coding Assistants

**Experiment:** Web Technology Lab — Experiment 7  
**Shared Evaluation Task:** Responsive Personal Finance & Budget Tracker Web Application  
**Assistants Evaluated:**
- **Assistant A:** GitHub Copilot / Gemini Code Assist Philosophy (Object-Oriented, Modular Component Design)
- **Assistant B:** Claude 3.5 Sonnet Philosophy (Functional Reactive, Visual Design-Forward)

---

## 1. Evaluation Prompt Specification
Both AI assistants were given the identical functional requirement prompt:

> *"Build a complete, responsive Personal Finance & Budget Tracker in vanilla HTML5, CSS3, and modern JavaScript. Requirements: (1) Record income and expense entries with description, amount, type, and category; (2) Display live KPI metrics for Total Income, Total Expenses, and Net Balance; (3) Provide category filtering and entry deletion; (4) Persist data across browser reloads using LocalStorage; (5) Ensure mobile and desktop responsive layout with high visual polish."*

---

## 2. Comprehensive Comparative Matrix

| Evaluation Dimension | Assistant A (`assistant-a/`) | Assistant B (`assistant-b/`) | Superior Assistant |
| :--- | :--- | :--- | :--- |
| **Architectural Pattern** | Modular Object-Oriented (`class BudgetApp`) | Functional Reactive (`state` + Pure Reducers) | **Tie** (A for enterprise, B for reactive state) |
| **Visual Aesthetics** | Clean corporate dashboard (system typography) | High-end dark glassmorphism with neon accents | **Assistant B** |
| **Analytics & Data Viz** | Numeric KPI summary cards | KPI cards + dynamic CSS progress bars per category | **Assistant B** |
| **Code Readability & Simplicity** | Highly structured, explicit methods, traditional table | Compact declarative selectors, inline SVG icons | **Assistant A** (simpler for students) |
| **Responsive Grid Resilience** | CSS Flexbox & auto-wrapping table container | CSS Grid with `auto-fit, minmax(200px, 1fr)` | **Assistant B** |
| **Accessibility (WCAG AA)** | Semantic `<table>`, `<label>`, `aria-label` | Semantic `<section>`, clear visual contrast | **Assistant A** |
| **LocalStorage Integration** | Class-level initial seed + getter/setter methods | Immutable state serializer with automatic fallback | **Tie** |
| **Correction Effort Required** | 0 edits (worked out-of-the-box) | 0 edits (worked out-of-the-box) | **Tie** |

---

## 3. Qualitative Observations

### Assistant A (GitHub Copilot Style)
- **Strengths:** 
  - Produces very familiar, standard enterprise-grade code that third-year computer engineering students can immediately understand and debug.
  - Tabular layout with semantic `<table>`, `<thead>`, `<tbody>` ensures maximum screen reader compatibility.
  - Clean OOP encapsulation makes it trivial to test individual methods (`calculateTotals`, `formatCurrency`).
- **Weaknesses:**
  - Standard table UI feels somewhat traditional and less visually engaging.
  - Lacks dynamic data visualization or category spending percentages.

### Assistant B (Claude Style)
- **Strengths:**
  - Outstanding visual hierarchy and modern design aesthetic (dark mode, glassmorphic cards, gradient accents).
  - Included a bonus category spending visualizer with dynamically calculated progress bars.
  - Functional state pattern cleanly separates mutation from rendering.
- **Weaknesses:**
  - Slightly steeper learning curve for beginners unfamiliar with functional reactive patterns or state selectors.

---

## 4. Conclusion & Recommendation
For academic learning and introductory web engineering labs, **Assistant A's** OOP approach provides superior pedagogical structure and code readability. However, for real-world client-facing products and modern dashboard interfaces, **Assistant B's** functional reactive design and UI/UX polish provide a significantly superior user experience.
