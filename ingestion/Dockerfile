FROM python:3.10.8-alpine
RUN apt-get install ffmpeg
WORKDIR /app

COPY ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]