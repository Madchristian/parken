FROM httpd:latest

RUN apt-get update && apt-get install -y git

COPY id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Add GitHub host key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
# Clone the Git repository into a temporary directory
WORKDIR /tmp
RUN git clone git@github.com:Madchristian/parken.git

# Copy the files from the temporary directory to the target directory
COPY parken/* /usr/local/apache2/htdocs/

# Clean up
RUN rm -rf /tmp/parken