FROM node:alpine

WORKDIR /app
COPY package.json ./package.json
RUN npm install
COPY ./ ./

# Environment variables
# ENV NODE_ENV development
# ENV PORT 4001
# ENV DATABASE_URL mysql://root:123456@127.0.0.1:3306/auth

# Expose application port
EXPOSE 4001

# Start the application
CMD ["npm", "start"]