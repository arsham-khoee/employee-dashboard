FROM node:18.9.1
# create destination directory
RUN mkdir -p /usr/src/employee-dashboard
WORKDIR /usr/src/employee-dashboard

COPY package*.json ./
# copy the app, note .dockerignore
RUN yarn
COPY . /usr/src/employee-dashboard/
# build necessary, even if no static files are needed,
# since it builds the server as well
# RUN yarn build
# expose 5000 on containerLk0alvYmmQD0nB
EXPOSE 5173

# start the app
# CMD [ "yarn", "start" ]
CMD [ "yarn", "dev" ]
