# Performance Analytics Dashboard

This project provides an interactive dashboard for analyzing performance metrics in A/B experiments. With intuitive
time-series graphs, you can easily monitor and compare trends across variants.

## Setup Instructions

To get started, ensure you have **Node.js** and a package manager like **npm** installed.

1. Navigate to the `./backend` folder and install the dependencies by running:

   ```bash
   cd backend
   npm install
   ```
2. Create the `./backend/.env` file, which can be based on the `.env.dist` file, and set the `PORT` environment variable
   for the backend server.
3. Start the backend by running:

   ```bash
   npm run start
   ```
4. Return to the project root directory and create the `.env` file located in the root, which can be based on the
   `.env.dist` file. Set the `VITE_API_URL` environment variable with the local backend address, using
   `http://localhost`
   and the port defined in step 2.
5. Install the project dependencies by running the following command in the root directory:

   ```bash
   npm install
   ```
6. Run the frontend by executing the command below, and open the browser at localhost using the port provided by VITE:

   ```bash
   npm run dev
   ```


## Update Data and View Results in Real-Time

Once the setup is complete, open your browser at the URL provided by VITE. Use tools like Insomnia or Postman to send
data to the endpoint `/api/experiments/exp_live_001/logs` with a payload similar to the example below:

```json
{
  "control": {
    "visitors": 20,
    "conversions": 5,
    "revenue": 100
  },
  "variantB": {
    "visitors": 22,
    "conversions": 6,
    "revenue": 120
  }
}
```

## Architecture decisions

Given the time constraints and personal commitments, I focused on a straightforward and efficient approach. I
implemented the three endpoints outlined in the exercise to handle data retrieval and updates. Initially, data is
fetched from the backend, while subsequent updates are managed via a WebSocket connection. On the frontend, I leveraged
React's Context API alongside `useState` for state management. To ensure a modular and maintainable structure, I created
reusable components as needed. VITE was chosen for the frontend to streamline the environment setup, and Express was
used to power the backend.

## Suggestions for Future Improvements

To save time, this exercise was completed with consideration for only a single experiment. Therefore, it would be
necessary to enable the application to support and display multiple experiments. Furthermore, the following improvements
are proposed:

- Refactor the frontend to reduce repetitive code by creating more modular, organized, and reusable components.
- Add integration tests to verify seamless interactions between components and the backend.
- Implement end-to-end (E2E) tests to validate user workflows in real-world scenarios.
- Integrate a state management library such as Redux or Zustand to handle complex state more effectively as the
  application scales.
- Configure environment-specific settings (e.g., development, staging, production) to streamline deployment workflows
  and simplify management.
- Enhance error handling on both the backend and frontend to provide more detailed and user-friendly error messages.
- Optimize initial load times for larger applications by incorporating lazy loading and code splitting.
- Implement user authentication and authorization features to securely support multiple users and roles.
- Improve the UI/UX by enhancing accessibility features, ensuring a better and more inclusive experience for all users.
- Enhance the UI/UX by adding loading states and no data indicators to improve user feedback and clarity.
