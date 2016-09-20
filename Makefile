ifndef STAGE
	STAGE = prod
endif

deps-master:
	cd master && \
	npm install .

deps-worker:
	cd worker && \
	npm install .

deps: deps-master deps-worker

deploy-master:
	cd master && \
	serverless deploy --stage $(STAGE) --region us-east-1

deploy-workers:
	cd worker && \
	serverless deploy --stage $(STAGE) --region us-east-1 && \
	serverless deploy --stage $(STAGE) --region us-west-2 && \
	serverless deploy --stage $(STAGE) --region ap-northeast-1 && \
	serverless deploy --stage $(STAGE) --region ap-northeast-2 && \
	serverless deploy --stage $(STAGE) --region ap-southeast-1 && \
	serverless deploy --stage $(STAGE) --region ap-southeast-2 && \
	serverless deploy --stage $(STAGE) --region eu-west-1 && \
	serverless deploy --stage $(STAGE) --region eu-central-1

deploy: deploy-master deploy-workers

remove-master:
	cd master && \
	serverless remove --stage $(STAGE) --region us-east-1

remove-workers:
	cd worker && \
	serverless remove --stage $(STAGE) --region us-east-1 && \
	serverless remove --stage $(STAGE) --region us-west-2 && \
	serverless remove --stage $(STAGE) --region ap-northeast-1 && \
	serverless remove --stage $(STAGE) --region ap-northeast-2 && \
	serverless remove --stage $(STAGE) --region ap-southeast-1 && \
	serverless remove --stage $(STAGE) --region ap-southeast-2 && \
	serverless remove --stage $(STAGE) --region eu-west-1 && \
	serverless remove --stage $(STAGE) --region eu-central-1

remove: remove-master remove-workers

tools:
	npm install serverless -g

start-master:
	cd master && \
	serverless offline --stage $(STAGE) --region us-east-1

start-worker:
	cd worker && \
	serverless offline --stage $(STAGE) --region us-east-1

.PHONY: deploy deploy-master deploy-workers deps deps-master deps-worker remove remote-master remove-workers tools start-master start-worker
