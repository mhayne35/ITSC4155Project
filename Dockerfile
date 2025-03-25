# Dockerfile
FROM python:3.12

# update apt-get
RUN apt-get update
# -y flag means "assume yes"
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y postgresql
RUN apt-get install -y nginx
# nodejs & its prerequisites
RUN apt-get install -y curl
RUN apt-get install -y gnupg2
RUN apt-get install -y lsb-release
RUN apt-get install -y ca-certificates
RUN apt-get install -y build-essential
RUN apt-get install -y nodejs 
RUN apt-get install -y npm
# supervisord (process manager, needed to run both nginx and flask simultaneously)
RUN apt-get install -y supervisor
# psycopg2 binaries (we're not using the regular package)
RUN pip3 install psycopg2-binary --break-system-packages
# flask
RUN pip3 install flask --break-system-package
RUN pip3 install flask_cors --break-system-package
RUN pip3 install flask_session --break-system-package

# Check node & npm's versions
RUN node -v
RUN npm -v

# postgres stuff
ENV POSTGRES_USER="postgres"
ENV POSTGRES_PASSWORD="password"
ENV POSTGRES_DB="postgres"

# Copy over files
COPY website/ /usr/share/nginx/html/
COPY server/ /app/
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY postgresql.conf /etc/postgresql/12/main/postgresql.conf

# set flask workdir
WORKDIR /app

# Open ports
# HTTP & HTTPS
EXPOSE 80 443
# Flask
EXPOSE 5000
# SMTP (email)
EXPOSE 25

# start everything via supervisord
CMD ["supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]