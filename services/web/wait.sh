#!/bin/bash

echo "Waiting for localhost:3000..."
for i in 1 2 3 4 5; do
    echo $i
    if [! nc -z localhost 3000]; then
        sleep 2
    fi
done

echo "Connected"