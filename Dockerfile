FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="tasmslm1990@gmail.com"

EXPOSE 8080

ADD backend/target/app.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]