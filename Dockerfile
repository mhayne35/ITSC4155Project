# Dockerfile
FROM nginx

# update apt-get
RUN apt-get update
# -y flag means "assume yes"
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y postgresql
RUN apt-get install -y nginx
RUN pip3 install psycopg2-binary --break-system-packages

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