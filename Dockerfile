# pull official base image
FROM node:16-alpine AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./
COPY yarn.lock ./

# Installs all node packages
RUN yarn


# Copies everything over to Docker environment
COPY . ./
RUN yarn build

#Stage 2
#######################################
#pull the official nginx:1.21.6-alpine base image
FROM nginx:1.21.6-alpine
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]