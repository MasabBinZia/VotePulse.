<p>
  <img src="https://github.com/user-attachments/assets/41c7822d-be63-4537-87b9-28ac82e2f6b1" alt="Elite Accounting Hub Logo" width="100" height="100">
</p>


# VotePulse E-voting App

VotePulse is a secure and efficient e-voting application built with the MERN stack. It allows users to cast votes and provides admins with the ability to view results in real-time. The app ensures secure voting through JWT token authentication and role-based authorization, while the modern and intuitive interface enhances the voting experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

- User voting functionality with secure authentication.
- Admin dashboard to view voting results.
- JWT token-based authentication for secure access.
- Role-based authorization for user and admin roles.
- Modern UI/UX using Shadcn UI for a sleek and intuitive design.
- Real-time data fetching with Tanstack Query.
- Axios for posting and managing data requests.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MasabBinZia/VotePulse.git
   ```

2. Navigate into the project directory:

   ```bash
   cd votepulse
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # For the backend
   cd backend
   npm install

   # For the frontend
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following environment variables:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:

   ```bash
   cd backend
   npm run start
   ```

6. Start the frontend application:

   ```bash
   cd frontend
   npm run start
   ```

## Usage

1. Users can register and log in to cast their votes.
2. Admins have access to a dashboard to view voting results and statistics.
3. The app ensures security using JWT tokens for authentication and role-based access control.

## Tech Stack

- **MongoDB**: For database storage of users, votes, and results.
- **Express**: Backend framework for handling server-side logic and API endpoints.
- **React**: Frontend for building the user interface.
- **Node.js**: Backend runtime for building the server.
- **Shadcn UI**: For designing a modern and user-friendly interface.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Tanstack Query**: For efficient and real-time data fetching.
- **Axios**: For handling HTTP requests to the backend.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
