# Bix Tech Front-End Challenge

A financial dashboard application built with Next.js, TypeScript, Material-UI and styled-components. This application provides financial data visualization with filtering capabilities and authentication.

## Features

### Authentication

- **Login**: JWT-based authentication (default user: test@example.com, password 1234)
- **Protected Routes**: Middleware-based route protection for dashboard

### Dashboard Analytics

- **Financial Metrics**:
  - Total Balance
  - Revenues (Total Deposits)
  - Expenses (Total Withdrawals)
  - Pending Transactions (Last 24h)
- **Charts**:
  - Bar charts for transaction analysis
  - Line charts for trend visualization
  - Pie charts for currency distribution
- **Filtering**: Filter by dates, accounts, industries, and states
- **Responsive Design**: Responsive layout for all devices

### Data Management

- **Dynamic Filtering**: Real-time data updates based on applied filters
- **Filter Persistence**: Filter states saved in localStorage
- **Next.js Caching**: Data fetching with built-in caching
- **Real-time Updates**: Dashboard content updates dynamically

### User Experience

- **Responsive Sidebar**: Collapsible sidebar with navigation options
- **Loading States**: Skeleton loading components for better UX

## Stack

### Frontend

- **Next.js 15.4.5**
- **TypeScript**
- **React 19.1.0**
- **Styled Components**

### UI & Components

- **Material-UI Icons**
- **Chart.js**
- **React Chart.js 2**
- **Lucide React**

### Development Tools

- **Jest**
- **Testing Library**
- **Turbopack**

## Installation

### Prerequisites

- Node.js 18+
- npm

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone git@github.com:MatheusBlanco/bix-tech-front-end-challenge.git
   cd bix-tech-front-end-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing

Run the test suite:

```bash
npm test
```

## Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard page
│   └── login/            # Login page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── Logo/             # Logo component
├── features/             # Feature-based modules
│   ├── Auth/            # Authentication feature
│   └── Dashboard/       # Dashboard feature
├── lib/                  # Utility libraries
│   ├── api.ts           # API client
│   ├── auth.ts          # Authentication utilities
│   └── transactions.ts  # Data processing
├── providers/           # React context providers
└── styles/             # Global styles and themes
```
