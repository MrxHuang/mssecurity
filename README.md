# Sistema de Seguridad - Proyecto React + Flask

Sistema de gestión de usuarios con autenticación OAuth y múltiples librerías de diseño UI.

## Descripción

Aplicación web fullstack que implementa un sistema de seguridad integral con las siguientes características:

- **Autenticación**: OAuth 2.0 mediante Firebase (Google, Microsoft, GitHub)
- **Backend**: REST API con Flask y SQLAlchemy
- **Frontend**: React 18 con TypeScript y Vite
- **Sistema Multi-UI**: Soporte dinámico para tres librerías de diseño UI:
  - Tailwind CSS (por defecto)
  - Material UI (MUI)
  - Bootstrap 5
- **Componentes Genéricos**: Sistema de componentes reutilizables que se adaptan automáticamente a la librería UI seleccionada
- **Gestión Completa**: CRUDs para múltiples entidades con relaciones de base de datos (1:1, 1:N, N:N)

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
│   │   ├── generic/              # Componentes genéricos reutilizables
│   │   │   ├── GenericForm.tsx   # Formulario multi-UI
│   │   │   ├── GenericList.tsx   # Lista multi-UI
│   │   │   └── GenericDetailView.tsx  # Vista de detalle multi-UI
│   │   ├── adaptive/             # Componentes adaptativos
│   │   ├── Layout.tsx            # Layout principal
│   │   └── UiLibrarySwitcher.tsx # Selector de librería UI
│   ├── context/                  # Contextos de React
│   │   └── UiLibraryContext.tsx  # Contexto para librería UI
│   ├── features/                 # Módulos por entidad
│   │   ├── addresses/            # Direcciones
│   │   ├── answers/              # Respuestas
│   │   ├── devices/              # Dispositivos
│   │   ├── digital-signatures/   # Firmas digitales
│   │   ├── passwords/            # Contraseñas
│   │   ├── permissions/          # Permisos
│   │   ├── profiles/             # Perfiles (relación 1:1)
│   │   ├── role-permissions/     # Permisos de rol
│   │   ├── roles/                # Roles
│   │   ├── security-questions/   # Preguntas de seguridad
│   │   ├── sessions/             # Sesiones (relación 1:N)
│   │   ├── user-roles/           # Usuario-Roles (relación N:N)
│   │   └── users/                # Usuarios
│   ├── lib/                      # Cliente API
│   │   └── api.ts                # Configuración Axios
│   ├── pages/                    # Páginas principales
│   │   ├── Dashboard.tsx         # Panel de control
│   │   └── Login.tsx             # Página de login
│   ├── routes/                   # Guards y rutas protegidas
│   │   └── ProtectedRoute.tsx    # Componente de ruta protegida
│   └── utils/                    # Utilidades
│       ├── dateFormatter.ts      # Formateo de fechas
│       └── formValidation.ts     # Validación de formularios
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
- **Material UI (MUI)**: Seleccionar desde el menú superior
- **Bootstrap 5**: Seleccionar desde el menú superior

El selector se encuentra en la esquina superior derecha del panel de control. Todos los componentes se adaptan automáticamente al estilo seleccionado sin necesidad de recargar la página.

### Componentes Genéricos

El sistema incluye componentes genéricos reutilizables que se adaptan automáticamente a la librería UI seleccionada:

- **GenericForm**: Formulario genérico que soporta múltiples tipos de campos (texto, número, email, fecha, select)
- **GenericList**: Tabla genérica con paginación, ordenamiento y acciones (editar, eliminar)
- **GenericDetailView**: Vista de detalle genérica con soporte para diferentes tipos de campos

Estos componentes permiten crear CRUDs completos con mínimo código, adaptándose automáticamente a Tailwind CSS, Material UI o Bootstrap según la selección del usuario.

### Gestión de Entidades

El sistema incluye CRUDs completos para las siguientes entidades:

#### Entidades Principales
- **Usuarios**: Gestión básica de usuarios
- **Roles**: Definición de roles del sistema
- **Permisos**: Gestión de permisos individuales
- **Role-Permissions**: Asignación de permisos a roles (relación N:N)

