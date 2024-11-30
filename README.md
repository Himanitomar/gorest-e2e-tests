GoRest API E2E Tests
This repository contains end-to-end (E2E) tests for the GoRest API, built using Jest and Supertest. The project demonstrates the ability to test CRUD operations and handle edge cases effectively.

Features
Automated tests for CRUD operations (POST, GET, PUT, DELETE) on users.
Covers edge cases like:
Missing required fields.
Invalid data formats.
Unauthorized access.
Operations on non-existent resources.
CI/CD integration using GitHub Actions.
Table of Contents
Prerequisites
Installation
Environment Variables
Running Tests
CI/CD Pipeline
Project Structure
Prerequisites
Before running the tests, ensure you have the following installed:

Node.js (v16 or higher)
npm (v7 or higher)
Installation
Clone the repository:

git clone https://github.com/Himanitomar//gorest-e2e-tests.git
cd gorest-e2e-tests
Install the project dependencies:

npm install
Environment Variables
This project uses environment variables to manage sensitive information like the API URL and authentication token.

Create a .env file in the root directory:
touch .env

Add the following variables to the .env file:
API_URL=https://gorest.co.in/public/v2
BEARER_TOKEN=<your_token_here>
Replace <your_token_here> with your API token from the GoRest Dashboard.

Running Tests
Run all tests:

npm test
Run tests in watch mode (for development):

npm run test:watch
Check the output for any failed or passing tests.

CI/CD Pipeline
The project uses GitHub Actions for CI/CD, which runs the tests automatically on every push or pull request to the main branch.

How CI/CD Works:
On every push or pull request, GitHub Actions:

Installs dependencies.
Sets up environment variables securely using GitHub Secrets.
Runs all tests using Jest.
Test results are displayed in the Actions tab of the repository.

Setting Up Secrets:
To configure the pipeline:

Go to your GitHub repository.
Navigate to Settings > Secrets and variables > Actions.
Add the following secrets:
Name: BEARER_TOKEN, Value: <your_token_here>.
Project Structure
Here’s the structure of the repository:

graphql
Copy code
gorest-e2e-tests/
├── .github/                     # GitHub Actions workflows
│   └── workflows/
│       └── nodejs.yml           # CI/CD configuration
├── tests/                       # Test files
│   ├── sample.test.js           # Example test
│   └── users.e2e.test.js        # CRUD tests for users
├── Utils/                       # Utility files
│   └── apiClient.js             # Reusable API client for tests
├── .env                         # Environment variables (not committed)
├── .gitignore                   # Git ignored files
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Dependency lock file
├── README.md                    # Project documentation
Writing Your Own Tests
Add new test files under the tests folder with the .test.js extension.
Use Jest and Supertest to write API tests.
Example of a basic test:
javascript
const request = require('supertest');
const baseURL = process.env.API_URL;

describe('Sample Test', () => {
  it('should fetch users', async () => {
    const response = await request(baseURL)
      .get('/users')
      .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
