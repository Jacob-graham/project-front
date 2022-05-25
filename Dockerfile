#--------- BEGIN DEVELOPER MODIFY FOR YOUR BUILD PROCESS ---------#
#Do not change the "AS build_image" part on the FROM
FROM gcr.io/zoominfo-container-registry/zoom-node:16-alpine AS build_image
  #Do not remove the BUILD_ACTION ARG, you can change its default value. You must use it in your build command in the RUN section for Jenkins to deploy your artifact.
ARG ACTION=install
ARG ARTIFACTORY_USERNAME
ARG ARTIFACTORY_PASSWORD
ENV ARTIFACTORY_USR=$ARTIFACTORY_USERNAME
ENV ARTIFACTORY_PSW=$ARTIFACTORY_PASSWORD

RUN apk update \
    && apk --no-cache add curl

WORKDIR /app

  # Install all of the dependencies
COPY ./src /app/src/
COPY ./*.json /app/

 # build
RUN rm -rf /app/node_modules \
&& curl -u "$ARTIFACTORY_USERNAME":"$ARTIFACTORY_PASSWORD" https://zoominfo.jfrog.io/zoominfo/api/npm/auth >> ~/.npmrc

RUN npm ci && npm run build
  #--------- END DEVELOPER MODIFY FOR YOUR BUILD PROCESS ---------#

  #--------- BEGIN DEVELOPER MODIFY FOR YOUR DEPLOYMENT APP ---------#
  #Do not change the "AS deploy_image" part of the FROM
FROM nginx:stable AS deploy_image

EXPOSE 3000/tcp

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx
RUN ls -l /var/cache && whoami

COPY --from=build_image /app/dist/zoom-family /var/www/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
##--------- END DEVELOPER MODIFY FOR YOUR DEPLOYMENT APP ---------#