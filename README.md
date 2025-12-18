Expense Sharing Application 
Overview

This project is a simplified expense sharing application.
It allows users to create groups, add shared expenses, track balances, and settle dues.

The application is built with a clean backend architecture and a user-friendly frontend.

Tech Stack

Backend

Java 21
Spring Boot
Spring Data JPA (Hibernate)
MySQL
Lombok

Frontend

React
Vite
Tailwind CSS
Axios

Structure

cred/
├── expense/        Backend (Spring Boot)
│ ├── src/main/java/com/cred/expense
│ │ ├── controller  REST controllers
│ │ ├── service   Service interfaces & implementations
│ │ ├── repository JPA repositories
│ │ ├── model    Entity classes
│ │ ├── strategy  Expense split strategies
│ │ └── config   CORS and configuration
│ ├── src/main/resources
│ │ ├── application.example.properties
│ │ └── static
│ └── pom.xml
│
├── frontend/      Frontend (React + Vite)
│ ├── src
│ │ ├── components Reusable UI components
│ │ ├── pages   Users, Groups, Expenses, Settle
│ │ ├── api    Axios configuration
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
└── .gitignore

Backend Setup

Database Setup

Create a MySQL database:
CREATE DATABASE expense;

Configuration

Rename:

expense/src/main/resources/application.example.properties
→ application.properties

Update database credentials inside the file.

Run Backend

cd expense
mvn spring-boot:run

Backend runs at:

http://localhost:8080


Frontend Setup

Install Dependencies

cd frontend
npm install

Run Frontend

npm run dev


Frontend runs at:

http://localhost:5173


Application Workflow

User Management

Users are created from the Users page
All users can be viewed in a list

Group Management

Groups are created from the Groups page
Users are added to groups using dropdown selection

Expense Creation

Select a group
Choose who paid
Enter total amount
Choose split type: Equal, Exact, or Percentage
Expense shares are calculated automatically
Balances are updated accordingly

Balance Tracking

The system tracks who owes whom
Balances are simplified automatically
Only net balances are stored

Settlement

Select debtor and creditor
Outstanding balance is auto-filled
Manual amount entry is disabled
Settlement clears or reduces balances
Over-settlement is prevented

Expense Split Strategies

Equal – Split equally among all group members
Exact – Each user pays a fixed amount
Percentage – Split based on percentage values

Key Design Decisions

Authentication excluded for simplicity (assignment scope)
Strategy pattern used for expense splitting
Balances tracked between users
Settlement amount auto-filled to avoid errors
Sensitive configuration excluded from Git

Conclusion

This project demonstrates clean backend architecture, real-world expense-sharing logic, and thoughtful frontend UX design.
