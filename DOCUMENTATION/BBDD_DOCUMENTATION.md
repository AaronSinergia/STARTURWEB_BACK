DOCUMENTACIÓN DE STARTURWEB BACKEND BBDD (SPANISH)
+++++++++++++++++++++++++++++++++++++++++++++++

(Si quieres hacer pruebas con usuario Admin, de forma facil haz login con las siguientes credenciales:
{
"userName": "AaronSinergia",
"password": "AaronSinergia123"
}
)

DIRECTORIO API ENDPOINTS
++++++
- USUARIOS:
http://localhost:3000/api/users

- WEBSITES: 
http://localhost:3000/api/websites

- CATEGORIAS: 
http://localhost:3000/api/categories
++++++

Como puedo gestionar distinto el tipo de información con mi api:

1 - Consultar info (GET): Usa la url básica proporcionada arriba. (Para ver usuarios, debes ser usuario registrado o Admin). Si al final del endpoint, indicas ID, buscarás usuario/evento por ID.

2 - Registrate/Logueate (POST) con tu usuario para obtener permisos especiales: Añadiendo al endpoint de USUARIOS: "/register" o "/login".

3 - SUBE INFORMACIÓN ADICIONAL A USUARIOS, WEBS O CATEGORIAS (GET) con la URL básica + el id del evento.

5 - Borrar EVENTOS/WEBSITES/USUARIOS: Una vez logeado (sólo si eres administrador) Añade al final de la url el id de elemento a eliminar. (Ej. "/3423523466").



+++++++++++++++++++++++++++++++++++++++++++++++
STARTURWEB BACKEND DATABASE DOCUMENTATION (ENGLISH)
+++++++++++++++++++++++++++++++++++++++++++++++

(If you want to test with an Admin user, you can easily log in with the following credentials:

{
"userName": "AaronSinergia",
"password": "AaronSinergia123"
}
)*

API ENDPOINT DIRECTORY
++++++

USERS:
http://localhost:3000/api/users

WEBSITES:
http://localhost:3000/api/websites

CATEGORIES:
http://localhost:3000/api/categories
++++++

How to manage different types of information with my API:

1 - Retrieve info (GET): Use the basic URL provided above. (To view users, you must be a registered user or Admin). If you add an ID at the end of the endpoint, you can search for a user/event by ID.

2 - Register/Login (POST) with your user to gain special permissions: Add "/register" or "/login" to the USERS endpoint.

3 - Upload additional information to USERS, WEBSITES, or CATEGORIES (GET) using the basic URL + the event ID.

5 - Delete EVENTS/WEBSITES/USERS: Once logged in (only if you are an administrator), add the element ID to the end of the URL to delete it. (e.g., "/3423523466").