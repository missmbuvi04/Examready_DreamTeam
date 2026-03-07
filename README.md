# ExamReady

> [Preparation for Examination made easy with ExamReady]

## African Context

[High school students across Africa face a serious challenge when preparing for
national examinations. Quality study resources are either too expensive,
hard to find, or not structured in a way that helps students identify and
improve on their weak areas. Without access to private tutors or organized
practice materials, many students walk into high-stakes exams underprepared —
not because they lack the ability, but because they lacked the right tools.

ExamReady solves this by giving every high school student access to a free,
structured, and easy-to-use exam preparation platform where they can practice
questions, get instant feedback, and track their progress over time.]

## Team Members

- [Maureen Mbuvi] - [Backend Developer]
- [Beverly Tashinga Mugwadi] - [Backend Developer]
- [Agape Ineza] - [Frontend Developer]
- [Quentin Ineza Alain Rurangirwa] - [Frontend Developer]

## Project Overview

[ExamReady is a web-based exam preparation platform designed to help high school students across Africa prepare effectively for national and school-based examinations. The application provides a structured and accessible space where students can practice exam-style questions, receive instant feedback, and continuously improve their understanding of key subjects. By offering free and organized study tools, ExamReady reduces the gap between students who have access to private tutoring and those who do not.

The platform allows students to attempt quizzes based on specific topics, helping them focus on areas where they need the most improvement. After completing a quiz, students receive immediate results, including correct answers and explanations, enabling them to learn from their mistakes in real time. ExamReady also tracks student performance over time, allowing users to monitor progress, identify weak areas, and build confidence before sitting for high-stakes examinations.

Built using React for the frontend, Node.js for the backend, and MySQL for data management, ExamReady ensures a smooth and responsive user experience. The system includes a scalable question storage structure, making it easy to update and expand the question bank as new content is added. Overall, ExamReady empowers students with the right tools to practice smarter, track growth, and walk into exams fully prepared.]

### Target Users
- High school students preparing for national or school-based exams.
- Teachers looking for structured tools to support student practice.

### Core Features
- Instant Answers & Feedback: Students get immediate results after answering questions, with explanations for correct and incorrect answers.
- Progress Tracking: Track performance over time to monitor improvements and identify weak areas.
- Practice Questions: Access exam-style questions and focus on specific topics to sharpen knowledge.

## Technology Stack

- **Backend**: Node.js
- **Frontend**: React
- **Database**: MySQL
- **CI/CD**: Github actions
- **Containerization**: Docker & Docker compose
- **Testing**: Jest

## Getting Started

### Prerequisites
Install the following:
- Node.js 16+
- MySQL Database installed
- Docker

### Installation

#### Local setup (without Docker)

1. Clone the repository
```bash
   git clone https://github.com/missmbuvi04/Examready_DreamTeam.git
   cd Examready_DreamTeam
```

2. Set up the backend:
```bash
   cd examready-backend
   npm install
   cp .env.example .env  # for the environment variables
   npm run dev
```

3. Set up the frontend:
```bash
  cd examready-frontend
  npm install
  npm run dev
```

4. Run the application
```bash
   npm run dev
```
5. Access the application (local dev):
- Frontend: http://localhost:5173/
- Backend API: http://localhost:5000

#### DOcker setup

1. Clone the repository
```bash
   git clone https://github.com/missmbuvi04/Examready_DreamTeam.git
   cd Examready_DreamTeam
```

2. Run with Docker compose
```bash
   docker-compose up --build
   docker-compose logs -f
```
3. Stop the containers
```bash
   docker-compose down
```
3. Access the application:
- Frontend: http://localhost:3000/
- Backend API: http://localhost:5000
- Database: localhost:3308 (MySQL, mapped from container port 3306)

### Docker configuration

#### Docker commands
```bash
docker build -t examready-backend ./examready-backend
docker build -t examready-frontend ./examready-frontend

# Run containers
docker run -p 5000:5000 examready-backend
docker run -p 3000:3000 examready-frontend

# Using Docker Compose
docker-compose up -d
docker-compose ps
docker-compose logs -f backend
docker-compose exec backend npm test
```

### CI/CD pipeline

This project uses **GitHub Actions** as our CI/CD platform with **Jest** for testing.

### What the CI Pipeline Does

- **Triggers** on:
  - Every push to any branch (except main)
  - Every pull request targeting `main`

- **Automatically Runs**:
  - **Linting** - Checks code style and catches errors
  - **Tests** - Runs Jest test suite
  - **Docker Build** - Verifies Docker images build correctly

- **Enforces Quality**:
  - Pipeline fails if linting fails
  - Pipeline fails if tests fail
  - Pipeline fails if Docker build fails

### View CI Results

1. Go to our repository on GitHub
2. Click the [**Actions tab**](https://github.com/missmbuvi04/Examready_DreamTeam/actions/workflows/ci.yml)
3. Select any workflow run to see detailed results


### Usage

- Register or log in as a student.
- Select a subject and topic to attempt quizzes.
- Answer questions and view instant feedback.
- Track progress on the dashboard over time.


### Links

- [Project Board](https://github.com/users/missmbuvi04/projects/6)

### License

- [MIT License](https://github.com/missmbuvi04/Examready_DreamTeam?tab=MIT-1-ov-file)
