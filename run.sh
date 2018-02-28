#!/bin/bash

if [ "$#" -ne 1 ]; then
	echo "La sintaxis es: $0 <prod|dev>"
	exit -1
fi

if [ "$1" == "prod" ]; then
	pm2 start ecosystem.config.js --env production
else
	npm start
fi
