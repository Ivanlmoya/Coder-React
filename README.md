
# Heart Tech

Projecto hecho en React para el curso de Coderhouse simulando el funcionamiento de una Ecommerce


## Tech Stack

**Client:** React, Redux, Sass

**Server:** Firebase


## Componentes principales

**NavBar:**  ( contiene los links y permite la navegacion entre secciones)
**ItemDetail , ItemDetailConteiner:** ( contiene el detalle del producto seleccionado)
**Item,ItemList , ItemListContainer:** ( trae la lista de items de la base de datos en firebase)
**Cart , form:** ( trae los items seleccionados para compra y luego se completa el checkout para que se procese la orden)
**Login / register:** ( al ingresar el proyecto el usuario optara por crearse una cuenta o utilizar su cuenta de google )
**PageNotFound:** ( al ingresar alguna pagina que no este identificada llevara a la persona a una pagina predeterminada)

## Circuito de la Aplicacion

Al iniciar el proyecto mostrara la pantalla de logueo , el usuario para acceder debera crearse una cuenta o loguearse con una cuenta de google , una vez hecho ingresara a la pantalla de productos donde se listan los productos disponibles , al hacer click sobre ellos se pueden ver mas detalles y agregarlos al carrito , una vez agregados se puede proceder a finalizar la compra , eso los lleva a la seccion del cart que podran revisar un detalle de los elementos a comprar , donde podra eleminar elemento individual o vaciar el carrito , cuando queramos confirmar la compra se debe acceder al boton check out donde trae la info recolectada de las cuentas y se carga un form para completar datos como direccion , telefono . al finalizar le llega una notificacion con el resumen de la orden al mail.

## Demo

- [Deploy](https://gfycat.com/untimelymenacingarabianoryx)


## Web App

- [Deploy](https://coder-react-seven.vercel.app/login)


## Environment Variables and


**REACT_APP_apiKey=:**  
**REACT_APP_authDomain=:** 
**REACT_APP_projectId=:** 
**REACT_APP_storageBucket=:** 
**REACT_APP_messagingSenderId=:** 
**REACT_APP_appId=:** 

## Firebase Item types 

collection : products

campos: *category - string
        *description - string
        *img - string
        *name - string
        *price - number
        *stock - number

## Authors

- [@ivanlmoya](https://www.github.com/ivanlmoya)

