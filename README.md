Libreria Web con CI/CD
Este es un proyecto de demostración que implementa un pipeline de Integración y Despliegue Continuos (CI/CD) utilizando GitHub Actions.

Esta aplicación cuenta con: 
* Login y registro con activación y reinicio de contraseña por token.
* Busqueda de libros creados con flitros.
* Vistas con datos de libros creados.
* Creación, edición y eliminación de libros.
* Creación, edición y eliminación de categorías literarias.
* Creación, edición y eliminación de editoriales.
* Creación, edición y eliminación de autores.
* Manejo de variables de entorno.
* Manejo de errores en FrontEnd.

Requisitos técnicos:
* Git
* Node.js (versión 18 o superior)
* Docker Desktop
* Una cuenta de GitHub

PASOS PARA SU USO:
    Clona este repositorio:
        git clone ht
        cd 

    Instala las dependencias de Node.js:
        npm install

    Ejecuta la aplicación localmente:
        npm start

    La aplicación estará disponible en http://localhost:3000.

PASOS PARA EJECUTAR PRUEBAS:
    Para ejecutar las pruebas e2e, usa el siguiente comando:

        npm test-e2e


Pipeline de CI/CD
El pipeline, definido en .github/workflows/ci-cd.yml, se activa en cada push a la rama main y en cada pull request.

    * test: Ejecuta las pruebas de integración para validar la lógica y la conexión a la base de datos.

    * docker-build: Si los pasos anteriores son exitosos, construye la imagen Docker de la aplicación. Esto simula el "despliegue", ya que el contenedor resultante está listo para ser ejecutado en cualquier servidor.


Instrucciones de Despliegue:
En un entorno de producción, la imagen construida por el pipeline sería subida a un registro de contenedores (como Docker Hub). Un servicio de orquestación (como Kubernetes) luego tomaría esa imagen y la desplegaría en un servidor.

Para este proyecto, el éxito del pipeline en la construcción de la imagen weblibrary:latest demuestra que la aplicación está lista para el despliegue.

Guia de contribución:
    * Haz un "fork" del repositorio.

    * Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).

    * Haz tus cambios y prueba que todo funcione localmente (npm test).

    * Realiza el "commit" (git commit -m 'feat: agrega nueva funcionalidad').

    * Empuja la rama a tu "fork" (git push origin feature/nueva-funcionalidad).

    * Abre un Pull Request.


Créditos: 
    Creado por:
    Reymon Ruiz Reyes
    Matrícula 2024-0081

    Elvin Manuel Méndes Espinosa
    Matrícula 2024-0104

Instituto Tecnológico de Las Américas,
República Dominicana