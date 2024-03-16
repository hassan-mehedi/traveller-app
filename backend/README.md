# Express-Mongoose Template

This project is an Express-Mongoose template designed to kickstart your Node.js and MongoDB applications. It provides a structured foundation for building RESTful APIs with Express and Mongoose, including pre-configured middleware, database connection setup, and basic CRUD operations.

## Features

-   Express server setup
-   Mongoose integration for MongoDB
-   Pre-configured middleware for parsing JSON and handling URL encoded data
-   Example model, route, and controller for CRUD operations
-   Environment variable configuration using dotenv
-   Error handling middleware

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js (version 12.x or above)
-   npm (version 6.x or above)
-   MongoDB (local or remote instance)

## Installation

Clone the repository to your local machine:

```
git clone https://github.com/hassan-mehedi/express-mongoose-template.git
```

Navigate to the project directory:

```
cd express-mongoose-template
```

Install dependencies:

```
npm install
```

## Configuration

Copy the `.env.example` file to `.env` and update the environment variables to match your setup:

```
cp .env.example .env
```

## Running the Application

Start the server with:

```
npm start
```

Or the development server with:

```
npm run dev
```

The server will run on http://localhost:5000

## Project Structure

```
├── controllers
| |-- auth.controllers.js
| |-- user.controllers.js
|-- models
| |-- user.model.js
|-- routes
| |-- auth.routes.js
| |-- user.routes.js
|-- utils
| |-- handleError.js
| |-- removeObjectKey.js
| |-- validateEnv.js
| |-- validateTokenExpiration.js
├── .env.local
|-- .env
├── package.json
|-- package-lock.json
└── README.md
```

## Usage

You can use Postman or any other API testing tool to interact with the API. Example endpoints include:

### Users

-   GET `/api/users`
-   POST `/api/users`
-   GET `/api/users/:id`
-   PUT `/api/users/:id`
-   DELETE `/api/users/:id`

### Authentication

-   POST `/auth/sign-in`

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -am 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Contact

If you have any questions or feedback, please contact me at howlader.mehedihassan@gmail.com

---

Happy coding!
