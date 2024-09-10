# Driva Digital Broker

## Project Summary
The Driva Digital Broker is a full-stack application that allows users to enter their personal and loan-related details, and receive loan offers from multiple lenders based on the provided information. 

The application calculates loan monthly repayments using the [Amortization Formula](https://www.ramseysolutions.com/real-estate/amortization-schedule#:~:text=M%20%3D%20P%20x%20ir%20(1%20%2B%20ir)%5En%20/%20(1%20%2B%20ir)%5En%20%2D%201) and offers lender-specific loan details, including interest rates and fees.

<br>

## Running with Docker
Ensure Docker is installed in your machine. To run both the **frontend and backend** using Docker, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yubo-dev/driva-digital-broker.git
   cd driva-digital-broker
   ```

2. **Build and Start the Docker containers for both frontend and backend in root folder:**
   ```bash
   npm run docker:build
   ```
   - Note: `npm run docker:build` is typically run only the first time or when you need to rebuild the Docker images.
   - For subsequent runs, you can simply use: `npm run docker:up`
  
3. **Access the Application**:
   - You can start to visit the React App: `http://localhost:5173`
   - The backend is available at: `http://localhost:8080`
  
4. **Stop the Containers:**
   ```bash
   npm run docker:down
   ```

<br>

## Running Frontend and Backend Locally without Docker

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yubo-dev/driva-digital-broker.git
   cd driva-digital-broker
   ```
   
2. **Backend:**
   - Go to the `/backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm run start
     ```

3. **Frontend:**
   - Go to the `/frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
4. **Access the Application**:
   - You can start to visit the React App: `http://localhost:5173`
   - The backend is available at: `http://localhost:8080`

<br>

## Running Tests

1. **Backend Tests (Unit and Integration Tests):**
   - Navigate to the `/backend` directory, ensure the dependencies are all installed:
     ```bash
     cd backend
     ```
   - Run the tests:
     ```bash
     npm run test
     ```

2. **Frontend Tests (Cypress E2E Testing):**
   - Navigate to the `/frontend` directory, ensure the dependencies are all installed:
     ```bash
     cd frontend
     ```
   - Run Cypress with interactive mode to see browser simulation:
     ```bash
     npm run cypress:open
     ```
     - When test runner started, choose `E2E Testing` -> `Chrome` -> then choose running `cypress/e2e/loanForm.spec.ts`
   - Run Cypress with headless mode in terminal:
     ```bash
     npm run cypress:run
     ```

<br>


## Architectural Overview

- **Frontend**: Built with React (v18) using TypeScript, with form handling managed by `react-hook-form` and schema validation using `Zod`. The application is designed following atomic design principles with components structured into atoms, molecules, and organisms.
- **Backend**: Built with NodeJS, Express and TypeScript. The backend calculates loan offers using the amortization formula and validates inputs using `Zod` as well. The data for lenders is stored as an in-memory constant array, given that the project does not require full CRUD operations or persistent storage.
- **API Communication**: The frontend and backend communicate via REST API for submitting loan applications and receiving loan offers.
- **Testing**: The backend uses Jest for unit and integration tests, and Cypress is used for frontend E2E testing.

<br>

## Design Choices

- **Frontend Design**: The atomic design pattern is applied, separating components into reusable atomic units such as `InputField`, `SelectField`, and `Button`. This ensures modularity and reusability across the application.
- **Backend Design**: The loan offers are calculated using the amortization formula based on user input, and the lenders' data is maintained as a constant list. Given the nature of this project, no database is used. We can integrate with relational DB considering the future scalability.
- **Validation**: Zod was chosen for both frontend and backend for its seamless TypeScript integration, allowing for strong type inference and consistent validation. This ensures uniform data validation across the entire application. If I have more time, 

<br>

## Future Improvements

- **Loan Calculation Enhancements**: In future iterations, the loan calculation could be improved to account for factors such as the borrower's employment status or other variables.
- **Database Integration**: While the lender data is currently stored as an array, a future enhancement could involve integrating a database for more dynamic lender management.
- **Shared Schema for Reusability**: Introduce a `/shared/schema` directory at the same level as `frontend` and `backend`, which stores the loan schema validation using Zod, allowing both the frontend and backend to share and reuse the same schema, ensuring consistency and reducing duplication in the validation logic across the application.
- **Improved API Error Handling**: Refine the error-handling mechanism to provide more user-friendly error messages and better diagnostics for API failures.
- **User Authentication**: Implement user authentication to track and personalize loan offers based on the user's profile and past interactions.

