# Material UI, Vite, and TypeScript Journey Planner

This project is a web application built with React, Vite, and Material-UI that allows users to search for train journeys.

## How to Run and Build

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Development

To run the application in development mode:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

### Build

To create a production build of the application:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the build command:**
    ```bash
    npm run build
    ```

## Architecture Overview

This project follows a component-based frontend architecture using **React** and **TypeScript**. The structure is organized into logical directories:

-   `src/components`: Contains reusable UI components, each with a clear separation of concerns (e.g., container vs. presentation).
-   `src/pages`: Holds the main application demo page.
-   `src/hooks`: Custom React hooks that are used to encapsulate and reuse stateful logic, such as fetching data (`useJourneys`, `useStations`).
-   `src/context`: The React Context API is in this case used to share the theme across the whole application.
-   `src/utils`: Includes utility functions and type definitions that are used throughout the project and also a JSON with the mocked data used for development purpose.

**Vite** is used as the build tool and development server.

## Design, Theming, and Accessibility

### Design and Theming

The application's design is built upon **Material-UI**.

Theming is managed through a custom solution built on top of Material-UI's theming capabilities, located in `src/context/ThemeContext.tsx`. This approach provides:

-   **Light and Dark Modes:** The application supports both light and dark themes, which can be toggled by the user. The `ThemeToggle` component and `useThemeMode` hook manage the state.
-   **Custom Palettes:** Pre-defined color palettes for both modes ensure a consistent look and feel. Colors for primary actions, backgrounds, and text are clearly defined.
-   **Centralized Theme Configuration:** The `createTheme` function from Material-UI is used to create a theme object that includes not only colors but also custom spacing units, which are then available throughout the application for consistent layout.
-   **Global Styles:** `CssBaseline` from Material-UI is used to apply a consistent baseline style across different browsers.

### Accessibility (a11y)

Accessibility is a key consideration. By using Material-UI, the project benefits from a strong foundation, as its components are designed with accessibility in mind.

Some Keyboard actions were already supported by the MUI Autocomplete component but others required a custom implementation:

-   **Single Autocomplete:**
    -   `↑`/`↓`: Navigate between options.
    -   `Enter`: Select the highlighted option.
    -   `Esc`: Clear the input or close the options list.

-   **Multi-Select Autocomplete:**
    -   `Backspace`: When the input is empty, removes the last selected item (chip).
    -   `Delete`: When a specific item (chip) is focused, removes it.
