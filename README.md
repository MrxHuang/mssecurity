# Sistema de Seguridad - Proyecto React + Flask

Sistema de gestión de usuarios con autenticación OAuth y múltiples librerías de diseño UI.

## Descripción

Aplicación web fullstack que implementa un sistema de seguridad con las siguientes características:

- Autenticación mediante OAuth 2.0 (Google, Microsoft, GitHub)
- Backend REST API con Flask y SQLAlchemy
- Frontend React con TypeScript y Vite
- Soporte para tres librerías de diseño UI: Tailwind CSS, Material UI y Bootstrap
- Gestión de relaciones de base de datos (1:1, 1:N, N:N)

## Requisitos del Sistema

### Backend
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Frontend
- Node.js 16.x o superior
- npm 8.x o superior

## Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd ms_security
```

### 2. Configuración del Backend

#### Instalar Dependencias de Python

```bash
pip install -r requirements.txt
```

#### Inicializar la Base de Datos

El sistema utiliza SQLite como base de datos. Al ejecutar el backend por primera vez, se creará automáticamente el archivo `app/app.db` con todas las tablas necesarias.

```bash
python run.py
```

Detener el servidor con `Ctrl+C` después de verificar que inicia correctamente.

#### Poblar la Base de Datos con Datos de Ejemplo

Para facilitar las pruebas, puede ejecutar el siguiente script que creará usuarios, roles, perfiles, sesiones y asignaciones de ejemplo:

```bash
python create_relations_data.py
```

Este script creará:
- 3 usuarios de prueba
- 4 roles (Admin, Usuario, Moderador)
- 3 perfiles asociados a usuarios (relación 1:1)
- 6 sesiones activas (relación 1:N)
- 3 asignaciones usuario-rol (relación N:N)

### 3. Configuración del Frontend

#### Instalar Dependencias de Node.js

```bash
npm install
```

#### Configurar Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_FIREBASE_API_KEY=<TU_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=<TU_AUTH_DOMAIN>
VITE_FIREBASE_PROJECT_ID=<TU_PROJECT_ID>
VITE_FIREBASE_STORAGE_BUCKET=<TU_STORAGE_BUCKET>
VITE_FIREBASE_MESSAGING_SENDER_ID=<TU_SENDER_ID>
VITE_FIREBASE_APP_ID=<TU_APP_ID>
```

Para obtener las credenciales de Firebase:

