Environment to learn about Node, Express and Sequelize
----

# Requirements

* NodeJS v7.10.0
* npm 4.6.1
* Docker

# Setup

    cd src/
    npm install
    export PATH=$PATH:./node_modules/.bin
    npm run startDB
   
# Unit tests

After setup environment:

    cd src/
    npm test
    
# Run development environment

After setup environment:

    cd src/
    npm run dev

## Stop database

    cd src/
    npm run stopDB

## Clear all database dockers and data

    cd src/
    npm run clearDB
    
# Generate API documentation

    cd src/
    npm run doc

# Open API documentation

Open in your favorite browser the file `src/doc/index.html` after generate it.
