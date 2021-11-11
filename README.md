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
```sh
crontab -e
@reboot sleep 30 && cd /home/user/sapi_explorer_direct && /usr/bin/npm start
control x y to save
```
Setup SSL with nginx
Replace example.com with your domain.
```sh
apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com 
nano -w /etc/nginx/sites-enabled/default
```
Edit file to be similar to below.  Used npm start which is port 8200.
```sh
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name explorer.smarts.cash;
        location / {
        proxy_redirect http://localhost:8200 https://example.com;
        }
}
server {
       listen [::]:443 ssl ipv6only=on; # managed by Certbot
       listen 443 ssl; # managed by Certbot

       ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certb>
       ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Cer>
       include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
       ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

       root /var/www/html;
       index index.html index.htm index.nginx-debian.html;
       server_name example.com;
       location / {
        proxy_pass http://localhost:8200;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect http://localhost:8200 https://example.com;
       }
}
```
