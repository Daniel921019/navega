## NAVEGA SEGURO DOCS 🧭🚢🌊

<div style="text-align:center;">

![Node.js](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
![Express.js](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
<br>
![Microsoft SQL Server](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Docker](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Docker](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)


</div>



## `Tabla de Contenidos`

#### [`Sección 0️: Introducción`](#sección-0️⃣-introducción)


#### [`Sección 1: Arquitectura`](#sección-1️⃣-arquitectura)

#### [`Sección 2: Componentes`](#sección-2️⃣-componentes)

#### [`Sección 3: Gestión de Proyecto y Estructuras`](#sección-3️⃣-gestión-de-Proyecto-y-Estructura-en-Android)

Documentación presentada para la Aplicación Movil Navega Seguro

<br/><br/>

# Sección 0️⃣: Introducción

Navega Seguro ha sido desarrollada utilizando IONIC, un framework que ofrece la capacidad de crear aplicaciones para diferentes dispositivos móviles. En esta documentación, se presentan los estándares empleados durante el proceso de desarrollo de Navega Seguro. 
<br/>

# Sección 1️⃣: Arquitectura
 la arquitectura de una aplicación en Ionic se basa en componentes reutilizables, páginas, enrutamiento, servicios y plugins. Esta estructura modular y flexible permite un desarrollo eficiente y la creación de aplicaciones multiplataforma que se ejecutan en dispositivos iOS, Android y web.

## 🧿 ️ 1.1 Páginas

En Ionic, una página representa una pantalla o vista de la aplicación. Cada página se compone de uno o más componentes y contiene la lógica y la estructura necesaria para mostrar y gestionar los datos de esa pantalla específica.


Creación de una pagina en IONIC.
```bash
ionic g page nuevapagina
```

Al utilizar el comando anterior, se crea una nueva página que puede ser personalizada con las funcionalidades relevantes para la aplicación. Esto permite adaptar la página según las necesidades específicas del aplicativo, añadiendo lógica y componentes que brinden la funcionalidad requerida.
 
<br/>


<br/>

<details><summary>✏ <b>Código de Ejemplo</b></summary>

`C:\> ionic g page nuevapagina `




[![image.png](https://i.postimg.cc/PrzjtX5Y/image.png)](https://postimg.cc/N5MVDwTj)

Resultado:

[![image.png](https://i.postimg.cc/DzRDrHz7/image.png)](https://postimg.cc/7CMmDB7R)

<br/>


</details>

<br/><br/>


## 🧿 ️ 1.2 Servicios

Los servicios en IONIC son clases que encapsulan la lógica de negocio y ofrecen funcionalidades reutilizables en toda la aplicación. Estos servicios se utilizan para realizar operaciones como el acceso a datos, la comunicación con una API o la gestión de autenticación.

Creación de una pagina en IONIC.
```bash
ionic g service rest_api/user
```

Se utiliza para generar un servicio en IONIC relacionado con una API REST. Este comando crea una estructura básica de un servicio en Ionic que se encargará de interactuar con la API REST para realizar operaciones como obtener datos, enviar datos, realizar consultas, etc. 
 
<br/>


<br/>

<details><summary>✏ <b>Código de Ejemplo</b></summary>

`C:\> ionic g service admin-module/admin-service/admin`


[![image.png](https://i.postimg.cc/fbfR3cCW/image.png)](https://postimg.cc/McXSNjgg)

Estos métodos son utilizados para interactuar con una API en el backend y obtener datos relacionados con las claves de API. La URL base y los diferentes endpoints de la API se construyen utilizando la URL base de la configuración y se concatenan con los segmentos de ruta necesarios. Esto permite una modularidad y reutilización del código al definir una única URL base y utilizarla en múltiples peticiones a la API.

<br/>


</details>

<br/><br/>



# Sección 2️⃣: Componentes

Ionic utiliza componentes reutilizables como elementos fundamentales de la interfaz de usuario. Estos componentes se construyen utilizando HTML, CSS y JavaScript y se pueden personalizar y combinar para crear la interfaz de usuario de la aplicación.

Creación de una pagina en IONIC.
```bash
ionic g component nuevacomponente
```

Usar el comando "ionic g component" es útil cuando se desea crear un componente reutilizable que pueda ser utilizado en diferentes partes de la aplicación. El componente puede contener su propia lógica, vista y estilos, lo que facilita su integración en otras partes de la aplicación y promueve una estructura modular y mantenible.
 
<br/>


<br/>

<details><summary>✏ <b>Código de Ejemplo</b></summary>

Nota: Los componentes fueron agregados al módulo de administración de la siguiente forma, se configura un archivo  `components.module.ts` que contiene componentes personalizados. Los componentes declarados en este módulo estarán disponibles de la siguiente manera para el módulo de administracion:

En este apartado se definen como exportar los componentes generados.


[![image.png](https://i.postimg.cc/63vQckLc/image.png)](https://postimg.cc/qhp0MZF6) 

De esta manera se garantiza que los componentes generados esten disponibles para el módulo en cuestión.

[![image.png](https://i.postimg.cc/D0cnYnWr/image.png)](https://postimg.cc/dZDbhMj3)



Cuando se genere un nuevo componente, solo es cuention de definirlo en `components.module.ts`, y estará disponible en el módulo.


`C:\> ionic g component component/header `

A continuación se procede a personalizar el componente generado. En este caso, se especifica que el componente requiere un título y una dirección para la navegación de retorno.

TS:

[![image.png](https://i.postimg.cc/d0RHC1gj/image.png)](https://postimg.cc/mcDyfbLP)

HTML:
[![image.png](https://i.postimg.cc/DwLbfbb5/image.png)](https://postimg.cc/18RzJXBN)

Por último, se puede invocar en cualquier página que forme parte del módulo de administración.

```html
<app-header [titulo]="Esto es Una Prueba" [href]="/admin-module"></app-header>

<ion-content>
    CONTENIDO 
</ion-content>

```
<br/>


</details>

<br/><br/>



# Sección 3️⃣: Gestión de Proyecto y Estructura en Android
```
ionic cordova platform add android
```

Al ejecutar este comando, Ionic se encargará de descargar e instalar las herramientas y archivos necesarios para desarrollar y construir la aplicación en la plataforma Android. Una vez que se ha agregado la plataforma Android, se podrán realizar pruebas, empaquetar y publicar la aplicación para dispositivos Android específicos.



```
ionic cordova build android --prod --release
```
Cuando se ejecuta este comando, Ionic compila todos los archivos de la aplicación, realiza la minificación y la optimización del código, y crea un archivo de aplicación Android en modo de lanzamiento. Es importante que esta toma como datos lo que se le asigna el el archivo cofig.xml

En La siguiente imagen se degine la version utilizada para el Android Gradle Plugin de Navega Seguro, Se trata de un complemento para el sistema de compilación Gradle que proporciona funcionalidades específicas para la construcción, empaquetado y despliegue de aplicaciones Android.

[![image.png](https://i.postimg.cc/9FSd179Y/image.png)](https://postimg.cc/fJcSRkBV)


### AL GENERAR PROYECTO PARA ANDROID CAMBIAR EL ARCHIVO "res/xml/network_security_config.xml"

#### ANDROID

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">navegaseguro.dimar.mil.co</domain> <--- Cambiar según dirección publica suministrada por la DIMAR
        <domain includeSubdomains="true">190.71.156.213</domain> <--- Cambiar según dirección publica suministrada por la DIMAR
        <domain includeSubdomains="true">190.14.17.54</domain>
    </domain-config>
</network-security-config>
```

#### IOS

La clave NSCameraUsageDescription se utiliza en aplicaciones iOS de Apple y está relacionada con el acceso a la cámara del dispositivo. Esta política evita que la aplicación se cierre inesperadamente al ingresar al componente de imágenes

```
<key>NSCameraUsageDescription</key>
<string>La aplicación utiliza la cámara para tomar fotos y compartila con los usuarios de Navega Seguro, solo es utilizada por los administradores.</string>
```

### NOTA 

Para asegurar el control de contenido como imágenes, claves de API o bases de datos, se recomienda ingresarlos en el esquema 'schema_admin' y manipularlos a través del módulo de administración. Esto permite una gestión centralizada y controlada de los recursos.

En el caso específico del proyecto actual, se depende de una dirección pública proporcionada por la DIMAR. El backend se encuentra alojado en un servicio PM2 en el escritorio remoto de la DIMAR. Esto implica que el backend se ejecuta en un entorno seguro y controlado, lo que garantiza su disponibilidad y confiabilidad.

Es importante seguir las mejores prácticas de seguridad y administración de sistemas para proteger y gestionar adecuadamente los recursos utilizados en el proyecto. Esto incluye el uso de permisos adecuados, autenticación y autorización seguras, y medidas de protección contra amenazas potenciales.

La ubicación del proyecto en /opt/dimar-backend-m indica la ruta en el sistema de archivos donde se encuentra alojado el código fuente y los archivos relacionados con el backend. Esta ubicación puede variar dependiendo de la configuración del sistema y las convenciones de nomenclatura utilizadas.

Recuerda mantener actualizados y protegidos todos los componentes del proyecto, incluyendo el backend, las claves de API y cualquier otra información confidencial. Esto contribuirá a garantizar la integridad y seguridad del sistema en su conjunto.

<key>NSCameraUsageDescription</key>
<string>La aplicación utiliza la cámara para tomar fotos y videos que luego pueden compartirse con otros usuarios.</string>
