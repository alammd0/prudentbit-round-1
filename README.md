# PrudentBit Patient Directory

This is a patient directory application built with Next.js. It displays a list of patients from a local data source and allows users to filter and sort the patient list.

## Features

- **Search:** Search for patients by their name, age, or medical issue.
- **Filter:** Filter patients by age (e.g., above 50, between 50 and 100) or medical issue (e.g., fever, headache).
- **Sort:** Sort the patient list by name or age in ascending or descending order.
- **Pagination:** The patient list is paginated for easy browsing.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building server-side rendered and static web applications.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This project uses [pnpm](https://pnpm.io/) as the package manager. Make sure you have it installed.

```bash
npm install -g pnpm
```

### Installation & Running

1.  Clone the repo
    ```sh
    git clone [https://github.com/alammd0/prudentbit-round-1.git]
    ```
2.  Install PNPM packages
    ```sh
    pnpm install
    ```
3.  Run the development server
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Contains the core application pages and API routes.
-   `components/`: Contains reusable React components.
-   `data/`: Contains the local JSON data source for patients.
-   `lib/`: Contains library functions, such as server-side data reading utilities.
-   `service/`: Contains API service functions for fetching data.
-   `types/`: Contains TypeScript type definitions.
-   `utils/`: Contains utility functions, such as filtering and sorting logic.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
