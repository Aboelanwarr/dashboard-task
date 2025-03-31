# Eyego Frontend Internship Dashboard

A responsive dashboard built for the Eyego Frontend Internship task using Next.js, Firebase, Redux Toolkit, Tailwind CSS, and Chart.js.

## Features
- User authentication with Firebase (Google Sign-In).
- Dynamic table with sorting, filtering, and pagination.
- Chart visualization with Chart.js.
- State management with Redux Toolkit.
- Mobile-friendly design using Tailwind CSS.

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Aboelanwarr/eyego-dashboard
   cd eyego-dashboard
2. **Install Dependencies**:
   npm install
3. **Set Up Firebase**:
  Create a Firebase project at console.firebase.google.com.
  Add your Firebase config to a .env.local file
4. **Run the project**:
  npm run dev

## Notes
Uses DummyJSON API (https://dummyjson.com/products) for sample data.
Tested on desktop and mobile with Tailwind’s responsive utilities.

## Approach
- Used Redux Toolkit to centralize table and chart data.
- Implemented Tailwind for quick, responsive styling.
- Chose Firebase for simple Google auth integration.