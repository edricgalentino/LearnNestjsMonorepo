FROM node:14

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Rebuild bcrypt package
RUN npm rebuild bcryptjs --build-from-source

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["npm", "start"]
