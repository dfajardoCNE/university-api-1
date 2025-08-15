# Frontend para Sistema de Gestión Universitaria

Este proyecto es una interfaz de usuario desarrollada con React y Material-UI para interactuar con la API del Sistema de Gestión Universitaria.

## Características

- Interfaz moderna y responsiva con Material-UI
- Gestión de estudiantes, profesores, cursos y matrículas
- Autenticación y autorización de usuarios
- Comunicación con la API del backend

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- API del Sistema de Gestión Universitaria en ejecución

## Instalación

1. Clona el repositorio (si aún no lo has hecho)
2. Navega al directorio del frontend:
   ```
   cd frontend
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Configuración

Crea un archivo `.env` en la raíz del directorio frontend con las siguientes variables:

```
VITE_API_URL=http://localhost:3000
```

Ajusta la URL según la configuración de tu API.

## Ejecución

Para iniciar el servidor de desarrollo:

```
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

## Construcción para producción

Para construir la aplicación para producción:

```
npm run build
```

Los archivos generados estarán en el directorio `dist`.

## Estructura del proyecto

- `src/components`: Componentes reutilizables
- `src/pages`: Páginas de la aplicación
- `src/services`: Servicios para comunicación con la API
- `src/layouts`: Layouts reutilizables
- `src/hooks`: Custom hooks
- `src/utils`: Utilidades y funciones auxiliares
- `src/interfaces`: Interfaces TypeScript
- `src/assets`: Recursos estáticos

## Tecnologías utilizadas

- React
- TypeScript
- Material-UI
- React Router
- Axios
- Vite
