FROM node:18.9.0-alpine3.15 AS BASE

RUN [ "npm", "install", "--global", "@vue/cli" ]

WORKDIR /usr/src/

COPY package.json .

RUN [ "npm", "install" ]

ARG VUE_APP_MD_TOKEN=${VUE_APP_MD_TOKEN}
ARG VUE_APP_MD_TOKEN_REFRESH=${VUE_APP_MD_TOKEN_REFRESH}

COPY ./public ./public/
COPY *.js ./
COPY *.json ./
COPY .browserslistrc ./
COPY .eslintrc.js ./
COPY ./src/ ./src/

EXPOSE 80



FROM node:18.9.0-alpine3.15 AS TESTS

WORKDIR /usr/src

RUN [ "apk", "add", "--no-cache", \
  "g++", \
  "make", \
  "python3" \
]


COPY --from=BASE /usr/src/ .

COPY ./tests/ ./tests/

# RUN [ "npm", "run", "lint" ]
# RUN [ "npm", "run", "test:unit" ]
# RUN [ "npm", "run", "test:e2e" ]



FROM node:18.9.0-alpine3.15 AS BUILD

WORKDIR /usr/src
COPY --from=TESTS /usr/src/ .

RUN [ "npm", "run", "build" ]



FROM node:18.9.0-alpine3.15 AS SERVER
LABEL author="fazenda"
LABEL project="manga-up"

WORKDIR /usr/src
COPY --from=BUILD /usr/src/dist/ .

RUN [ "npm", "install", "--global", "http-server" ]

ENTRYPOINT [ "http-server", "--port", "80", "--address", "0.0.0.0", "." ]

EXPOSE 80
