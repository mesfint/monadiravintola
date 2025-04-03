# Pizzeria Micro Frontend Application

## Overview
Welcome to the Pizzeria Micro Frontend Application! This project is designed to showcase a modern web application architecture using micro frontends. The application simulates a pizza shop and is divided into the following independent micro frontends, thoough the application is organized in monorepo.  

1. **Container**: The main application shell that integrates all the micro frontends.
2. **Menu**: Displays the list of available pizzas and their details.
3. **Booking**: Allows users to book a table at the pizzeria.
4. **Feedback**: Collects and displays customer feedback and ratings.

The project is built using **React** with **Vite** as the build tool, and it leverages **Workbox** for efficient service worker management to provide offline capabilities and enhance performance through caching.

## Features
- **Micro Frontend Architecture**: Each module operates independently, promoting scalability and maintainability.
- **Service Worker Integration**: Implements caching strategies using Workbox to improve load times and offline availability.
- **Dynamic Menu**: Displays a dynamic list of pizzas fetched from local data source.
- **Booking System**: Simple and user-friendly table booking interface.
- **Feedback Collection**: Allows users to leave feedback and ratings for the pizzeria.

## Tech Stack
- **React**: For building the user interface.
- **Vite**: For fast and optimized builds.
- **TypeScript**: For static type checking.
- **Workbox**: For managing service worker caching.
- **PNPM**: For efficient package management.

## Installation
Follow these steps to get the application up and running locally:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:mesfint/monadiravintola.git
   cd monadiravintola
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the application**:
   ```bash
   pnpm run dev
   ```

4. **Build for production**:
   ```bash
   pnpm run build
   ```

## Usage
- Navigate to the home page to view the pizza menu.
- Use the booking system to reserve a table.
- Leave feedback to help improve the service.

## Service Worker and Caching
This project uses Workbox to enhance performance through caching. The service worker:
- Caches static assets for offline access.
- Uses the **Stale-While-Revalidate** strategy for API responses, ensuring fast response times with up-to-date content.

### Observing the Service Worker in Action
1. Open your browser's developer tools.
2. Go to the **Application** tab and look under **Service Workers**.
3. Check **Cache Storage** to see cached resources.
4. Simulate offline mode in the **Network** tab and reload the page to verify offline functionality.

### Figma Prototype
![Prototype](https://github.com/mesfint/monadiravintola/blob/main/Desktop-monadi-restaurant.png)

## Contributing
I welcome contributions! Please fork the repository and submit a pull request with your changes.


## Acknowledgments
Special thanks to all contributors and the open-source community for their support.



```js

new ModuleFederationPlugin({
name: "container",
filename: "remoteEntry.js",
exposes: {
"./App": "./src/App",
"./GlobalTheme": "./src/styles/globalTheme.ts",
},
remotes: {
MenuHost: process.env.DEV_MENU,
MenuListHost: process.env.DEV_MENU,
BookingHost: process.env.DEV_BOOKING,
FeedbackHost: process.env.DEV_FEEDBACK,
},
shared: {
react: {
singleton: true,
eager: true,
requiredVersion: packageJson.dependencies.react,
},
"react-dom": {
singleton: true,
eager: true,
requiredVersion: packageJson.dependencies["react-dom"],
},
"@mui/material": "@mui/material",
"@mui/icons-material": "@mui/icons-material",
"@emotion/react": {
singleton: true,
requiredVersion: packageJson.dependencies["@emotion/react"],
},
"@emotion/styled": {
singleton: true,
requiredVersion: packageJson.dependencies["@emotion/styled"],
},
},
})

```
