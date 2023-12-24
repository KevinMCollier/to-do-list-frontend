# Todo App Frontend 📝

## Overview
This is the frontend of the **Todo App**, a React-based application for managing tasks. It provides a user-friendly interface for creating, viewing, and organizing tasks based on various criteria such as date and repeat status. This frontend is hosted using netlify while the backend is hosted on heroku. Please view the repo for the rails api backend here: https://github.com/KevinMCollier/to-do-rails-backend

## Production
- View the app in production at: https://starlit-raindrop-ab99bd.netlify.app/
- username: kevin@example.com
- password: password


## Key Features
- Task Creation: Users can create tasks with specific due dates and repeat statuses.
- Date Filtering: View tasks for today or all tasks.
- Repeat Functionality: Tasks can be set to repeat daily, on weekdays, weekends, or weekly.

## Future Improvements
- I wasn't able to get the filtering logic working correctly for upcoming todos given my limited timeframe. I plan to complete this in the near future.
- User Motivation Integration: Planning to implement a feature that utilizes a user motivation attribute in the task model. This will involve integrating coaching from an AI (ChatGPT) to send motivational messages to users, encouraging task completion based on the task's nature and the user's motivation level.

## Technologies Used
- React
- Tailwind CSS
- TypeScript
- Vite


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
