# Playwright UI Automation Framework

This repository contains a UI automation testing framework built using **Playwright** with **JavaScript / TypeScript**.  
The framework is designed to automate modern web applications with a focus on reliability, speed, and maintainability.

---

## 🚀 Tech Stack
- Playwright
- JavaScript / TypeScript
- Node.js
- Git & GitHub
- VS Code

---

## 📌 Why Playwright?
Playwright is a modern end-to-end testing framework that supports:
- Fast and reliable cross-browser testing
- Chromium, Firefox, and WebKit
- Auto-waiting for elements and actions
- Powerful debugging tools (UI Mode, Inspector, Trace Viewer)

---

## 📂 Project Structure
```bash
Playwright-Javascript-Typescript
│
├── tests/                  # Test cases
├── pages/                  # Page Object Model (POM)
│
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project dependencies
├── .gitignore              # Git ignored files
├── README.md               # Project documentation
│
├── test-results/           # Test execution results (ignored in git)
└── playwright-report/      # HTML test reports (ignored in git)
```


---

## ▶️ Installation & Setup
### 1. Clone the repository
```bash
git clone https://github.com/karan-10001/Playwright-Javascript-Typescript.git
2. Navigate to project folder
cd Playwright-Javascript-Typescript

3. Install dependencies
npm install

4. Install Playwright browsers
npx playwright install

▶️ Running Tests
Run all tests:
npx playwright test

Run tests in UI mode:
npx playwright test --ui

Run tests in debug mode:
npx playwright test --debug

📊 Test Reports
After execution, open the HTML report using:
npx playwright show-report

🧪 Framework Features
Page Object Model (POM)
Cross-browser testing
Auto-wait and stable execution
Screenshot, video, and trace support
HTML reporting
Easy debugging with UI mode

🌱 Branch Strategy
master → Stable production-ready code
INT → Integration branch for active development

👨‍💻 Author
Karan
QA Automation Engineer
Skilled in Playwright, Selenium, Java, JavaScript, API testing, and test framework design.

📌 Future Enhancements
CI/CD integration (GitHub Actions)
API testing with Playwright
Environment-based execution
Data-driven testing

---






