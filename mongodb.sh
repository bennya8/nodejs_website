#!/bin/sh

mongod --dbpath ./data

# backup
#mongodump -d website -o backup
