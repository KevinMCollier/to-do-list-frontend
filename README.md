# Todo App Frontend 📝

## Overview
This is the frontend of the **Todo App**, a React-based application for managing tasks. It provides a user-friendly interface for creating, viewing, and organizing tasks based on various criteria such as date and repeat status.

## Key Features
- Task Creation: Users can create tasks with specific due dates and repeat statuses.
- Date Filtering: View tasks for today, this week, or all tasks.
- Repeat Functionality: Tasks can be set to repeat daily, on weekdays, weekends, or weekly.

## Technologies Used
- React
- Tailwind CSS
- TypeScript
- Vite

## Challenges and Solutions
- State Management: Used Context API and custom hooks to manage state, providing an abstraction layer facilitating future potential use of Redux.
- Date Filtering Logic: Implementing logic for various repeat statuses was challenging, but solved by developing a robust filtering mechanism that categorizes tasks based on due date and repeat status. This included intricate date calculations and conditional-logic to handle different scenarios.
- Database Schema: Initially considered separate tables for different types of todos (weekly, daily, spot). However, to reduce complexity, opted for a single model with an enum to represent the repeat status.

## Future Improvements
- User Motivation Integration: Planning to implement a feature that utilizes a user motivation attribute in the task model. This will involve integrating coaching from an AI (ChatGPT) to send motivational messages to users, encouraging task completion based on the task's nature and the user's motivation level.

## Setup and Installation
To set up the project on your local machine:
```bash
# Clone the repository
git clone https://github.com/KevinMCollier/to-do-list-frontend

# Navigate to the project directory
cd to-do-list-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
