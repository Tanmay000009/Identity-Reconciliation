# Identity-Reconciliation-System

<br />

<!-- ABOUT THE PROJECT -->

## About The Project

The Contact Information Management Web Service is a Node.js-based web service that provides endpoints to handle contact information using a PostgreSQL database and TypeORM for data modeling and database interactions. The service allows users to identify and manage contact information based on email and phone number inputs.

### Built With

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js (v20.3.0 or higher)
- Docker (optional)
- Docker Compose (optional)

### Deployment

Application is deployed on EC2 instance and can be accessed at https://d326emlmo5pln5.cloudfront.net/

### Running Server Locally

1. Make sure you have Node.js installed on your system.
2. Clone the repository.
3. Navigate to the root directory of the project.
4. Take reference from the `.env.example` file to create the environment file `.env` and update the environment variables as needed.
5. Run the following command to start the server:

```
npm run start
```

6. The application will be accessible at http://localhost:3000.

### Using Docker Compose

1. Make sure you have Docker and Docker Compose installed on your system.
2. Clone the repository.
3. Navigate to the root directory of the project.
4. Run the following command to build and start the application in Docker containers:

```
docker-compose up -d
```

OR

```
./compose.sh
```

> If you are facing permission issues, run the following command:

```
chmod +x compose.sh
```

> The application will be accessible at http://localhost:3000.

### Using Docker Image

1. Make sure you have Docker installed on your system.
2. Clone the repository.
3. Navigate to the root directory of the project.
4. Take reference from the `.env.example` file to create the environment file `.env` and update the environment variables as needed.
5. Run the following command to build the Docker image:

```
./run.sh
```

OR

> Build the Docker image using the current directory as the build context

```
docker build -t <image-name>:<tag> .
```

> Run the Docker container interactively, mapping the required port (3000 in this case)
> and using the .env file from the host machine as a volume inside the container

```
docker run -it -p 3000:3000 --env-file .env <image-name>:<tag>
```

6. If you are facing permission issues, run the following command:

```
chmod +x run.sh
```

7. The application will be accessible at http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Tanmay Vyas

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tanmay000009)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tanmay-vyas-09/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tanmayvyas09@gmail.com)
[![Resume](https://img.shields.io/badge/Resume-000000?style=for-the-badge&logo=read-the-docs&logoColor=white)](https://drive.google.com/file/d/1lkfmeqseeSwK1GlJHEblz2ZuYzdNBRhm/view?usp=drive_link)
