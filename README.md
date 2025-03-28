# User Management Application

A modern React application for user management with authentication, display, filtering, and CRUD operations.

![User Management Application](https://i.pinimg.com/736x/f1/c7/52/f1c752ae6448d5b2546f0034a723366e.jpg)

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Components](#components)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [License](#license)
- [Extra Detail](#extra-detail)

## Features

- **Authentication** - Secure login system
- **User Management** - View, edit, and delete users
- **Search Functionality** - Filter users by name or email
- **Sorting** - Sort users by name or email in ascending or descending order
- **Pagination** - Navigate through pages of user data
- **Responsive Design** - Works on desktop and mobile devices
- **Session Management** - Maintains user session with token expiration
- **Data Persistence** - Stores user data in session storage
- **Modern UI** - Clean, glass-morphism design with Tailwind CSS

## Live Demo

[Live Demo Link](#) (To be added)

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/user-management-assignment.git
cd user-management-assignment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Configuration

The application uses several configuration files:

- **vite.config.js** - Vite configuration for the project
- **eslint.config.js** - ESLint rules for code quality
- **package.json** - Project dependencies and scripts

## Usage

### Login

Use the following credentials to log in:

- **Email**: eve.holt@reqres.in
- **Password**: cityslicka

These credentials are pre-filled in the login form for demonstration purposes.

### User Management

Once logged in, you can:

1. **View Users** - The homepage displays all users in a grid layout
2. **Search** - Use the search bar to filter users by name or email
3. **Sort** - Click the Sort button to arrange users by name or email
4. **Edit** - Click the Edit button on a user card to update their details
5. **Delete** - Click the Delete button on a user card to remove them
6. **Pagination** - Navigate between pages using the pagination controls
7. **Reset Data** - Click the Reset Data button to restore the original dataset
8. **Logout** - Click the Logout button to end your session

## Project Structure

```
user-management-assignment/
├── public/                # Static files
├── src/                   # Source files
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   ├── context/           # React context providers
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Application entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Project metadata and dependencies
└── LICENSE                # MIT License
```

## API Integration

This application integrates with the [ReqRes API](https://reqres.in/) for user management operations. The API endpoints used are:

- `POST /api/login` - For user authentication
- `GET /api/users` - To fetch users data
- `PUT /api/users/:id` - To update user data
- `DELETE /api/users/:id` - To delete a user

API service functions are located in `src/services/api.jsx`.

## Components

### Main Components

- **Login** - Handles user authentication
- **UserList** - Displays and manages the list of users
- **EditUser** - Provides a form to edit user details

### UI Components

- **Button** - Customizable button with various styles and states
- **ConfirmSelect** - Modal dialog for confirming user actions
- **SortMenu** - Dropdown menu for sorting options

## State Management

This application uses React Context API for state management:

- **UserContext** - Manages user data, search, sorting, and pagination state
- The context providers are located in `src/context/UserContext.jsx`

## Authentication

Authentication is handled by the following:

- **auth.jsx** - Utilities for token management and authentication status
- **Login.jsx** - Component for the login form and authentication flow

Authentication flow:

1. User enters credentials on the login page
2. Credentials are validated against the ReqRes API
3. On successful login, a token is stored in localStorage with an expiration time
4. Protected routes check for valid token before rendering

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Coding Standards

- Follow the ESLint configuration provided in the project
- Write meaningful commit messages
- Update documentation when necessary

## Troubleshooting

### Login Issues

- **Invalid Login**: Ensure you're using the credentials: email `eve.holt@reqres.in` and password `cityslicka`
- **Session Expired**: Your token expires after 24 hours. Simply log in again.

### Data Reset

If the application behaves unexpectedly:

1. Click the "Reset Data" button in the header
2. If issues persist, clear your browser cache and localStorage
3. Refresh the application

## FAQ

### Q: How do I change the API endpoint?

A: Update the BASE_URL constant in `src/services/api.jsx`

### Q: Why have you not hidden the api in .env?

A: First of all there is no key that needs to be hidden and the api is a hosted REST-API on the website: https://reqres.in/

### Q: Can I add new users?

A: The current version only supports viewing, editing, and deleting users as per the ReqRes API limitations.

### Q: How is user data persisted between sessions?

A: User data is stored in sessionStorage for persistence between page refreshes.

### Q: How secure is the authentication?

A: The authentication is implemented for demonstration purposes. In a production environment where the password would be stored in the datatbase hasing would be required, short token expiration time than now (24 hour), rate limiting, CAPTCHA, Account Lockout, OTP, and verification or authenticator app would be required. Also for more security audit logging could be used too.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Extra Detail

This project is done on React by using Vite tooling only for the reason of slow server start in react. Vite improves the dev server start time by first dividing the modules in an application into two categories: dependencies and source code.
> Dependencies are mostly plain JavaScript that do not change often during development.
> Source code often contains non-plain JavaScript that needs transforming, and will be edited very often. Also, not all source code needs to be loaded at the same time (e.g. with route-based code-splitting).
> For more information on vite please refer to https://vite.dev/
