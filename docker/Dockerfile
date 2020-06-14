FROM node:12
ARG GIT_COMMIT=unspecified
LABEL git_commit=$GIT_COMMIT
ENV PROJECT_DIR /opt/betslip_be
ENV APPUSER appuser
RUN apt-get update
RUN apt-get install build-essential
RUN groupadd -g 12000 ${APPUSER}
RUN useradd -u 12000 -g ${APPUSER} -d ${PROJECT_DIR} -m ${APPUSER}
USER ${APPUSER}
RUN chmod -R 764 ${PROJECT_DIR}
WORKDIR ${PROJECT_DIR}
RUN npm config set registry http://artifactory.btigroup.io/api/npm/npm-packages/
COPY --chown=${APPUSER} package.json ./
RUN touch deleteNodeModules.js
RUN npm install
COPY --chown=${APPUSER} . .
RUN npm run build
RUN rm -r /opt/betslip_be/src
RUN rm -f .npmrc
EXPOSE 4013
CMD [ "node", "./build/main.js" ]
