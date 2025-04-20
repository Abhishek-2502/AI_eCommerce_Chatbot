# Use Python 3.10 base
FROM python:3.10-slim

# Install Node.js 18 manually
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs build-essential

# Create app directory
WORKDIR /app

# Install Node dependencies first
COPY package*.json ./
RUN npm install

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of your backend code
COPY . .

# Expose port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
