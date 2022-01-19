REGISTRY_OWNER:=fazenda
MULTIARCH:=false
ARCHS:=linux/amd64
PROJECT_TAG:=latest

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
  --tag ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG}  \
  --push .

dev:
	@docker buildx build \
  --platform linux/amd64 \
  --target BASE \
  --tag ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG}  \
  --load .
	@docker run --rm -it \
	--network=host \
  ${REGISTRY_OWNER}/manga-up:${PROJECT_TAG} \
	npm run serve

prod:
	@docker-compose up --build --remove-orphans
