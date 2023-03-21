FROM httpd:latest

RUN apt-get update && apt-get install -y git

COPY id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

WORKDIR /usr/local/apache2/htdocs/

RUN git clone git@github.com:madchristian/parken.git .