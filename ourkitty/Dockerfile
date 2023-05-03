# Base Image
FROM openjdk:11

# Set the working directory to /app
WORKDIR /app

# Copy the project files to the container (/app)
COPY build/libs/*.jar app.jar

# Expose port 8000 for the container
EXPOSE 8080

# start the app
ENTRYPOINT ["java","-jar","app.jar"]
