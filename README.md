# JWT Auth Express

This is a Node.js Express application that provides user authentication and authorization using JSON Web Tokens (JWT). It includes features such as user registration, login, profile management, and admin-level user management.
This project serves as a robust foundation and starting point for building secure authentication and authorization mechanisms into your applications. It offers a well-structured and extensible API for implementing JSON Web Token (JWT) based authentication, allowing you to quickly integrate user registration, login, profile management, and admin-level user management functionalities into your projects.


## Installation

1. Clone the repository: `git clone https://github.com/your-repo/jwt-auth-express.git`
2. Install dependencies: `yarn install`
3. Create a `.env` file and add the following environment variables:
   - `MONGO_URI`: MongoDB connection URI
   - `JWT_SECRET`: Secret key for JWT signing

## Usage

1. Start the server: `yarn start`
2. The server will be running at `http://localhost:5000`

## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Log in an existing user
- `GET /api/users/profile`: Get the current user's profile (requires authentication)
- `PUT /api/users/profile`: Update the current user's profile (requires authentication)

### Admin Routes

- `PUT /api/users/:id`: Update a user's information (requires admin role)
- `DELETE /api/users/:id`: Delete a user (requires admin role)

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs (for password hashing)

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow for contributing to this project.

## License

This project is licensed under the [MIT License](LICENSE).
