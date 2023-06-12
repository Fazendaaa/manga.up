include .env
export $(shell sed 's/=.*//' .env)
REGISTRY_OWNER:=fazenda
MULTIARCH:=true
ARCHS:=linux/amd64
PROJECT:=manga-up
PROJECT_TAG:=latest

ifeq (true, $(MULTIARCH))
	ARCHS:=linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v6
endif

all: install setup

install:
	@curl -fSL https://get.docker.com | sh
	sudo usermod -aG docker $USER
	sudo systemctl enable docker
	sudo systemctl start docker

# https://github.com/docker/buildx/issues/132#issuecomment-847136842
setup:
	@LATEST=$(shell wget -qO- "https://api.github.com/repos/docker/buildx/releases/latest" | jq -r .name); \
		wget https://github.com/docker/buildx/releases/download/$$LATEST/buildx-$$LATEST.linux-amd64; \
		chmod a+x buildx-$$LATEST.linux-amd64; \
		mkdir -p ~/.docker/cli-plugins; \
		mv buildx-$$LATEST.linux-amd64 ~/.docker/cli-plugins/docker-buildx;
	@docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	@docker buildx rm builder
	@docker buildx create --name builder --driver docker-container --use
	@docker buildx inspect --bootstrap

build:
	@docker buildx build \
  --platform linux/amd64 \
  --tag ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG}  \
  --load .

run: build
	@docker run --rm -it \
	--publish 80:80 \
  ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG}

publish:
# https://stackoverflow.com/a/72554031
	@docker run --rm --privileged tonistiigi/binfmt --install all
	@docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	@docker buildx build \
  --platform ${ARCHS} \
	--build-arg VUE_APP_MD_TOKEN_SESSION=${VUE_APP_MD_TOKEN_SESSION} \
	--build-arg VUE_APP_MD_TOKEN_SESSION=${VUE_APP_MD_TOKEN_SESSION} \
	--build-arg VUE_APP_CORS_PROXY=${VUE_APP_CORS_PROXY} \
  --tag ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG}  \
  --push .

deploy: publish
	@kubectl apply -f k8s/manga-up.rancher.yml
	@kubectl apply -f k8s/corsproxy.rancher.yml

local:
	@docker buildx build \
  --platform linux/amd64 \
  --target BASE \
  --tag ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG}  \
  --load .

dev: local
	@docker run --rm -it \
	--volume $(shell pwd):/usr/src \
	--network=host \
  ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG} \
	npm run serve

shell: local
	@docker run --rm -it \
	--volume $(shell pwd):/usr/src \
	--network=host \
  ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG} \
	/bin/sh

update: local
	@docker run --rm -it \
	--volume $(shell pwd):/usr/src \
	--network=host \
  ${REGISTRY_OWNER}/${PROJECT_TAG}:${PROJECT_TAG} \
	npm update

prod:
	@docker-compose up --build --remove-orphans

build-docs:
	@docker buildx build \
		--file docs/Dockerfile \
		--platform linux/amd64 \
		--push --tag ${REGISTRY_OWNER}/appnest \
		docs/

doc:
	@docker run --rm \
		--volume ${PWD}:${PWD} \
		--workdir ${PWD} ${REGISTRY_OWNER}/appnest \
		--package docs/package.json \
		--config docs/blueprint.json \
		--input docs/README.pt.md \
		--output README.pt.md
	@docker run --rm \
		--volume ${PWD}:${PWD} \
		--workdir ${PWD} ${REGISTRY_OWNER}/appnest \
		--package docs/package.json \
		--config docs/blueprint.json \
		--input docs/README.md \
		--output README.md
