# biblioteca-app

App de una biblioteca electrónica.

David Jiménez Villarejo 2º DAW

## Instalación

Importa el archivo `biblioteca.sql` en la base de datos MySQL.

Entra en `src > php > db.php` y cambia el contenido de las variables `$user = 'root';` `$password = '';` por tu usuario y contraseña.

Entra en la carpeta del proyecto y ejecuta `php -S localhost:8000` o copia el proyecto en la carpeta de tu servidor.

Disfruta de la biblioteca!

## Información

| Usuario            | Contraseña  | Rol           |
| -----------        | ----------- | -----------   |
| test@test.com      | 1234        | usuario       |
| admin@admin.es     | 1234        | bibliotecario |

El usuario test@test.com tiene una multa por no devolver el libro.

El libro <strong>El Hechicero</strong> solo hay 1 en stock, para probar la lista de deseados.
