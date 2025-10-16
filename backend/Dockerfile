# Use Java 21 (LTS)
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy all backend files
COPY . .

# Give execute permission to Maven wrapper
RUN chmod +x mvnw

# Build the project (skip tests)
RUN ./mvnw clean package -DskipTests

# Expose Spring Boot port
EXPOSE 8080

# Ensure Spring Boot listens on all interfaces
ENV JAVA_OPTS="-Dserver.address=0.0.0.0"

# Start the application
CMD ["sh", "-c", "java $JAVA_OPTS -jar target/*.jar"]