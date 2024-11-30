**GoRest API E2E Tests**

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
**
Running Tests**
Run all tests:
npm test
Run tests in watch mode (for development):

npm run test:watch
Check the output for any failed or passing tests.

**CI/CD Pipeline**

The project uses GitHub Actions for CI/CD, which runs the tests automatically on every push or pull request to the main branch.

**How CI/CD Works:**

On every push or pull request, GitHub Actions:

**Installs dependencies**

Sets up environment variables securely using GitHub Secrets.
Runs all tests using Jest.
Test results are displayed in the Actions tab of the repository.


**Writing Your Own Tests**

Add new test files under the tests folder with the .test.js extension.
Use Jest and Supertest to write API tests.
