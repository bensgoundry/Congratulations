FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend .
COPY frontend ./static

CMD ["python", "app.py"]