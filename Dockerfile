
FROM bellsoft/liberica-openjdk-alpine:17.0.2

WORKDIR /app

ENV NODE_VERSION=14.17.3
RUN apk add curl
RUN apk add bash
RUN apk add maven
RUN apk add --no-cache libstdc++
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN node --version
RUN npm --version

COPY frontend /home/app/frontend
COPY src /home/app/src
COPY lombok.config /home/app
COPY pom.xml /home/app

ENV PRODUCTION=true
RUN mvn -B -DskipTests -Pproduction -f /home/app/pom.xml clean package

ENTRYPOINT ["sh", "-c", "java -jar /home/app/target/*.jar"]