# AI_Commerce_Chatbot


## Running the Project
### 1. Local Run
#### client
cd client
npm i 
npm run dev

#### server
cd server
npm i
pip install -r requirements.txt
npm start

### 2. Run through Docker
docker build -t client-app .
docker run -d -p 5173:5173 client-app

docker build -t backend-app .
docker run -d -p 5000:5000 backend-app

### 3. Run through Docker Compose
docker-compose up --build -d


## Files to be added in server dir
### 1. Add .env in server

### 2. Add google-speech-key.json in server

### 3. Add model.safetensors in server -> ai-model -> customer_chatbot_model

## Replace localhost with EC2 IP in following files
- server -> socket.js
- client -> src -> utils -> authService.js, socket.js
- client -> src -> socket.js