#### Entidades de Seguridad
- **Perfiles**: Información adicional de usuarios (relación 1:1)
- **Sesiones**: Historial de sesiones de usuario (relación 1:N)
- **Usuario-Roles**: Asignación de roles a usuarios (relación N:N)
- **Passwords**: Gestión de contraseñas
- **Security Questions**: Preguntas de seguridad
- **Digital Signatures**: Firmas digitales

#### Entidades Adicionales
- **Addresses**: Direcciones asociadas
- **Devices**: Dispositivos registrados
- **Answers**: Respuestas a preguntas de seguridad

Cada módulo permite:
- Listar registros con paginación y ordenamiento
- Crear nuevos registros mediante formularios adaptativos
- Editar registros existentes
- Eliminar registros con confirmación
- Visualizar detalles completos de cada registro

## API Endpoints

El backend expone los siguientes endpoints REST siguiendo el patrón estándar CRUD:

### Patrón de Endpoints

Cada entidad sigue el mismo patrón de endpoints:
- `GET /api/<entidad>/` - Listar todos los registros
- `GET /api/<entidad>/<id>` - Obtener un registro específico
- `POST /api/<entidad>/` - Crear un nuevo registro
- `PUT /api/<entidad>/<id>` - Actualizar un registro existente
- `DELETE /api/<entidad>/<id>` - Eliminar un registro

### Entidades Disponibles

El sistema incluye endpoints para las siguientes entidades:

- `/api/users/` - Usuarios
- `/api/profiles/` - Perfiles
- `/api/sessions/` - Sesiones
- `/api/user-roles/` - Asignaciones Usuario-Rol
- `/api/roles/` - Roles
- `/api/permissions/` - Permisos
- `/api/role-permissions/` - Asignaciones Rol-Permiso
- `/api/passwords/` - Contraseñas
- `/api/security-questions/` - Preguntas de seguridad
- `/api/answers/` - Respuestas
- `/api/digital-signatures/` - Firmas digitales
- `/api/addresses/` - Direcciones
- `/api/devices/` - Dispositivos

Todos los endpoints requieren autenticación mediante token JWT almacenado en localStorage.

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
- **Core**:
  - React 18.3.1
  - TypeScript 5.5.3
  - Vite 5.4.2
  - React Router DOM 7.9.5
- **HTTP Client**: Axios 1.13.1
- **Autenticación**: Firebase 12.4.0
- **UI Libraries**:
  - Tailwind CSS 3.4.1
  - Material UI (MUI) 7.3.4
  - Bootstrap 5.3.8
- **Utilidades**:
  - Lucide React (iconos) 0.344.0
  - Boring Avatars 2.0.4
  - Emotion (para MUI) 11.14.0
- **Desarrollo**:
  - ESLint 9.9.1
  - TypeScript ESLint 8.3.0

## Arquitectura del Sistema Multi-UI

El sistema implementa una arquitectura flexible que permite cambiar dinámicamente entre diferentes librerías de UI:

1. **Context Provider**: `UiLibraryContext` mantiene el estado de la librería UI seleccionada
2. **Componentes Genéricos**: `GenericForm`, `GenericList` y `GenericDetailView` detectan la librería activa y renderizan el componente apropiado
3. **Adaptación Automática**: Todos los componentes se adaptan sin recargar la página
4. **Consistencia Visual**: Cada librería mantiene su propia identidad visual mientras se preserva la funcionalidad

## Notas Adicionales

- **Base de Datos**: El sistema utiliza SQLite para simplificar el despliegue. Para producción, se recomienda migrar a PostgreSQL o MySQL. El archivo `app.db` no debe incluirse en el control de versiones (está en `.gitignore`).
- **Autenticación**: Los tokens de autenticación se almacenan en localStorage del navegador.
- **Producción**: Para despliegue en producción, configurar variables de entorno apropiadas y utilizar HTTPS.
- **Componentes Genéricos**: Los componentes genéricos están diseñados para ser altamente reutilizables y extensibles. Pueden personalizarse mediante props y callbacks.
- **TypeScript**: Todo el código frontend está tipado con TypeScript para mayor seguridad y mantenibilidad.

## Licencia

Este proyecto fue desarrollado como parte de un proyecto académico.
