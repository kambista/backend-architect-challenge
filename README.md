<h1 align="center">
  <br>
  <img src="./assets/logo.png" alt="Markdownify" width="200">
  <br>
  PRUEBA TECNICA
  <br>
</h1>

## Tabla de contenido [![](./assets/pin.svg)](#table-of-contents)

- [Arquitectura del proyecto](#ref1)
- [Arquitectura de la infraestructura](#ref2)
- [Documentación de la API](#ref3) 
- [Levantar en local](#ref4) 
- [Levantar en la nube](#ref5) 
- [Extra - CI/CD](#ref6) 


## 1. Arquitectura del proyecto[![](./assets/pin.svg)](#ref1)

La estructura del proyecto fue creada usando <b>Arquitectura Hexagonal</b> siguiendo un enfoque en el dominio con <b>DDD(Domain-Driven-Design)</b>.

Representacion gráfica:

<div align="center" style="padding:10px; background:white;border-radius:5px"><img src="./assets/img2.png" style="width:70%;height:70%;"/></div>


## 2. Arquitectura de la infraestructura[![](./assets/pin.svg)](#ref5)

El despliegue en la nube de Google sigue la siguiente estructura: 

<div align="center" style="padding:10px; background:white;border-radius:5px"><img src="./assets/img4.png" style="width:70%;height:70%;"/></div>

<br> 


## 4. Documentacion de la API[![](./assets/pin.svg)](#ref4)

Cada servicio creado esta documentado usando Swagger que tiene una amigable integracion con NestJS:

<div align="center" style="padding:10px; background:white;border-radius:5px"><img src="./assets/img5.png" style="width:100%;height:70%;"/></div>

## 3. Levantar en local[![](./assets/pin.svg)](#ref1)

Se debe tener instalado Docker y Minikube en la pc en donde se de sea probar la aplicacion.

- Iniciar minikube
  ```bash
  minikube start
  minikube dashboard
  ```
- Cambiar el contexto de docker para que apunto al registry de minikube
  ```bash
  eval $(minikube docker-env)
  ```
- Compilar el proyecto
  ```bash
  cd ./backend && npm run build
  ```
- Posicionarse en la raiz del proyecto y contruir la imagen
  ```bash
  docker build -t kambistatest:v1.0.0  -f deploy/Gcp/Docker/Dockerfile .
  ```
- Ejecutar cada archivo yml de la ruta ./deploy/Local/K8s/*
  ```bash
  cd deploy/Local/K8s/
  kubectl apply -f ./1kambista-namespace.yml
  kubectl apply -f ./2kambista-deployment.yml
  kubectl apply -f ./3mongo-deployment.yml
  kubectl apply -f ./4kambista-service.yml
  kubectl apply -f ./4kambista-service.yml
  kubectl apply -f ./5mongo-service.yml
  kubectl apply -f ./6kambista-ingress.yml
  ```
- Ingresar a la url generada en el dashboard de minikube
  ```bash
  --
  ```

## 3. Levantar en la nube[![](./assets/pin.svg)](#ref1)

Se debe tener instalado el SDK de google, Kubectl y Terraform.

- Contruir la imagen en local o en un runner
- Subir la imagen al registry de google
- Crear la infraestructura con terraform en la nube
- Conectarse al cluster K8s
- Instalar el nginx controller
- Instalar el cert manager
- Ejecutar cada archivo yml
- Ingresar a la url
 
## 4. Extra - CI/CD[![](./assets/pin.svg)](#ref4)

Para automatizar todo el proceso desde la creacion del proyecto hasta el despliegue:

<div align="center" style="padding:10px; background:white;border-radius:5px"><img src="./assets/img3.png" style="width:70%;height:70%;"/></div>

Gracias...