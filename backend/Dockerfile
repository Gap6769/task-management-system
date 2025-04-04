FROM public.ecr.aws/lambda/python:3.11

# Copiar los archivos de la aplicación al contenedor
COPY ./app /var/task/app
COPY requirements.txt /var/task/

# Establecer el directorio de trabajo
WORKDIR /var/task

# Instalar las dependencias necesarias
RUN pip install --no-cache-dir -r requirements.txt

# Comando de inicio para Lambda
CMD ["app.main.handler"]