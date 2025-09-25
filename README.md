# IPL T20 Dashboard

A responsive, mobile-first dashboard application built with **Next.js**, **React**, and **Tailwind CSS** to display real-time IPL T20 match information.

---

## ✨ Features

- **Live/Upcoming Match**: A prominent card displays the current live match with scores or the next upcoming match with timings.
- **Points Table**: A clear, color-coded table showing the latest team standings, including points, net run rate, wins, and losses.
- **Full Match Schedule**: A user-friendly view of the upcoming tournament schedule.
- **Responsive Design**: The UI is optimized for a seamless experience on all devices, from mobile phones to desktops.

---

## 🛠 Tech Stack

- **Framework**: Next.js (with App Router)
- **Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Node.js API Route (for web scraping)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### ✅ Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (**v18.17 or later recommended**)
- npm, yarn, or pnpm package manager

---

### ⚡ Setup and Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ipl-dashboard.git
cd ipl-dashboard

Install dependencies (choose your preferred package manager):

npm install
# or
yarn install
# or
pnpm install
Start the development server:
Open the application:
Go to http://localhost:3000
 in your browser. You should see the IPL Dashboard application running.
 ipl-dashboard/

The project uses the Next.js App Router. Here are the key files:
├── app/
│   ├── page.tsx        # Main entry point with the dashboard component
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Tailwind CSS directives
├── pages/
│   └── api/
│       └── scrape.ts   # API endpoint for web scraping (to be created)

🔄 Data Fetching: From Dummy to Live Data

Currently, the component in app/page.tsx uses static dummy data for demonstration purposes.
To make the application dynamic, you need to implement a web scraping API endpoint.

1. Create the API Route

Create a file at:

pages/api/scrape.ts

2. Implement Scraping Logic

Use libraries like axios and cheerio to fetch and parse HTML from the official IPL website.
Inspect the live website to find the correct CSS selectors for the data you want.

3. Fetch from Frontend

Modify the useEffect hook in app/page.tsx to fetch data from your /api/scrape endpoint instead of using local dummyData.

Example:

// Inside the App component in app/page.tsx

useEffect(() => {
  setLoading(true);
  fetch('/api/scrape') // Fetch from your API route
    .then(res => res.json())
    .then(setData)
    .catch(err => console.error("Failed to fetch data", err))
    .finally(() => setLoading(false));
}, []);


⚠️ Note: Web scraping can be fragile.
If the source website’s HTML structure changes, your scraper may break.
Always include robust error handling.
```
