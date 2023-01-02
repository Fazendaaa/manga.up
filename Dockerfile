FROM node:lts-alpine3.15 AS BASE

RUN [ "npm", "install", "--global", "@vue/cli" ]

WORKDIR /usr/src/

COPY package.json .

RUN [ "npm", "install" ]

COPY .browserslistrc .
COPY .stylelintrc .
COPY ./public ./public/
COPY *.js .
COPY *.json .
COPY ./src/ ./src/

EXPOSE 80



FROM node:lts-alpine3.15 AS TESTS

WORKDIR /usr/src/

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



FROM node:lts-alpine3.15 AS BUILD

WORKDIR /usr/src

COPY --from=TESTS /usr/src/ .

ARG VUE_APP_CORS_PROXY=${VUE_APP_CORS_PROXY}

RUN [ "npm", "run", "build" ]
RUN [ "npm", "run", "appendIcons" ]



FROM node:lts-alpine3.15 AS SERVER
LABEL author="fazenda"
LABEL project="manga-up"

WORKDIR /usr/src/

COPY --from=BUILD /usr/src/dist/ .

RUN [ "npm", "install", "--global", "serve" ]

ENTRYPOINT [ "serve", "--single", "--listen", "80", "." ]

EXPOSE 80
