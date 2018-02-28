#!/bin/bash

npm install

semanticDir="public/static/components/semantic"
if [ ! -d "$semanticDir" ]; then
	pushd $semanticDir
	gulp build
	popd
fi
