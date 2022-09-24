include .env
export $(shell sed 's/=.*//' .env)
REGISTRY_OWNER:=fazenda
MULTIARCH:=false
ARCHS:=linux/amd64
PROJECT_TAG:=main-ui-translated

ifeq (true, $(MULTIARCH))
	ARCHS:=linux/amd64,linux/arm64/v8
endif

all: install setup

install:
	@curl -fSL https://get.docker.com | sh
	sudo usermod -aG docker $USER
	sudo systemctl enable docker
	sudo systemctl start docker

setup:
	@docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	@docker buildx rm builder
	@docker buildx create --name builder --driver docker-container --use
	@docker buildx inspect --bootstrap

build:
	@docker buildx build \
  --platform linux/amd64 \
  --tag ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG}  \
  --load .

run: build
	@docker run --rm -it \
	--publish 80:80 \
  ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG}

publish:
	@docker buildx build \
  --platform linux/amd64 \
	--build-arg VUE_APP_MD_TOKEN_SESSION=${VUE_APP_MD_TOKEN_SESSION} \
	--build-arg VUE_APP_MD_TOKEN_SESSION=${VUE_APP_MD_TOKEN_SESSION} \
	--build-arg VUE_APP_CORS_PROXY=${VUE_APP_CORS_PROXY} \
  --tag ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG}  \
  --push .

deploy: publish
	@kubectl apply -f k8s/manga-up.rancher.yml
	@kubectl apply -f k8s/corsproxy.rancher.yml

local:
	@docker buildx build \
  --platform linux/amd64 \
  --target BASE \
  --tag ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG}  \
  --load .

dev: local
	@docker run --rm -it \
	--volume $(shell pwd):/usr/src \
	--network=host \
  ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG} \
	npm run serve

shell: local
	@docker run --rm -it \
	--volume $(shell pwd):/usr/src \
	--network=host \
  ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG} \
	/bin/sh

update: local
	@docker run --rm -it \
	--volume $(shell pwd):/usr/src \
	--network=host \
  ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG} \
	npm update

prod:
	@docker-compose up --build --remove-orphans
