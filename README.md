# AI_Commerce_Chatbot

## Local
### client
cd client
npm i 
npm run dev

### server
cd server
npm i
pip install -r requirements.txt
npm start

## Through Docker
docker build -t client-app .
docker run -d -p 5173:5173 client-app

docker build -t backend-app .
docker run -d -p 5000:5000 backend-app

## Through Docker Compose
docker-compose up --build -d

## Add .env in server

PORT=5000

MONGO_URI= mongodb+srv://tripathiparth2411:32H6JWhSHyW267Gd@chatbot-cluster.d1xs99b.mongodb.net/?retryWrites=true&w=majority&appName=chatbot-cluster

JWT_SECRET=your_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
GOOGLE_API_KEY=your_google_api_key

## Add google-speech-key.json in server

## Add model.safetensors in server
