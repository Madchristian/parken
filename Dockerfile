FROM httpd:latest

RUN apt-get update && apt-get install -y git

COPY id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Add GitHub host key
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
# Clone the Git repository into a temporary directory
WORKDIR /tmp
RUN git clone --force git@github.com:Madchristian/parken.git

# Copy the files from the temporary directory to the target directory
RUN cp -r /tmp/parken/* /usr/local/apache2/htdocs/

# Update httpd.conf
RUN sed -i 's/Options Indexes FollowSymLinks/Options Indexes FollowSymLinks\nAddType application\/javascript .js/' /usr/local/apache2/conf/httpd.conf
RUN echo 'AddType text/css .css' >> /usr/local/apache2/conf/httpd.conf
# Update httpd.conf for CORS^
RUN echo 'Header set Access-Control-Allow-Origin "*"' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'Header set Access-Control-Allow-Methods "GET,POST,OPTIONS,DELETE,PUT"' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"' >> /usr/local/apache2/conf/httpd.conf

# Clean up
RUN rm -rf /tmp/parken

# Start Apache
CMD ["httpd-foreground"]