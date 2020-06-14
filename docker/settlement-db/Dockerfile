FROM mongo:latest

ENV DBPATH /data/rundb

RUN apt-get -qq update && apt-get -y -qq install wget unzip
RUN wget -q http://artifactory.btigroup.io/files/ProdSettlement.2019-12-21.zip -O /var/tmp/ProdSettlement.zip
RUN unzip /var/tmp/ProdSettlement.zip -d /var/tmp/

RUN mkdir -p ${DBPATH}; \
    mongod --dbpath ${DBPATH} --fork --logpath /var/log/mongodb.log; \
    mongorestore -d ProdSettlement /var/tmp/ProdSettlement/Purchases.bson; \
    mongod --dbpath ${DBPATH} --shutdown;

# RUN chmod -R go+rw ${DBPATH}
RUN chown -R mongodb:mongodb ${DBPATH}

CMD ["mongod", "--dbpath", "/data/rundb/"]
