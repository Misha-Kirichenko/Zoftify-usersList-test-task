#!/bin/sh
set -e

if [ "$NODE_ENV" = "production" ]; then
  CMD="npm run i_mig_seed_start_prod"
elif [ "$NODE_ENV" = "development" ]; then
  CMD="npm run i_mig_seed_start"
else
  CMD="npm run i_mig_seed_start"
fi

exec wait-for-it ${POSTGRES_HOST}:${POSTGRES_PORT} -- $CMD
