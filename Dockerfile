FROM node

USER root

RUN apt-get update && apt-get install -y wget tor xvfb && \
    echo 'SocksPort 9050' >> /etc/tor/torrc

USER node

WORKDIR /opt
RUN git clone https://github.com/AnKoushinist/hekiheki-is-idiot hii && \
    cd hii && \
    npm i

WORKDIR /opt/hii
CMD /opt/hii/start.sh