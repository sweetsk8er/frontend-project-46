install: 
	npm ci
	sudo npm link

publish: 
	npm publish --dry-run

gendiff: 
	node bin/gendiff.js -h
lint: #запуск линтера
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
