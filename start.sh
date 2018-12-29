#!/bin/bash

( tor &>/dev/null ) &

echo 'Waiting for Tor connection...'
while ! wget -qO /dev/null google.com ; do
done

xvfb-run node index.sh