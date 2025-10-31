"""Script para poblar TODAS las entidades con datos de ejemplo.

Ejecuta este archivo directamente:
  python create_relations_data.py

Crea usuarios, roles, perfiles, direcciones, firmas digitales, sesiones,
contraseñas históricas, dispositivos, preguntas de seguridad, respuestas,
permisos y relaciones rol-permiso, además de asignaciones usuario-rol.
"""
from app import create_app
from app.data.database import db
from app.business.models.user import User
from app.business.models.role import Role
from app.business.models.profile import Profile
from app.business.models.session import Session
from app.business.models.user_role import UserRole
from app.business.models.address import Address
from app.business.models.digital_signature import DigitalSignature
from app.business.models.password import Password
from app.business.models.device import Device
from app.business.models.security_question import SecurityQuestion
from app.business.models.answer import Answer
from app.business.models.permission import Permission
from app.business.models.role_permission import RolePermission
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
        existing_addresses = Address.query.count()
        existing_signatures = DigitalSignature.query.count()
        existing_passwords = Password.query.count()
        existing_devices = Device.query.count()
        existing_questions = SecurityQuestion.query.count()
        existing_answers = Answer.query.count()
        existing_permissions = Permission.query.count()
        existing_role_permissions = RolePermission.query.count()
        
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

        # Crear direcciones (1:1) si no existen
        if existing_addresses == 0:
            print("Creando direcciones...")
            for i, user in enumerate(users[:3]):
                address = Address(
                    user_id=user.id,
                    street=f'Calle {10 + i}',
                    number=str(100 + i),
                    latitude=4.7110 + i * 0.001,
                    longitude=-74.0721 - i * 0.001
                )
                db.session.add(address)
            db.session.commit()
            print("OK - Creadas 3 direcciones")
        else:
            print(f"Ya existen {existing_addresses} direcciones")

        # Crear firmas digitales (1:1) si no existen
        if existing_signatures == 0:
            print("Creando firmas digitales...")
            for user in users[:3]:
                signature = DigitalSignature(user_id=user.id, photo=f'digital-signatures/sign_{user.id}.png')
                db.session.add(signature)
            db.session.commit()
            print("OK - Creadas 3 firmas digitales")
        else:
            print(f"Ya existen {existing_signatures} firmas digitales")
        
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

        # Crear contraseñas históricas (1:N) si no existen
        if existing_passwords == 0:
            print("Creando contraseñas históricas...")
            for user in users[:3]:
                for k in range(2):
                    pwd = Password(user_id=user.id, content=f'hash_{user.id}_{k:02d}')
                    db.session.add(pwd)
            db.session.commit()
            print("OK - Creadas 6 contraseñas")
        else:
            print(f"Ya existen {existing_passwords} contraseñas")

        # Crear dispositivos (1:N) si no existen
        if existing_devices == 0:
            print("Creando dispositivos...")
            for i, user in enumerate(users[:3]):
                dev1 = Device(user_id=user.id, name=f'Laptop-{i+1}', ip=f'192.168.0.{10+i}', operating_system='Windows 11')
                dev2 = Device(user_id=user.id, name=f'Phone-{i+1}', ip=f'10.0.0.{20+i}', operating_system='Android 14')
                db.session.add(dev1)
                db.session.add(dev2)
            db.session.commit()
            print("OK - Creados 6 dispositivos")
        else:
            print(f"Ya existen {existing_devices} dispositivos")

        # Crear preguntas de seguridad
        if existing_questions == 0:
            print("Creando preguntas de seguridad...")
            qs = [
                SecurityQuestion(name='¿Nombre de tu primera mascota?', description='Mascota'),
                SecurityQuestion(name='¿Ciudad de nacimiento?', description='Ciudad'),
                SecurityQuestion(name='¿Comida favorita?', description='Comida'),
            ]
            for q in qs:
                db.session.add(q)
            db.session.commit()
            print(f"OK - Creadas {len(qs)} preguntas")
        else:
            print(f"Ya existen {existing_questions} preguntas de seguridad")

        # Crear respuestas (N:N mediante Answer)
        if existing_answers == 0:
            print("Creando respuestas de seguridad...")
            users_three = users[:3]
            qs = SecurityQuestion.query.all()
            created = 0
            for u in users_three:
                for q in qs:
                    db.session.add(Answer(user_id=u.id, security_question_id=q.id, content=f'resp_{u.id}_{q.id}'))
                    created += 1
            db.session.commit()
            print(f"OK - Creadas {created} respuestas")
        else:
            print(f"Ya existen {existing_answers} respuestas")

        # Crear permisos (catálogo)
        if existing_permissions == 0:
            print("Creando permisos...")
            perms = [
                Permission(entity='users', method='GET', url='/api/users/'),
                Permission(entity='users', method='POST', url='/api/users/'),
                Permission(entity='profiles', method='GET', url='/api/profiles/'),
                Permission(entity='profiles', method='PUT', url='/api/profiles/<id>'),
                Permission(entity='sessions', method='GET', url='/api/sessions/'),
                Permission(entity='devices', method='POST', url='/api/devices/user/<user_id>'),
                Permission(entity='security-questions', method='GET', url='/api/security-questions/'),
            ]
            for p in perms:
                db.session.add(p)
            db.session.commit()
            print(f"OK - Creados {len(perms)} permisos")
        else:
            print(f"Ya existen {existing_permissions} permisos")
        
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

        # Crear relaciones rol-permiso (N:N)
        if existing_role_permissions == 0:
            print("Creando relaciones rol-permiso...")
            roles = Role.query.all()
            permissions = Permission.query.all()
            created = 0
            for r in roles:
                # Asignar primeros 3 permisos a cada rol para el ejemplo
                for p in permissions[:3]:
                    db.session.add(RolePermission(id=str(uuid.uuid4()), role_id=r.id, permission_id=p.id))
                    created += 1
            db.session.commit()
            print(f"OK - Creadas {created} relaciones rol-permiso")
        else:
            print(f"Ya existen {existing_role_permissions} relaciones rol-permiso")
        
        print("\n*** Datos de relaciones creados exitosamente! ***")
        print(f"\nAhora tienes:")
        print(f"   - {User.query.count()} usuarios")
        print(f"   - {Role.query.count()} roles")
        print(f"   - {Profile.query.count()} perfiles")
        print(f"   - {Address.query.count()} direcciones")
        print(f"   - {DigitalSignature.query.count()} firmas digitales")
        print(f"   - {Session.query.count()} sesiones")
        print(f"   - {Password.query.count()} contraseñas")
        print(f"   - {Device.query.count()} dispositivos")
        print(f"   - {SecurityQuestion.query.count()} preguntas de seguridad")
        print(f"   - {Answer.query.count()} respuestas")
        print(f"   - {Permission.query.count()} permisos")
        print(f"   - {db.session.query(UserRole).count()} asignaciones usuario-rol")
        print(f"   - {RolePermission.query.count()} relaciones rol-permiso")

if __name__ == '__main__':
    create_relations_data()

