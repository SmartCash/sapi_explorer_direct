# SAPI Explorer

**A blockchain explorer for SmartCash.**

## Quick Start

You can check our Swagger for SAPI (SmartCash Decentralized API) calls:
https://editor.swagger.io/

Import the swagger.json file that is in the root folder to see all API calls.
```sh

sudo apt install npm screen
sudo npm install node
git clone https://github.com/SmartCash/sapi_explorer_direct
cd sapi_explorer_direct
npm install

For testing (Host on port 8200):
screen npm start

For Production (Host on port 80):
screen npm run build:prod && screen sudo node server.js

```
Add a start script on reboot.
```
crontab -e
@reboot sleep 30 && cd /home/user/sapi_explorer_direct && /usr/bin/npm start
control x y to save
```
