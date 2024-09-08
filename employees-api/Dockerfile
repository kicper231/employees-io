FROM gradle:8.8.0-jdk21 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN apt-get update && apt-get install -y dos2unix && dos2unix ./gradlew && chmod +x ./gradlew
RUN ./gradlew clean bootJar --no-daemon

FROM openjdk:21-jdk-slim
WORKDIR /my-project
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar","-Dspring.profiles.active=dev", "app.jar"]