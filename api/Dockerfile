FROM alpine:3.4
LABEL authors="Hector Anadón <hanadonc@gmail.com>, Dani Carmona <danielcarmona55@gmail.com>, Ian Martorell <ianmartorell@gmail.com>
RUN apk add --update nodejs bash git
COPY package.json /www/package.json
RUN cd /www; npm install
COPY . /www
WORKDIR /www
ENV PORT 8080
EXPOSE  8080
CMD ["npm", "start"]
