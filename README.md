SP-TEST

A simple React application built with TypeScript to display contacts.

Features
Contact List: Fetch and display a paginated list of contacts and show contact details.
Frequent Contacts: Highlight frequently accessed contacts using localStorage.
Search: Debounced search functionality to filter contacts dynamically.
Error Handling: Includes utilities for handling errors robustly.
Tests: Includes a few tests for utilities, hooks, and services to ensure reliability and functionality.
(** Important Notes on Search Functionality: On the backend, the first_name and last_name fields are stored with the
first letter capitalized (e.g., "John" instead of "john").
As a result, for a search to work correctly, the input must also have the first letter capitalized.
Example: To search for "Andie" the input must be exactly "John" and not "andie" or "ANDIE"
Please keep this limitation in mind when testing or reviewing the functionality.)
(** Enhanced User Experience with useContactsWithCache:
A custom hook, useContactsWithCache, has been implemented to provide a better user experience.
What it does:
When users load more contacts and navigate to a contact's details, they will return to the exact state of the
list they last saw, with all previously loaded items still visible.
This caching mechanism improves usability and ensures users don't lose their progress.
Default Behavior:
By default, the useContacts hook is used, which does not cache the list. When users navigate back to the contacts list, they will only see the initial set of items loaded when they first visited the site.
To test or switch to the cached version, you can replace useContacts with useContactsWithCache in the code.)

Tech Stack
React: Front-end library.
TypeScript: For static typing.
Axios: HTTP client for fetching data.
Tailwind CSS: Utility-first CSS framework for styling.
React Router: For routing.
Jest: Testing framework.
React Icons: For handle icons

Clone the repository
git clone
cd sp-test

Install dependencies:
npm install

Start the development server:
npm start
Open the app in your browser at http://localhost:3000.

Available Scripts
npm start: Runs the app in development mode.
npm test: Launches the test runner.
npm run build: Builds the app for production.
npm run eject: Ejects the app configuration (use with caution).

Folder Structure
src/
├── components/ # Reusable UI components
├── common/ # Shared utilities and helpers
├── pages/ # Page components for routing
├── hooks/ # Custom React hooks
├── services/ # API service functions
├── utils/ # Utility functions
├── types/ # TypeScript type definitions
└── constant/ # Constants and configuration

API
Base URL: http://localhost:1337/passenger
Endpoints:
GET /contacts: Fetches a list of contacts.
POST /contacts: Adds a new contact.

Testing
Run the tests using Jest:
npm test

### Code review checklist

- [ ] Main functionalities: These items SHOULD work correctly
  - [x] List view
    - [x] Show list of contacts properly with image, name, and tel and be clickable
    - [x] Handle server errors
  - [ ] Pagination
    - [ ] Infinite scroll/page number button - **[Just a loade more button]**
    - [ ] Handle loading and end of the list
  - [x] Detail view
    - [x] Handle routing properly
    - [x] Handle server errors
    - [x] Handle routing error on manually changing the detail id
  - [ ] Search
    - [x] Using Debounce
    - [ ] Handle multiple requests
    - [x] Search by first name, last name, and telephone
  - [x] Most visited contacts
    - [x] Handle incorrect items in the list (e.g., when you manually change the detail page address)
- [ ] Clean code:
  - [x] Well-structured project
  - [x] Separate concerns
  - [x] Component-thinking
  - [x] Simple to understand and less complexity
  - [ ] No over-engineering
  - [x] Avoid bad-practice patterns (e.g., multi re-rendering components, useEffect chaining)
  - [ ] No acute performance issues
  - [ ] Using pure CSS in a good way / Using CSS frameworks like Tailwind without extra complexity
- [ ] Plus points and nice to have: DON’T judge just based on lack of these items; they should be better compared to other competitors:
  - [x] Creativity or eye-catching design
  - [ ] Using absolute path
  - [ ] Using ESLint
  - [x] Using TypeScript in a best practice way (otherwise is a negative point)
  - [ ] Using (unit/e2e) Test in an applicable way not just writing some samples

## Code Review

### Ali BM

- **Pros**
  - Eye catching design
  - Written debounce by himself
  - Good file and folder structure
  - Good Typescript knowledge
  - Good separation of concerns
- **Cons**
  - Missing virtualization
  - Missing request cancelation
  - Tailwind class names duplication in code base (ex: `src/components/common/error-box.tsx`).
  - Why do we need memoize layout component? It's not an expensive one (`src/components/common/layout.tsx`).
  - Unnecessary component memoization (Every thing is memoized).
  - Bad pattern multiple rendering a same component (`Ali_BM_NOTE_1`)
  - Refer to `Ali_BM_NOTE_2`.
- **Conclusion**
  - Some over engineerings such as too much memoization is noticable but i think code base is good enough to pass this step as **mid-level** candidate.
