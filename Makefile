.PHONY: default

default:
	moon build --target js --debug
	@python3 -m http.server 8080
