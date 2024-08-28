DOCUMENTACIÓN DE RESURRECTION BBDD Y USUARIOS (SPANISH)
+++++++++++++++++++++++++++++++++++++++++++++++

(Si quieres hacer pruebas con usuario Admin, de forma facil haz login con las siguientes credenciales:
{
"userName": "AaronSinergia",
"password": "AaronSinergia123"
}
)

API_URL
++++++
Endpoint sobre USUARIOS:
http://localhost:3000/api/auth

Endpoint sobre EVENTOS creados (incluye info sobre USUARIOS asistentes):
http://localhost:3000/api/events
++++++

Como puedo gestionar distinto el tipo de información con mi api:

1 - Consultar info (GET): Usa la url básica proporcionada arriba. (Para ver usuarios, debes ser usuario registrado o Admin). Si al final del endpoint, indicas ID, buscarás usuario/evento por ID.

2 - Crear info/registrar usuario nuevo (POST): Usa la url base para crear nuevos eventos o usuarios.

3 - Registrate/Logueate con tu usuario para obtener permisos especiales: Añadiendo al endpoint de USUARIOS: "/register" o "/login".

4 - Añade usuarios a eventos (PUT) con la URL básica + el id del evento (sólo si eres asistente o Admin).

5 - Borrar EVENTOS: Una vez logeado (sólo si eres administrador) Añade al final de la url el id de elemento a eliminar. (Ej. "/3423523466")

++++++++++++++++++++++++++++++++++++++++++++++++++++++
DOCUMENTATION FOR RESURRECTION BBDD AND USERS (ENGLISH)
++++++++++++++++++++++++++++++++++++++++++++++++++++++

(If you want to test with Admin user, log in with the following credentials:
{
"userName": "AaronSinergia",
"password": "AaronSinergia123"
}
)

API_URL
++++++
Endpoint about USERS:
http://localhost:3000/api/auth

Endpoint about created EVENTS (includes information about attending USERS):
http://localhost:3000/api/events
++++++

How to manage different types of information with my API:

1 - Query information (GET): Use the basic URL provided above. (To view users, you must be a registered user or Admin). If you add an ID at the end of the endpoint, you will search for a user/event by ID.

2 - Create information/register new user (POST): Use the base URL to create new events or users.

3 - Register/Login with your user to obtain special permissions: Add to the USERS endpoint: "/register" or "/login".

4 - Add users to events (PUT) with the basic URL + the event ID (only if you are an attendee or Admin).

5 - Delete EVENTS: Once logged in (only if you are an administrator), add the element ID to be deleted at the end of the URL. (E.g., "/3423523466")
