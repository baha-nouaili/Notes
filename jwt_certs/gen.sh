#!/bin/bash

openssl genrsa -out private.pem 3072
echo 'private key generated successfully'
openssl rsa -in private.pem -pubout -out public.pem
echo 'public key generated successfully'