#!/bin/bash

docker run --name user_manager_db \
    -v $PWD/data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=admin \
    -e MYSQL_DATABASE=user_manager_db \
    -e MYSQL_USER=admin \
    -e MYSQL_PASSWORD=admin \
    -p 3306:3306 \
    -d mysql:8