1. Acceder a [Firebase Console](https://console.firebase.google.com/)
2. Crear un nuevo proyecto o seleccionar uno existente
3. Navegar a Configuración del proyecto > General
4. En la sección "Tus aplicaciones", agregar una aplicación web
5. Copiar las credenciales de configuración

#### Configurar Proveedores OAuth en Firebase

1. En Firebase Console, ir a Authentication > Sign-in method
2. Habilitar los proveedores necesarios:
   - **Google**: Activar el proveedor
   - **GitHub**: Registrar una OAuth App en GitHub Settings > Developer settings > OAuth Apps
   - **Microsoft**: Registrar una aplicación en Azure AD

3. Configurar dominios autorizados:
   - Ir a Authentication > Settings > Authorized domains
   - Agregar: `localhost`, `127.0.0.1`

## Ejecución

### Iniciar el Backend

Desde la raíz del proyecto:

```bash
python run.py
```

El servidor Flask estará disponible en `http://127.0.0.1:5000`

### Iniciar el Frontend

En una terminal separada:

```bash
npm run dev
```

La aplicación React estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
ms_security/
├── app/                          # Backend Flask
│   ├── business/
│   │   ├── controllers/          # Lógica de negocio
│   │   └── models/               # Modelos de base de datos
│   ├── data/
│   │   └── database.py           # Configuración de SQLAlchemy
│   ├── presentation/
│   │   └── routes/               # Endpoints REST
│   ├── static/                   # Archivos estáticos
│   └── app.db                    # Base de datos SQLite (generada)
├── src/                          # Frontend React
│   ├── auth/                     # Autenticación Firebase
│   ├── components/
│   │   └── adaptive/             # Componentes multi-UI
│   ├── context/                  # Contextos de React
│   ├── features/                 # Módulos por entidad
│   ├── lib/                      # Cliente API
│   ├── pages/                    # Páginas principales
│   └── routes/                   # Guards y rutas protegidas
├── requirements.txt              # Dependencias Python
├── package.json                  # Dependencias Node.js
└── vite.config.ts               # Configuración de Vite
```

## Uso

### Autenticación

1. Acceder a `http://localhost:5173/login`
2. Seleccionar un proveedor OAuth (Google, Microsoft o GitHub)
3. Completar el proceso de autenticación
4. Será redirigido al panel de control

### Cambio de Librería UI

El sistema permite cambiar dinámicamente entre tres librerías de diseño:

- **Tailwind CSS**: Diseño por defecto
- **Material UI**: Seleccionar desde el menú superior
- **Bootstrap**: Seleccionar desde el menú superior

El selector se encuentra en la esquina superior derecha del panel de control.

### Gestión de Entidades

El sistema incluye CRUDs completos para las siguientes entidades:

- **Usuarios**: Gestión básica de usuarios
- **Perfiles**: Relación 1:1 con usuarios
- **Sesiones**: Relación 1:N con usuarios
- **Usuario-Roles**: Relación N:N (tabla intermedia)

Cada módulo permite:
- Listar registros
- Crear nuevos registros
- Editar registros existentes
- Eliminar registros

## API Endpoints

El backend expone los siguientes endpoints REST:

### Usuarios
- `GET /api/users/` - Listar usuarios
- `GET /api/users/<id>` - Obtener usuario específico
- `POST /api/users/` - Crear usuario
- `PUT /api/users/<id>` - Actualizar usuario
- `DELETE /api/users/<id>` - Eliminar usuario

### Perfiles
- `GET /api/profiles/` - Listar perfiles
- `GET /api/profiles/<id>` - Obtener perfil específico
- `POST /api/profiles/` - Crear perfil
- `PUT /api/profiles/<id>` - Actualizar perfil
- `DELETE /api/profiles/<id>` - Eliminar perfil

### Sesiones
- `GET /api/sessions/` - Listar sesiones
- `GET /api/sessions/<id>` - Obtener sesión específica
- `POST /api/sessions/` - Crear sesión
- `PUT /api/sessions/<id>` - Actualizar sesión
- `DELETE /api/sessions/<id>` - Eliminar sesión

### Usuario-Roles
- `GET /api/user-roles/` - Listar asignaciones
- `GET /api/user-roles/<id>` - Obtener asignación específica
- `POST /api/user-roles/` - Crear asignación
- `PUT /api/user-roles/<id>` - Actualizar asignación
- `DELETE /api/user-roles/<id>` - Eliminar asignación

## Solución de Problemas

### El backend no inicia

Verificar que todas las dependencias de Python estén instaladas:
```bash
pip install -r requirements.txt
```

### Error de conexión en el frontend

Asegurar que:
1. El backend esté ejecutándose en el puerto 5000
2. La variable `VITE_API_BASE_URL` en `.env.local` sea correcta

### Error de autenticación OAuth

Verificar que:
1. Las credenciales de Firebase en `.env.local` sean correctas
2. Los dominios autorizados estén configurados en Firebase Console
3. Los proveedores OAuth estén habilitados en Firebase Authentication

### La base de datos está vacía

Ejecutar el script de población de datos:
```bash
python create_relations_data.py
```

### Resetear la base de datos

Si necesita empezar desde cero:

1. Detener el backend
2. Eliminar el archivo `app/app.db`
3. Reiniciar el backend (se creará una nueva base de datos)
4. Ejecutar `python create_relations_data.py`

## Tecnologías Utilizadas

### Backend
- Flask 2.3.3
- SQLAlchemy 3.1.1
- Flask-CORS 4.0.0
- Flask-Migrate 4.0.5

### Frontend
- React 18
- TypeScript 5
- Vite 5
- React Router DOM 6
- Axios
- Firebase Authentication
- Tailwind CSS 3
- Material UI 5
- Bootstrap 5

## Notas Adicionales

- El sistema utiliza SQLite para simplificar el despliegue. Para producción, se recomienda migrar a PostgreSQL o MySQL.
- Los tokens de autenticación se almacenan en localStorage del navegador.
- El archivo `app.db` no debe incluirse en el control de versiones (está en `.gitignore`).
- Para despliegue en producción, configurar variables de entorno apropiadas y utilizar HTTPS.

## Licencia

Este proyecto fue desarrollado como parte de un proyecto académico.
