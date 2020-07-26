#!/bin/bash

echo "Waiting for localhost:3000..."

while ! nc -z localhost 3000; do   
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo "Connected"