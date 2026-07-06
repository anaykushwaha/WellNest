# 🌿 WellNest

> **A simple wellness tracker designed to help users build healthier habits, reduce stress, and prioritize their mental well-being.**

![Hackathon](https://img.shields.io/badge/Built%20For-Hackathon-blue)
![Status](https://img.shields.io/badge/Status-Complete-success)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

WellNest is a web-based wellness tracker created to encourage users to maintain healthy daily habits in today's fast-paced world.

Students and professionals often become overwhelmed by workloads and deadlines, causing them to neglect simple but important habits like drinking enough water, exercising, and reflecting on their day. WellNest was built to make these habits easy to track and maintain through a clean and intuitive interface.

The goal isn't just productivity—it's building a healthier lifestyle.

---

## ✨ Features

* 💧 Water intake tracking
* 🏃 Exercise tracking
* 📝 Notes & journaling section
* 📊 Daily wellness monitoring
* 🎨 Clean and easy-to-use interface
* ⚡ Lightweight and responsive design

---

## 🚀 Demo

Watch the project demonstration here:

**Demo Video:**: https://youtu.be/-Ip0qR5mdVo 


## 💡 Inspiration

The idea for WellNest came from our own experiences with academic pressure and stressful workloads.

We noticed that many students—including ourselves—would often skip basic health habits while trying to meet deadlines. We wanted to create something that gently encourages users to take care of themselves every day.

---

## 🛠️ Tech Stack

**Frontend**

* HTML5
* CSS3
* JavaScript

**Design**

* Responsive UI
* Modern layout
* User-focused experience

---

## 📂 Project Structure

```
wellnest/
│
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── screenshots/
│       ├── dashboard-placeholder.png
│       ├── checkin-placeholder.png
│       └── breathing-placeholder.png
│
├── src/
│   ├── assets/
│   │   └── illustrations/
│   │       ├── wellness.svg
│   │       ├── breathing.svg
│   │       └── healthy-habits.svg
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── WellnessScoreCard.tsx
│   │   │   ├── MoodTrendChart.tsx
│   │   │   ├── SleepSummaryCard.tsx
│   │   │   ├── HydrationProgress.tsx
│   │   │   ├── ExerciseSummary.tsx
│   │   │   └── SuggestionPanel.tsx
│   │   │
│   │   ├── checkin/
│   │   │   ├── CheckInForm.tsx
│   │   │   ├── MoodSelector.tsx
│   │   │   ├── StressSlider.tsx
│   │   │   ├── SleepInput.tsx
│   │   │   ├── HydrationInput.tsx
│   │   │   ├── ExerciseInput.tsx
│   │   │   └── NotesInput.tsx
│   │   │
│   │   ├── breathing/
│   │   │   ├── BreathingCircle.tsx
│   │   │   ├── BreathingTimer.tsx
│   │   │   └── BreathingControls.tsx
│   │   │
│   │   ├── history/
│   │   │   ├── HistoryList.tsx
│   │   │   ├── HistoryItem.tsx
│   │   │   └── HistoryFilters.tsx
│   │   │
│   │   └── resources/
│   │       ├── ResourceCard.tsx
│   │       ├── EmergencyNotice.tsx
│   │       └── WellnessTipsList.tsx
│   │
│   ├── data/
│   │   ├── wellnessTips.ts
│   │   ├── supportResources.ts
│   │   └── demoEntries.ts
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useWellnessEntries.ts
│   │   ├── useWellnessScore.ts
│   │   └── useBreathingTimer.ts
│   │
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── dateUtils.ts
│   │   ├── scoreUtils.ts
│   │   ├── suggestionEngine.ts
│   │   ├── storage.ts
│   │   └── validators.ts
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── CheckIn.tsx
│   │   ├── Breathing.tsx
│   │   ├── History.tsx
│   │   ├── Resources.tsx
│   │   └── NotFound.tsx
│   │
│   ├── routes/
│   │   └── AppRouter.tsx
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── types/
│   │   ├── wellness.ts
│   │   ├── resource.ts
│   │   └── chart.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── tests/
│   ├── scoreUtils.test.ts
│   ├── suggestionEngine.test.ts
│   └── validators.test.ts
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── LICENSE
└── devpost-submission-notes.md
└── README.md
```


---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/WellNest.git
```

Navigate into the project

```bash
cd WellNest
```

Open the project

Simply open `index.html`

or use a local development server such as VS Code Live Server.

---

## 🎯 How It Works

The application allows users to:

1. Track daily water intake.
2. Record exercise progress.
3. Write personal notes or journal entries.
4. Build healthier routines through consistent tracking.

The interface is intentionally minimal to encourage daily use without overwhelming users


## 📚 What We Learned

Throughout this project we learned:

* The importance of designing for simplicity.
* Better project organization across multiple files.
* UI/UX design principles.
* Team collaboration during a hackathon.
* Turning an idea into a working product under time constraints.


## 🏆 Accomplishments

* Built a complete wellness tracker from scratch.
* Designed an intuitive user interface.
* Created features that encourage healthy habits.
* Successfully delivered the project within the hackathon timeframe.


## 🤝 Contributors

Built with ❤️ by our hackathon team: 
Anay Kushwaha 
Ariv Chaudhry 

## 📄 License

This project is licensed under the MIT License.

## ❤️ Why WellNest?

Healthy habits don't require huge life changes
Sometimes all it takes is a reminder to drink a glass of water, go for a walk, or write down how you're feeling
WellNest exists to make those small habits easier—and those small habits can make a big difference 
 
