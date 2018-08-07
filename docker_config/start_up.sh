#! /bin/bash
cd /home/zabo/zabo-web
yarn build
cd /home/zabo/zabo-web/nginx_conf
cp nginx.conf /etc/nginx/sites-available/nginx.conf
cd /etc/nginx/sites-enabled
ln -s /etc/nginx/sites-available/nginx.conf nginx.conf
service nginx start
