ifneq ("$(wildcard .env)","")
include .env
endif


PROJECT_NAME = $(shell basename $(CURDIR))
DOKKU_HOST = $(shell cat .env | grep DOKKU_HOST | cut -d'=' -f2)



.PHONY: set-dokku-host
set-dokku-host:
	@echo "Please enter the Dokku host:" && \
	read -p "Dokku host: " DOKKU_HOST && \
	echo "\nDOKKU_HOST=$$DOKKU_HOST" >> .env


.PHONY: setup-dokku
setup-dokku:
	@echo "Setting up Dokku..."

	@echo "Checking if you have the DOKKU_HOST environment variable..."
	@cat .env | grep DOKKU_HOST && echo "DOKKU_HOST is set." || $(MAKE) set-dokku-host && echo "DOKKU_HOST is set."

	@echo "Creating app: $(PROJECT_NAME)"
	dokku apps:create $(PROJECT_NAME)

	@echo "Setting up environment variables..."
	dokku config:set --no-restart $(shell cat .env | grep -v '^DOKKU_HOST=' | xargs)

	@echo "Setting up the `DEBUG` environment variable to `False`..."
	dokku config:set --no-restart DEBUG=0 LOG_LEVEL=INFO

	@echo "The app is now set up. You can now deploy the app using the \`make deploy\` command."



.PHONY: set-website-domain
set-website-domain:
	@echo "Please enter the website domain:" && \
	read -p "Website domain: " WEBSITE_DOMAIN && \
	dokku domains:add $$WEBSITE_DOMAIN


.PHONY: add-letsencrypt
add-letsencrypt:
	@echo "Setting up Let's Encrypt..."
	dokku letsencrypt:enable

	@echo "Creating a cron job to renew the Let's Encrypt certificate..."
	dokku letsencrypt:cron-job --add

	@echo "The app is now set up with Let's Encrypt. You can now deploy the app using the \`make deploy\` command."


.PHONY: deploy
deploy:
	@echo "Deploying the app..."
	git push dokku main
