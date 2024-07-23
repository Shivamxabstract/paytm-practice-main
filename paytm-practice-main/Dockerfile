FROM mongo:4.4.7

# Expose MongoDB port
EXPOSE 27017

RUN echo "rs.initiate();" > /docker-entrypoint-initdb.d/replica-init.js
CMD [ "--replSet", "rs" ]