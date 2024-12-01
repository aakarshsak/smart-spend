# SmartSpend: AI-Powered Personal Finance Manager

SmartSpend is a cloud-based platform designed to help users efficiently manage their finances. Leveraging AI, it provides real-time expense tracking, budget management, and personalized financial insights to empower smarter financial decisions.

## Features

- **Expense Tracking**: Real-time tracking of expenses with automated categorization and analytics.
- **Budget Management**: Create, monitor, and adhere to budgets with intuitive visualizations.
- **AI-Driven Insights**: Personalized financial recommendations and predictive analytics powered by AI.
- **Investment Tracking**: Monitor investments like stocks, crypto, and mutual funds with real-time updates.
- **Interactive Dashboard**: Visualize spending trends and financial goals using React and Chart.js.
- **Scalability and Security**: Secure authentication with Spring Security, performance optimization using Kafka and Redis, and deployment on Google Cloud Platform using Docker and Kubernetes.

## Tech Stack

- **Backend**: Java, Spring Boot, Hibernate, Spring Security, Kafka, Redis.
- **Frontend**: React, Redux, Tailwind CSS, Chart.js.
- **Database**: MongoDB, PostgreSQL.
- **DevOps**: Docker, Kubernetes, Google Cloud Platform.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/aakarshsak/smartspend.git
   ```

2. Navigate to the project directory:
   ```bash
   git clone https://github.com/your-username/smartspend.git
   ```
3. Set up the backend:

   - Configure environment variables for database and API keys.
   - Build and run the Spring Boot application:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. Set up the frontend::
   - Navigate to the frontend directory.
   ```bash
   cd frontend
   ```
   - Install dependencies and start the React app:
   ```bash
   npm install
   npm start
   ```

## Ports

| Microservices      | Ports |
|--------------------|-------|
| Expense Management | 8000  |
| Authentication     | 8100  |
| User Profiles      | 8200  |
| API Gateway        | 8765  |
| Naming Server      | 8761  |
| Config Server      | 8888  |