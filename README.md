# Spam Detection System

A full-stack application that detects spam messages using machine learning. The system provides a user-friendly interface for users to input messages and get real-time spam classification results.

## Features

- **Spam Detection**: Classifies messages as spam or not spam
- **Real-time Analysis**: Provides instant feedback on message classification
- **Responsive UI**: Works on both desktop and mobile devices
- **RESTful API**: Backend service for message processing

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios for API communication

### Backend
- Java
- Spring Boot
- Maven
- Machine Learning Model (TBD based on implementation)

## Prerequisites

- Node.js (v14 or higher)
- Java JDK (v11 or higher)
- Maven (v3.6 or higher)
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
  cd backend
```

2. Build the project:
  ```bash
  mvn clean install
```

3. Run the application:
 ``` bash
mvn spring-boot:run
```
## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:5173


## Project Structure

```
SpamDetect/
├── backend/           # Backend Spring Boot application
│   ├── src/           # Source files
│   └── pom.xml        # Maven configuration
└── frontend/          # Frontend React application
    ├── src/           # Source files
    ├── public/        # Static files
    └── package.json   # Node.js dependencies
```


## Output Screenshot

### Home Page
<img width="1183" height="767" alt="image" src="https://github.com/user-attachments/assets/f3d955b0-25d8-4a64-80f0-44aabff300d7" />


### After Detection
<img width="1033" height="949" alt="image" src="https://github.com/user-attachments/assets/017b9459-d49b-40dd-b5d8-72535250262e" />



## API Endpoints
- POST /api/classify - Classify a message as spam or not spam
     - Request body: { "message": "Your message here" }
     - Response: { "isSpam": boolean, "confidence": number }


## Contributing
1. Fork the repository
2. Create a new branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request


## License
This project is licensed under the MIT License - see the LICENSE file for details.
