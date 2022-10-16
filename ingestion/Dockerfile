FROM thevlang/vlang:alpine
RUN apk add ffmpeg
WORKDIR /app
EXPOSE 5000

COPY . .
RUN mkdir uploads

RUN v install invipal.nanoid
RUN v ingestion.v


CMD [ "./ingestion" ]