# task-management
A simple Task Management app built with Expo CLI, React Native, and React Context, allowing users to add, complete, delete, and filter tasks with local storage support.

## How to run the project
1. Clone the repository:
    ```sh
    git clone https://github.com/vroksiroy/task-management.git
    ```
2. Navigate to the project directory:
    ```sh
    cd task-management
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the Expo development server:
    ```sh
    npx expo start
    ```
5. Follow the instructions in the terminal to run the app on an emulator or a physical device.

## Features implemented
- Add new tasks
- Mark tasks as complete
- Delete tasks (By swipe left)
- Filter tasks by status (all, completed, pending)
- Local storage support to persist tasks
- Dark and light mode support toggle

## Assumptions and areas for improvement
### Assumptions
- Users have Node.js and npm installed on their machines.
- Users have Expo CLI installed globally (`npm install -g expo-cli`).
- The app is primarily designed for mobile devices.

### Areas for improvement
- Implement user authentication to allow multiple users.
- Add due dates and reminders for tasks.
- Improve the UI/UX for better user experience.
- Add unit and integration tests for better code reliability.
- Implement synchronization with a backend server for data persistence.