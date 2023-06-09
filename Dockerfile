FROM httpd:latest

RUN apt-get update && apt-get install -y git

# Add GitHub host key
# Clone the Git repository into a temporary directory
WORKDIR /usr/local/apache2/htdocs/

# Copy the files from the temporary directory to the target directory
#COPY . /usr/local/apache2/htdocs/

# Update httpd.conf
#RUN sed -i 's/Options Indexes FollowSymLinks/Options Indexes FollowSymLinks\nAddType application\/javascript .js/' /usr/local/apache2/conf/httpd.conf
#RUN echo 'ServerName parken.cstrube.de' >> /usr/local/apache2/conf/httpd.conf
#RUN echo 'AddType text/css .css' >> /usr/local/apache2/conf/httpd.conf
# Update httpd.conf for CORS^
#RUN echo 'Header set Access-Control-Allow-Origin "*"' >> /usr/local/apache2/conf/httpd.conf
#RUN echo 'Header set Access-Control-Allow-Methods "GET,POST,OPTIONS,DELETE,PUT"' >> /usr/local/apache2/conf/httpd.conf
#RUN echo 'Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"' >> /usr/local/apache2/conf/httpd.conf

# Start Apache
CMD ["httpd-foreground"]