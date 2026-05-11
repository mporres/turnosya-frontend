# TurnosYA Frontend

Aplicación web frontend en Next.js para la gestión de turnos, clientes y servicios del MVP académico **TurnosYA**. Consume la API REST del backend y ofrece una interfaz simple para profesionales independientes y pequeños negocios.

## Descripción

TurnosYA Frontend es la interfaz de usuario que permite a los usuarios interactuar con el sistema de gestión de turnos. Ofrece páginas para administrar clientes, servicios y turnos, además de una sección de post-desarrollo que simula el soporte posterior al lanzamiento.

El frontend se comunica con el backend ([turnosya-backend](https://github.com/mporres/turnosya-backend)) a través de una API REST.

## Tecnologías utilizadas

- Next.js 14.2.5 (App Router)
- React 18.3.1
- JavaScript (sin TypeScript)
- CSS plano (sin frameworks de estilos)
- Fetch API para consumo del backend

## Requisitos previos

- Node.js >= 18
- npm
- Backend de TurnosYA corriendo en `http://localhost:3001`

## Instalación

```bash
git clone https://github.com/mporres/turnosya-frontend.git
cd turnosya-frontend
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Variable obligatoria:

| Variable | Default | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api` | URL base de la API del backend. |

## Ejecución

```bash
npm run dev    # desarrollo en http://localhost:3000
npm run build  # producción
npm start      # servidor de producción
```

La aplicación queda disponible en `http://localhost:3000`.

## Estructura del proyecto

```
turnosya-frontend/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   ├── clientes/
│   │   └── page.js
│   ├── servicios/
│   │   └── page.js
│   ├── turnos/
│   │   ├── page.js
│   │   └── nuevo/
│   │       └── page.js
│   └── post-desarrollo/
│       └── page.js
├── components/
│   └── Navbar.js
├── lib/
│   └── api.js
├── .env.example
├── .gitignore
├── jsconfig.json
├── next.config.js
├── package.json
└── README.md
```

## Páginas disponibles

### `/` — Inicio

Página de bienvenida con descripción del sistema y accesos rápidos a las funcionalidades principales.

### `/clientes` — Gestión de clientes

- Listado de clientes registrados.
- Formulario para crear nuevos clientes (nombre, teléfono, email, notas).
- Eliminación de clientes (bloqueada si tienen turnos asociados).

### `/servicios` — Gestión de servicios

- Listado de servicios ofrecidos.
- Formulario para crear servicios (nombre, descripción, duración en minutos, precio).
- Eliminación de servicios (bloqueada si tienen turnos asociados).

### `/turnos` — Gestión de turnos

- Listado de turnos con datos enriquecidos del cliente y servicio.
- Cambio de estado del turno (pendiente, confirmado, cancelado, finalizado).
- Cancelación lógica de turnos (DELETE marca como cancelado).
- Enlace a crear nuevo turno.

### `/turnos/nuevo` — Crear turno

- Selección de cliente y servicio desde listas desplegables.
- Campos de fecha, hora, estado y notas.
- Validación de campos obligatorios.
- Redirección a `/turnos` tras crear el turno.

### `/post-desarrollo` — Post-desarrollo

Página estática que simula la etapa posterior al lanzamiento:

- 5 tickets de soporte simulados (bugs, mejoras, consultas).
- 2 métricas de seguimiento: tickets por tipo y por estado.
- Prompt de IA utilizado para analizar los tickets.
- Conclusión sobre el estado del soporte.

## Integración con backend

El frontend consume la API REST del backend a través del módulo `lib/api.js`, que centraliza todas las llamadas HTTP.

Endpoints consumidos:

- `GET /api/clientes` — listar clientes
- `POST /api/clientes` — crear cliente
- `DELETE /api/clientes/:id` — eliminar cliente
- `GET /api/servicios` — listar servicios
- `POST /api/servicios` — crear servicio
- `DELETE /api/servicios/:id` — eliminar servicio
- `GET /api/turnos` — listar turnos (enriquecidos)
- `POST /api/turnos` — crear turno
- `PATCH /api/turnos/:id` — actualizar turno
- `DELETE /api/turnos/:id` — cancelar turno (lógico)

El módulo `lib/api.js` maneja errores de conexión y respuestas no exitosas, mostrando mensajes claros al usuario.

## Uso de IA durante el desarrollo

El frontend fue diseñado y desarrollado con asistencia de IA (Windsurf / Cascade). A continuación se documentan los prompts clave utilizados.

### Prompt para generación de estructura

```txt
Creá la estructura inicial de un frontend Next.js para TurnosYA usando App Router y JavaScript. Debe incluir un navbar con enlaces a clientes, servicios, turnos, nuevo turno y post-desarrollo. Usá CSS plano sin frameworks. Creá páginas placeholder para cada ruta.
```

### Prompt para integración con API

```txt
Implementá el módulo lib/api.js del frontend de TurnosYA. Debe leer NEXT_PUBLIC_API_URL y exportar funciones para consumir la API del backend: getClientes, createCliente, deleteCliente, getServicios, createServicio, deleteServicio, getTurnos, createTurno, updateTurno y deleteTurno. Agregá manejo básico de errores para respuestas no exitosas y problemas de conexión.
```

### Prompt para páginas de clientes y servicios

```txt
Implementá la página /clientes del frontend de TurnosYA. Debe listar clientes consumiendo getClientes desde lib/api.js y permitir crear un nuevo cliente con un formulario que pida nombre, telefono, email y notas. Validá nombre y telefono en el frontend. Mostrá mensajes simples de carga y error. Después de crear, limpiá el formulario y actualizá el listado. Incluí botón de eliminar que consuma deleteCliente.
```

### Prompt para página de turnos

```txt
Implementá la página /turnos del frontend de TurnosYA. Debe listar turnos consumiendo getTurnos desde lib/api.js. Mostrá fecha, hora, estado, nombre del cliente y nombre del servicio. Agregá un enlace a /turnos/nuevo. Permití cambiar el estado del turno usando updateTurno y cancelar un turno usando deleteTurno. Mostrá mensajes simples de carga y error.
```

### Prompt para resolución de errores

```txt
Estoy desarrollando un frontend Next.js que consume una API REST. Recibo el siguiente error: [PEGAR ERROR]. Explicá la causa probable considerando que uso App Router, 'use client' para componentes con estado, y fetch con NEXT_PUBLIC_API_URL. Proponé una solución sin cambiar la arquitectura general.
```

## Post-desarrollo

La página `/post-desarrollo` cumple con el requisito académico de simular la etapa posterior al lanzamiento del MVP. Incluye:

- **5 tickets simulados** con tipo (bug, mejora, consulta), prioridad (alta, media, baja) y estado (abierto, en progreso, resuelto, cerrado).
- **2 métricas de seguimiento**: cantidad de tickets por tipo y cantidad de tickets por estado.
- **Prompt de IA** utilizado para analizar los tickets y generar conclusiones.
- **Conclusión** sobre el estado del soporte post-lanzamiento.

Los tickets no requieren endpoints reales; están hardcodeados en la página para simplificar el MVP.

## Mejora futura: autenticación con JWT

La autenticación **no** está implementada en este MVP. Queda documentada como mejora futura.

En una versión posterior, TurnosYA podría incorporar:

- Registro y login de usuarios desde el frontend.
- Almacenamiento seguro del token JWT (httpOnly cookies o localStorage con precauciones).
- Envío del token en el header `Authorization: Bearer <token>` en cada request a la API.
- Protección de rutas privadas con middleware de Next.js.
- Redirección automática a `/login` si el token expira o es inválido.
- Cierre de sesión que elimine el token del cliente.

Se decidió posponer JWT para priorizar el cumplimiento de los requisitos obligatorios de la consigna (frontend funcional, integración con backend, tickets, métricas y documentación).

## Licencia

ISC.
