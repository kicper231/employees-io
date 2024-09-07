## Budowanie dockera
#backend
./gradlew clean bootJar
docker build -t backend . 
docker run -d -p 8080:80 backend


# front 
docker build -t front . 
docker run -d -p 4201:80 front
