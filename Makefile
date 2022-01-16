build:
	@docker buildx build \
  --platform linux/amd64 \
  --tag fazenda/manga-up \
  --load .

run: build
	@docker run --rm -it \
	--publish 80:80 \
  fazenda/manga-up

publish:
	@docker buildx build \
  --platform linux/amd64 \
  --tag fazenda/manga-up \
  --push .
