FROM debian:stable-slim
RUN apt-get update
RUN apt-get -y install aubio-tools libaubio-dev libaubio-doc