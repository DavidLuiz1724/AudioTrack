# pull official base image
FROM python:3.12.4-alpine

# set environment variables
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
COPY . /app
WORKDIR /app

# install dependencies
RUN apk update \
    && apk add --no-cache postgresql-dev build-base python3-dev py3-pip gcc g++ musl-dev llvm15 llvm15-dev llvm15-libs ffmpeg libsndfile-dev \
    && ln -s /usr/lib/llvm15/bin/llvm-config /usr/bin/llvm-config

# Install numpy first
RUN pip install --no-cache-dir numpy

RUN pip install --upgrade pip

# Set pip configuration for mirrors and higher timeout
RUN pip config set global.timeout 120
RUN pip config set global.index-url https://pypi.org/simple

COPY ./requirements.txt /server
RUN pip install --no-cache-dir -r requirements.txt

