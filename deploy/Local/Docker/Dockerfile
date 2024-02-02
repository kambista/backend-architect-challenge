FROM ubuntu:20.04

RUN apt-get update && apt-get install -yq locales && locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8
RUN apt-get update && apt-get install -yq tzdata && echo "America/Lima" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update
RUN apt-get install -yq systemd
RUN apt-get install -yq curl
RUN apt-get install -yq gettext
RUN apt-get install -yq python3-pip
RUN apt-get install -yq nginx
RUN rm -f /etc/nginx/sites-enabled/default
RUN pip install supervisor supervisor-stdout

RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs -y

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

RUN echo "#!/bin/sh\nexit 0" > /usr/sbin/policy-rc.d

COPY ./backend/dist /var/www/app/backend/dist

COPY ./deploy/Gcp/Docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/Gcp/Docker/nginx/sites-enabled/default.conf /etc/nginx/sites-enabled/default.conf

COPY ./deploy/Gcp/Docker/supervisor/supervisord.conf /etc/supervisord.conf

WORKDIR /var/www/app/backend/dist
COPY ./backend/package.json /var/www/app/backend/dist/package.json
COPY ./deploy/Gcp/Docker/.env /var/www/app/backend/dist/.env
RUN npm install --production

WORKDIR /
COPY ./deploy/Gcp/Docker/start.sh /start.sh
RUN chmod 777 /start.sh

EXPOSE 80

CMD ["bash", "/start.sh"]
