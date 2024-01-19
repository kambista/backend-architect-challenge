# Kambista Backend Architect!

👋 Somos [Kambista](https://kambista.com) y estamos en la búsqueda de un nuevo miembro
para nuestro equipo de tech que nos ayude a seguir ofreciendo la mejor experiencia de 
cambio, para esto hemos preparado un reto técnico el cual pueden completar y enviarnos 
el resultado con las siguientes instrucciones [instruciones de entrega](#-instruciones-de-entrega)

## 📓 Caso
Se necesita crear una API interna que registre las solicitudes de cambio de moneda de los clientes.
Como una operación de cambio necesita el TC (tipo de cambio) para poder realizar la conversión de la moneda,
es necesario guardar el tipo de cambio de un proveedor cada 30 segundos.
Se cuenta con la siguiente API para obtener el tipo de cambio de un proveedor:
`https://api.apis.net.pe/v1/tipo-cambio-sunat`

```json
{
  "compra": 3.733,
  "venta": 3.739,
  "origen": "SUNAT",
  "moneda": "USD",
  "fecha": "2024-01-18"
}
```
El endpoint de la API interna debe esperar recibir del cliente la siguiente estructura:
```json
{
  "monedaOrigen": "USD",
  "monedaDestino": "PEN",
  "monto": 100
}
```
Dependiente del sentido de la operación de cambio, se debe calcular el monto de la operación de cambio y guarda
la solicitud de cambio de la siguiente manera:
```json
{
  "id": "xxxxxxxxxxxxx",
  "monedaOrigen": "USD",
  "monedaDestino": "PEN",
  "monto": 100,
  "montoCambiado": 373.3,
  "tipoCambio": 3.733,
  "fecha": "$TIME_STAMP"
}
```
Finalmente, se debe crear un endpoint para obtener el historial de solicitudes de cambio de un cliente, el cual debe
recibir la fecha de inicio y fin y devolver un conjunto de operacion de la siguiente manera:
```json
[
  {
    "id": "xxxxxxxxxxxxx",
    "monedaOrigen": "USD",
    "monedaDestino": "PEN",
    "monto": 100,
    "montoCambiado": 373.3,
    "tipoCambio": 3.733,
    "fecha": "$TIME_STAMP"
  },
  {
    "id": "xxxxxxxxxxxxx",
    "monedaOrigen": "USD",
    "monedaDestino": "PEN",
    "monto": 100,
    "montoCambiado": 373.3,
    "tipoCambio": 3.733,
    "fecha": "$TIME_STAMP"
  }
]
```
De ser necesario o considerarlo conveniente, se puede agregar algunas validaciones para mantener la consistencia
de los datos y la funcionalidad de la API.

## 🖥️ Tecnologías

Para el desarrollo de la solución se debe utilizar las siguientes tecnologías:
- Lenguaje de programación: `NodeJS` con `Typescript`
- Se puede utilizar cualquier framework de NodeJS
- Base de datos: `MongoDB`
- Arquitectura: `Clean Architecture` `DDD`
- Se debe utilizar `Kubernetes` para el despliegue de la solución.
- La solución debe contar con una batería de pruebas unitarias y/o de integración.
- La API debe estar documentada.
- La solución debe contar con unas instrucciones de despliegue local (Kubernetes).
- La solución debe contar con unas instrucciones de despliegue en Kubernetes en la nube `gcp`. Deseable
- De haberlo dezplegado en la nube, se debe entrar en link público de la API.
- Se debe utilizar `Git` para el control de versiones. Se tendrá en cuenta la historia de los cambios.

## 📍 Instruciones de entrega

- Se necesita crear un fork del proyecto y crear un pull request con la solución.
- Es necesario notificar a la persona que te contacto para que revise la solución en el momento de completar la prueba.
- En la siguiente etapa se realizará una entrevista técnica para revisar la solución.
- El tiempo estimado para completar la prueba es de 7 días desde el inicio de la misma.

Quedamos atentos a cualquier consulta adicional, muchos éxitos! 🚀
