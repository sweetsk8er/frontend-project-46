install: 
	npm ci
	sudo npm link

publish: 
	npm publish --dry-run

gendiff: 
	node bin/gendiff.js -h
lint: #запуск линтера
	npx eslint .
