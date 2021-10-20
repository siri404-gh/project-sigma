FROM node:dubnium-alpine AS project-sigma-builder
ADD package.json /project-sigma/
ADD package-lock.json /project-sigma/
WORKDIR /project-sigma/
RUN npm run setup

FROM project-sigma-builder AS project-sigma
WORKDIR /project-sigma/
ENV NODE_ENV="production"
ADD . /project-sigma/
RUN npm run build
EXPOSE 3001/tcp
CMD [ "npm", "start" ]