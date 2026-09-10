#  Edvora — EdTech Platform

🚀 Live site: https://edvora-beryl.vercel.app

A full-stack EdTech platform for creating, consuming, and rating educational content. StudyNotion (Edvora) combines a React front-end, Node/Express back-end, and MongoDB to deliver a fast, responsive learning experience — including an AI-powered virtual teacher.

---

## Demo accounts (for testing)
> Use these accounts on the live demo or in a local environment seeded with demo data.

- Instructor
  - Email: aryan.singh766768@gmail.com
  - Password: 123456
- Student
  - Email: shambhudhanpal@gmail.com
  - Password: 123456

---

## Quick demo screenshots
![Main Page](images/mainpage.png)
![Database Schema](images/schema.png)
![Architecture](images/architecture.png)

---

## Table of Contents
- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Data Models](#architecture--data-models)
- [API Endpoints (Overview)](#api-endpoints-overview)
- [Installation & Local Development](#installation--local-development)
- [Configuration (.env)](#configuration-env)
- [Usage](#usage)
- [Contributing](#contributing)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

---

## About
Edvora aims to simplify digital learning with:
- High-quality courses (video + docs + markdown content)
- Instructor tools to create/manage/sell courses
- Student-facing features: wishlist, cart, course progress, ratings
- AI Virtual Teacher that generates teaching videos and transcripts on a topic

---

## Key Features
- User authentication and roles (Student / Instructor)
- Course creation, editing, and media management
- Course listing, ratings, wishlist, and checkout flow
- Razorpay payment integration
- Cloudinary for media storage
- AI Virtual Teacher: topic → teaching video + transcript/explanation
- Markdown content support for lessons/documents
- Instructor analytics (views, clicks, ratings)

---

## Tech Stack
- Front-end: React, Tailwind CSS, Redux (state management)
- Back-end: Node.js, Express
- Database: MongoDB (Mongoose ODM)
- Auth: JWT, bcrypt
- Media: Cloudinary
- Payments: Razorpay
- Misc: Nodemailer (mail), any AI / DID services for virtual teacher

---

## Architecture & Data Models
The platform follows a client-server architecture:

- Client (React): UI, routing, authentication flows, course consumption
- Server (Express): REST API, authentication, business logic
- Database (MongoDB): users (students/instructors), courses, orders, ratings

Representative Schemas:
- User (student/instructor): name, email, passwordHash, role, profile
- Course: title, description, instructorId, media (Cloudinary), price, ratings, lessons (markdown)
- Order / Checkout: studentId, courseId(s), paymentStatus, razorpay meta

See images/schema.png for the visual database schema and images/architecture.png for the system diagram.

---

## API Endpoints — Overview
The API follows REST conventions. For full API docs, see the API documentation in the repo or /api-docs.

Common endpoints:
- POST /auth/register — register a user
- POST /auth/login — login and receive JWT
- GET /courses — list all courses
- GET /courses/:id — get a single course
- POST /courses/create — create a course (instructor)
- PATCH /courses/:id — update a course
- DELETE /courses/:id — delete a course
- POST /ai/teacher — generate AI teaching output (video + transcript)
- POST /payment/checkout — start checkout / create order (Razorpay)

---

## Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AryanCodeWizard/Edvora.git
   cd Edvora
   ```

2. Install root and client dependencies:
   - If there's a single package.json (monorepo), run:
     ```bash
     npm install
     ```
   - If server and client are separate:
     ```bash
     # server
     npm install
     # client
     cd client
     npm install
     ```

3. Start development:
   - If scripts are available in root:
     ```bash
     npm run dev
     ```
   - Or start server and client separately:
     ```bash
     # in repo root (server)
     npm run dev
     # in client
     npm start
     ```

4. Open the app:
   - Default client: http://localhost:3000
   - API: http://localhost:5000 (or configured port)

Notes:
- If using concurrently or a single dev script, check package.json for exact commands (e.g., dev, start).

---

## Docker

The repository includes a full Compose setup for the React client, Express API, and a local MongoDB container.

1. Create a root `.env` file from the template:
  ```bash
  cp .env.example .env
  ```
  Then fill in any required secrets.
2. Start the stack:
  ```bash
  docker compose up --build
  ```
3. Open the app at http://localhost:3000.

Service startup order is managed automatically with health checks:
- MongoDB becomes healthy first
- Backend starts after MongoDB is healthy
- Frontend starts after backend is healthy

Container ports:
- Frontend: 3000
- Backend API: 4000
- MongoDB: 27017

Notes:
- The frontend build uses `REACT_APP_BASE_URL=http://localhost:4000/api/v1` by default.
- The backend accepts either `MONGODB_URL` or `MONGODB_URI`.
- Cloudinary keys can be provided as either `API_KEY`/`API_SECRET` or `CLOUD_API_KEY`/`CLOUD_API_SECRET`.

---

## CI/CD (GitHub Actions -> AWS ECS)

This repository now includes two workflows:

- `.github/workflows/ci.yml`
  - Runs on pull requests and selected branch pushes
  - Installs dependencies, lints and builds frontend, and validates Docker image builds
- `.github/workflows/cd-aws-ecs.yml`
  - Runs on push to `main`/`master` and manual trigger
  - Uses AWS OIDC auth, builds/pushes backend and frontend images to ECR, then deploys both ECS services

### 1) Configure GitHub Secret

Create this repository secret:

- `AWS_ROLE_TO_ASSUME`: IAM role ARN that GitHub Actions can assume via OIDC

### 2) Configure GitHub Variables

Create these repository variables:

- `AWS_REGION` (example: `ap-south-1`)
- `ECR_REPOSITORY_FRONTEND` (example: `edvora/frontend`)
- `ECR_REPOSITORY_BACKEND` (example: `edvora/backend`)
- `ECS_CLUSTER` (example: `edvora-cluster`)
- `ECS_SERVICE_FRONTEND` (example: `edvora-frontend-svc`)
- `ECS_SERVICE_BACKEND` (example: `edvora-backend-svc`)
- `FRONTEND_CONTAINER_NAME` (must match container name in ECS task definition)
- `BACKEND_CONTAINER_NAME` (must match container name in ECS task definition)
- `REACT_APP_BASE_URL` (example: `https://api.your-domain.com/api/v1`)
- `REACT_APP_RAZORPAY_KEY` (public Razorpay key)

### 3) AWS prerequisites

- ECR repositories already created for frontend and backend
- ECS cluster and both services already created
- Task definitions for each service already exist, with container names matching the variables above
- IAM role trust policy allows GitHub OIDC for your repository

### 4) Deploy

- Push to `main` (or `master`) to deploy automatically
- Or run `CD - Deploy to AWS ECS` manually from the Actions tab

---

## Configuration (.env)
Create a `.env` file in the project root with the following variables (example values shown):

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_SECRET=your-razorpay-secret
MAIL_USER=your-email@example.com
MAIL_PASS=your-email-app-password
GROQ_API_KEY=your-groq-key
DID_API_KEY=your-did-key
DID_AVATAR_URL=https://example.com/avatar.png
PORT=5000
```

Tips:
- Keep .env out of version control.
- Use a separate .env for development and production.

---

## Usage
- Register as an Instructor or Student.
- Instructors: create courses, upload media via Cloudinary, set prices.
- Students: browse courses, add to wishlist/cart, checkout via Razorpay, access course content.
- AI Teacher: submit a topic to /ai/teacher to generate teaching media and transcript.

---

## Contributing
Contributions are welcome! Suggested workflow:
1. Fork the repo
2. Create a feature branch: git checkout -b feat/your-feature
3. Commit your changes: git commit -m "Add feature"
4. Push: git push origin feat/your-feature
5. Open a pull request describing your changes

Please include tests or manual testing steps for non-trivial changes.

---

## Future Enhancements
- Better AI teacher UX (custom voices, adjustable lesson length)
- Course previews and free trial lessons
- Subscriptions and coupon support
- Internationalization (i18n)
- Improved analytics dashboard
- Unit & integration tests across the stack

---

## License
Add a LICENSE file to clarify project licensing. If you want, use MIT or another permissive license.

---

## Contact
Maintainer: AryanCodeWizard (https://github.com/AryanCodeWizard)  
For questions about the project or to request access to demo data, open an issue in the repository.

---

Thank you for using Edvora — happy building and learning!
