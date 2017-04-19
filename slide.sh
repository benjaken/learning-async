#!/usr/bin/env bash

port="$1"
[ -z "$port" ] && port=8001

cd `dirname "${BASH_SOURCE[0]}"`

! [ -d ./node_modules/reveal.js/ ] && npm i

echo open slide at http://127.0.0.1:"$port"/slide/
python -m SimpleHTTPServer "$port"

