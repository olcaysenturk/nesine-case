# Nesine Iddaa Bulletin Case Study

A web application that displays the Nesine iddaa match bulletin and allows users to create and manage a bet slip. Built with **Next.js 16**, **React 19**, and **Redux Toolkit**.

## 🚀 Getting Started

### Prerequisites

To run this project locally, ensure you have the following versions installed:

- **Node.js**: `v20.x` or higher (Recommended)
- **NPM**: `v10.x` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/olcaysenturk/nesine-case
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Features & Technologies

- **Next.js 16 (App Router)**: Optimized for performance with Server Components and advanced routing.
- **React 19**: Utilizing the latest React features and improvements.
- **Redux Toolkit**: Centralized state management for complex UI states.
- **Tailwind CSS v4**: Modern utility-first styling with the latest JIT engine.
- **TypeScript**: Type-safe development for better maintainability.
- **SEO Optimized**: Dynamic metadata generation and semantic HTML for search engines.
- **Localization**: Cookie-based locale management for multi-language support.
- **Sonner**: Sleek, non-intrusive toast notifications.
- **Jest & React Testing Library**: Comprehensive unit and integration testing suite.
- **Headless UI**: Accessible, unstyled components for custom UI building.

---

## 📂 Folder Structure

```text
src/
├── app/              # Next.js App Router (pages, layouts, global styles)
├── components/       # Reusable UI components (Shared, Layout, Feature-specific)
├── data/             # Static configurations and constants
├── hooks/            # Custom React hooks for shared logic
├── lib/              # Utility functions and external library configs
├── mock-data/        # Local JSON data for unit tests
├── services/         # API service layers and data fetching logic
├── store/            # Redux store configuration, slices, and selectors
└── types/            # TypeScript interfaces, types, and enums
```

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the built application.
- `npm run lint`: Checks for linting errors using ESLint.
- `npm run test`: Executes the test suite using Jest.
- `npm run test:watch`: Runs tests in watch mode for active development.

---

## 🧪 Testing

The project uses **Jest** and **React Testing Library**. To run all tests:

```bash
npm run test
```

---

## 📊 Data Model (API)

The application fetches betting data from the Nesine Case Study API. Below is a breakdown of the key fields used in the match data model:

| Field | Description | Example |
| :--- | :--- | :--- |
| **C** | Match Code | `2101` |
| **N** | Match Name (Home vs Away) | `Bayern - Beşiktaş` |
| **D** | Match Date | `12.08.2023` |
| **T** | Match Time | `01:59` |
| **DAY** | Day of the week | `Perşembe` |
| **LN** | League Name | `UEFA Şampiyonlar Ligi` |
| **MBS** | Minimum Bet System requirement | `4` |
| **OCG** | Outcome Groups (Markets) | Contains nested betting markets |
| **OC** | Outcomes | Individual betting options and odds |

### Outcome Group Mappings
- **Group 1**: Match Result (1, X, 2)
- **Group 2**: Double Chance (1-X, 1-2, X-2)
- **Group 5**: Over/Under 2.5 (Alt, Üst)