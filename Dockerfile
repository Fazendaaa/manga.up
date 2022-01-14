FROM alpine:3.15 AS base

RUN [ "apk", "add", "--no-cache", \
  "nodejs=16.13.2-r0", \
  "npm=8.1.3-r0" \
]

WORKDIR /usr/src

COPY package.json .

RUN [ "npm", "install" ]

COPY . .

EXPOSE 80



FROM alpine:3.15 AS BUILD
LABEL author="fazenda"
LABEL project="manga-up"

WORKDIR /usr/src

RUN [ "apk", "add", "--no-cache", \
  "nodejs=16.13.2-r0", \
  "npm=8.1.3-r0" \
]

COPY --from=BASE /usr/src .

RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]

ENTRYPOINT [ "vite", "preview", "--port", "80" ]

EXPOSE 80
