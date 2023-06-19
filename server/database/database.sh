#! /bin/bash

################################
# Database bash script
# @description
#  - Runs psql statements that are used to produce a mock database
#  - Executes sql scripts to create and populate the databases
# @example ./database.sh -c -p
# @TODO: Write comments for environment setup (if no Docker)
# @fires ./create_database.sql
# @fires ./populate_database.sql
################################

# Prerequisites
psql -V
service postgresql status

while true; do
  case "$1" in
    -c|--create)
      psql -U postgres -c 'CREATE DATABASE citykeep;' -c '\c citykeep' -c '\i ./create_database.sql'
      printf "END -c | --create\n"
      shift;;
    -p|--populate)
      psql -U postgres -c '\c citykeep' -c '\i ./populate_database.sql'
      printf "END -p | --populate\n"
      shift;;
    -d|--delete)
      psql -U postgres -c 'DROP DATABASE citykeep;'
      printf "END -d | --delete\n"
      shift;;
    -r|--reset)
      psql -U postgres -c 'DROP DATABASE citykeep;' -c 'CREATE DATABASE citykeep;' -c '\c citykeep' -c '\i ./create_database.sql' -c '\i ./populate_database.sql'
      printf "END -r | --reset\n"
      shift;;
    '')
      printf "\nNo remaining flags.\nEND database.sh\n"
      exit 1;;
     *)
      printf "Unknown option %s\n" "$1"
      break;;
  esac
done
