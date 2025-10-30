"""Script para crear solo datos de perfiles, sesiones y user-roles"""
from app import create_app
from app.data.database import db
from app.business.models.user import User
from app.business.models.role import Role
from app.business.models.profile import Profile
from app.business.models.session import Session
from app.business.models.user_role import UserRole
from datetime import datetime, timedelta
import uuid

def create_relations_data():
    app = create_app()
    with app.app_context():
        print("Creando datos de relaciones...")
        
        # Obtener usuarios existentes (si no hay, crear algunos por defecto)
        users = User.query.all()
        if not users:
            print("No hay usuarios. Creando usuarios de ejemplo...")
            sample_users = [
                {"name": "Alice Admin", "email": "alice.admin@example.com"},
                {"name": "Bob User", "email": "bob.user@example.com"},
                {"name": "Carol Moderator", "email": "carol.moderator@example.com"},
                {"name": "Dave Tester", "email": "dave.tester@example.com"},
                {"name": "Eve Auditor", "email": "eve.auditor@example.com"},
            ]
            for su in sample_users:
                db.session.add(User(name=su["name"], email=su["email"]))
            db.session.commit()
            users = User.query.all()
            print(f"OK - Creados {len(users)} usuarios")
        else:
            print(f"Encontrados {len(users)} usuarios")
        
        # Verificar si ya existen datos
        existing_profiles = Profile.query.count()
        existing_sessions = Session.query.count()
        existing_roles = Role.query.count()
        
        # Crear roles si no existen
        if existing_roles == 0:
            print("Creando roles...")
            roles = [
                Role(name='Admin', description='Administrador del sistema'),
                Role(name='Usuario', description='Usuario estándar'),
                Role(name='Moderador', description='Moderador de contenido'),
            ]
            for role in roles:
                db.session.add(role)
            db.session.commit()
            print(f"OK - Creados {len(roles)} roles")
        else:
            print(f"Ya existen {existing_roles} roles")
        
        roles = Role.query.all()
        
        # Crear perfiles (1:1) si no existen
        if existing_profiles == 0:
            print("Creando perfiles...")
            for i, user in enumerate(users[:3]):  # Solo primeros 3 usuarios
                profile = Profile(
                    user_id=user.id,
                    phone=f'+57 300 {1000000 + i}',
                    photo=f'user_{user.id}.jpg'
                )
                db.session.add(profile)
            db.session.commit()
            print(f"OK - Creados {min(3, len(users))} perfiles")
        else:
            print(f"Ya existen {existing_profiles} perfiles")
        
        # Crear sesiones (1:N) si no existen
        if existing_sessions == 0:
            print("Creando sesiones...")
            sessions_created = 0
            for user in users[:3]:  # Primeros 3 usuarios
                # Crear 2 sesiones por usuario
                for j in range(2):
                    session = Session(
                        id=str(uuid.uuid4()),
                        user_id=user.id,
                        token=f'token_{user.id}_{uuid.uuid4().hex[:16]}',
                        expiration=datetime.utcnow() + timedelta(days=7),
                        state='active'
                    )
                    db.session.add(session)
                    sessions_created += 1
            db.session.commit()
            print(f"OK - Creadas {sessions_created} sesiones")
        else:
            print(f"Ya existen {existing_sessions} sesiones")
        
        # Crear user-roles (N:N) si no existen
        existing_user_roles = db.session.query(UserRole).count()
        if existing_user_roles == 0 and len(roles) > 0:
            print("Creando asignaciones usuario-rol...")
            user_roles_created = 0
            for i, user in enumerate(users[:3]):
                role_index = i % len(roles)
                user_role = UserRole(
                    id=str(uuid.uuid4()),
                    user_id=user.id,
                    role_id=roles[role_index].id,
                    startAt=datetime.utcnow(),
                    endAt=None
                )
                db.session.add(user_role)
                user_roles_created += 1
            db.session.commit()
            print(f"OK - Creadas {user_roles_created} asignaciones usuario-rol")
        else:
            print(f"Ya existen {existing_user_roles} asignaciones usuario-rol")
        
        print("\n*** Datos de relaciones creados exitosamente! ***")
        print(f"\nAhora tienes:")
        print(f"   - {User.query.count()} usuarios")
        print(f"   - {Role.query.count()} roles")
        print(f"   - {Profile.query.count()} perfiles")
        print(f"   - {Session.query.count()} sesiones")
        print(f"   - {db.session.query(UserRole).count()} asignaciones usuario-rol")

if __name__ == '__main__':
    create_relations_data()

