# Dockerfile
FROM nginx

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
# psycopg2 binaries (we're not using the regular package)
RUN pip3 install psycopg2-binary --break-system-packages

# Check node & npm's versions
RUN node -v
RUN npm -v

ENV POSTGRES_USER = "postgres"
ENV POSTGRES_PASSWORD = "password"
ENV POSTGRES_DB = "postgres"

# Copy over files
COPY website/ /usr/share/nginx/html/

# Open ports

# PostgreSQL
EXPOSE 5432
# HTTP
EXPOSE 80
# HTTPS
EXPOSE 443
# SMTP (email)
EXPOSE 25
# node.js
EXPOSE 3000