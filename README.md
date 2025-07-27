# Pokémon Horoscope
## Correr la aplicación con Docker
Construir la imagen:
```
git clone https://github.com/TU_USUARIO/pokemon-horoscope.git
cd pokemon-horoscope
docker build -t pokemon-horoscope .
```
Ejecutar el contenedor:
```
docker run -p 3000:3000 pokemon-horoscope
```
## Funcionalidades
* Ingresar fecha de cumpleaños y recibir un Pokémon
* Buscar Pokémon por nombre
* Agregar Pokémon a la lista de favoritos
* Eliminar Pokémon de la lista de favoritos
* Acceso rápido al nombre, ID, tipo y altura de los Pokémon guardados en Favoritos
