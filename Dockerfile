FROM ubuntu

RUN apt-get update

RUN apt-get install gnupg -y

RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

RUN mkdir /etc/apt/sources.list.d/mongodb-org-4.2.list
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

RUN apt-get update

RUN apt-get install -y mongodb-org

RUN mkdir -p /data/db

EXPOSE 27017

CMD ["--port 27017", "--smallfiles"]

ENTRYPOINT usr/bin/mongod