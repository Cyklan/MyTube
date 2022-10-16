FROM thevlang/vlang:alpine
WORKDIR /app

# install webserver dependency
RUN v install nedpals.vex

COPY . .

RUN v ingestion.v

CMD [ "./ingestion" ]