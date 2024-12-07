# Fetching the latest node image on alpine linux
FROM node:18-alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
RUN mkdir /client
COPY . /client
WORKDIR /client

# Installing dependencies
COPY ./package*.json /client

RUN npm install

# Starting our application
CMD ["npm","start"]