FROM node:14.18-alpine AS BASE

RUN [ "apk", "add", "--no-cache", \
  "g++", \
  "make", \
  "python3" \
]

WORKDIR /usr/src/

COPY ./public ./public/
COPY *.js ./
COPY *.ts ./
COPY *.json ./
COPY .browserslistrc ./
COPY .eslintrc.js ./

RUN [ "npm", "install" ]

COPY ./src/ ./src/

EXPOSE 80



FROM node:14.18-alpine AS TESTS

WORKDIR /usr/src
COPY --from=BASE /usr/src/ .

COPY ./tests/ ./tests/

RUN [ "npm", "run", "lint" ]
RUN [ "npm", "run", "test:unit" ]
RUN [ "npm", "run", "test:e2e" ]



FROM node:14.18-alpine AS BUILD

WORKDIR /usr/src
COPY --from=BASE /usr/src/ .

RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]



FROM node:14.18-alpine AS SERVER
LABEL author="fazenda"
LABEL project="manga-up"

WORKDIR /usr/src
COPY --from=BASE /usr/src/dist/ .

RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]

ENTRYPOINT [ "" ]

EXPOSE 80
