FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend .
COPY frontend ./static

# Add build arguments
ARG USER
ARG PASSWORD

# Create config.py from build arguments
RUN echo "CREDENTIALS = {'user': '$USER', 'password': '$PASSWORD'}" > config.py

CMD ["python", "app.py"]