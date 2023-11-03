# First stage - Base
ARG NODE_IMAGE=node:14-alpine
FROM $NODE_IMAGE AS base
WORKDIR /home/node/app
RUN mkdir tmp

#Second stage - dependencies
FROM base AS production
COPY ./package*.json ./
RUN npm i
COPY . .

#Third stage - production
CMD ["time","node", "hilos.js"]

#docker build -t hilo_1:latest .
#docker run hilo_1:latest