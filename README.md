# Proyecto Angular con Angular Material

Este es un proyecto en Angular 14 que utiliza Angular Material para el diseño de componentes. Permite visualizar personajes con paginación, filtrado y la opción de marcarlos como favoritos.

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instaladas las siguientes herramientas:

Node.js (versión recomendada: 16 o superior)

Angular CLI (versión recomendada: 14.x)

Puedes verificar si Node.js y Angular CLI están instalados ejecutando:
`node -v  # Verifica la versión de Node.js`
`ng version  # Verifica la versión de Angular CLI`

# Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clonar el repositorio:
`git clone https://github.com/JoseIgnacio2020/rick-and-morty.git`
`cd rick-and-morty`

2. Instalar las dependencias:
`npm install`

# Ejecutar el Proyecto

Para iniciar el servidor de desarrollo y ver la aplicación en el navegador, usa el siguiente comando:
`ng serve`
Luego, abre tu navegador y accede a:
http://localhost:4200/

# Despliegue en Netlify

Puedes desplegar este proyecto en Netlify siguiendo estos pasos:

1. Compilar el proyecto para producción:
`ng build --configuration=production`

Esto generará una carpeta dist/rick-and-morty/ con los archivos estáticos necesarios.

2. Crear una cuenta en Netlify y subir el proyecto:

 Inicia sesión en Netlify.

 Ve a "New site from Git" y conecta tu repositorio de GitHub.

 Selecciona la rama que deseas desplegar.

 Configura los ajustes de compilación:

Build command: ng build --configuration=production

 Publish directory: dist/rick-and-morty

 Haz clic en "Deploy site".

3. Netlify generará una URL para acceder a tu proyecto en línea.

