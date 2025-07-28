HireWise - AI-Powered Job Portal
HireWise is a comprehensive, full-stack job portal designed to streamline the recruitment process for both applicants and employers. It features an advanced AI engine for resume analysis and job matching, a dynamic user interface, and a robust backend built with Django.

Live Demo URL: https://job-portal-umber-seven.vercel.app

Key Features
AI-Powered Resume Analysis: Users can upload their resumes to receive an instant ATS (Applicant Tracking System) score, helping them optimize their documents for modern recruitment systems.

Intelligent Job Matching: The platform uses NLP (Natural Language Processing) to match candidate resumes against internal job postings and jobs aggregated from across the web.

Dynamic Homepage Layout: A modern, single-page dashboard experience with a toggleable layout that switches between a focused "Header View" and an all-in-one "Scrolling View".

Full-Stack Architecture: A secure and scalable application with a React frontend and a Django REST Framework backend.

User Authentication: A complete and secure system for user registration, login, and session management using token authentication.

Theme Customization: A sleek, modern UI with a user-toggleable light/dark theme that is persisted across sessions.

Technologies Used
Frontend:

React.js

React Router for navigation

Axios for API communication

CSS with custom properties for theming

Backend:

Python

Django & Django REST Framework

spaCy for Natural Language Processing (NLP)

PostgreSQL (for production database)

Token Authentication

Deployment:

Backend: Render

Frontend: Vercel

Version Control: Git & GitHub

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm

Python and pip

Installation
Clone the repo

git clone https://github.com/Meghashyam10/job_portal.git

Setup Backend

cd backend
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Setup Frontend

cd frontend
npm install
npm start

Contact
Meghashyam Pamisetty - meghashyampamisetty@gmail.com

Project Link: https://github.com/Meghashyam10/job_portal