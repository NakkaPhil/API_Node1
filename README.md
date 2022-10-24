# DOCUMENTACION
# Agregar un usuario:
Usar método post y mandar los campos "nombre" (string), "edad" (numero) y status (booleano) a traves de thunder client o Postman
Se obtiene una respuesta de la API informando que se ha actualizado correctamente

# Actualizar un usuario:
Ir a la ruta /update/(numero en el array de la DB que quiere actualizar el estado)
Al ir a esta ruta, se actualiza el estado del elemento a true con una respuesta (204) indicando que se ha actualizado

# Borrar un usuario:
Ir a la ruta /delete/(numero en el array de la DB que quiere borrar)
Al ir a esta ruta, se borrará obteniendo una respuesta de la API (200) indicando que se ha borrado

