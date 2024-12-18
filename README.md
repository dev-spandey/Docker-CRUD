# Project structure MERN stack

/DOCKER-CRUD
│
├── backend/                  # Node.js and Express API
│   ├── Dockerfile            # Backend Dockerfile
│   ├── server.js             # Express API entry point
│   └── package.json          # Backend dependencies and scripts
│
├── frontend/                 # React application
│   ├── Dockerfile            # Frontend Dockerfile
│   ├── src/                  # React source files
│   └── package.json          # Frontend dependencies
│
├── docker-compose.yml        # Docker Compose configuration for backend, frontend and mongodb
└── README.md                 # Project documentation

Make sure to install docker in the machine and start the docker then run below command to start all the services

## docker-compose up --build

access UI visiting http://localhost/

to view all the container type below command

## docker ps

to stop the docker container run below command

## docker-compose down

Mongodb is used for storing the data