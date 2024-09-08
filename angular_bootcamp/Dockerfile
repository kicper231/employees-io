FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:latest
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/dist/angular_bootcamp/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


#FROM node:alpine
#WORKDIR /app
#RUN npm install -g http-server
#COPY --from=build /app/dist/angular_bootcamp/browser /app
#EXPOSE 80
#CMD ["http-server", "/app", "-p", "80"]
