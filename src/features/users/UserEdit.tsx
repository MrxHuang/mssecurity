import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../lib/api';
import GenericForm from '../../components/generic/GenericForm';

type UserInput = {
  name: string;
  email: string;
};

const UserEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [value, setValue] = useState<UserInput>({ name: '', email: '' });

  useEffect(() => {
    if (!isNew) {
      (async () => {
        try {
          const { data } = await apiClient.get(`/api/users/${id}`);
          setValue({ name: data.name, email: data.email });
        } catch (err) {
          alert('Error al cargar el usuario');
        }
      })();
    }
  }, [id, isNew]);

  const save = async () => {
    try {
      if (isNew) {
        await apiClient.post('/api/users/', value);
      } else {
        await apiClient.put(`/api/users/${id}`, value);
      }
      navigate('/users');
    } catch (err) {
      alert('Error al guardar. Verifica los datos.');
    }
  };

  return (
    <GenericForm
      title={isNew ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
      subtitle={isNew ? 'Ingresa los datos del nuevo usuario' : 'Modifica la información del usuario'}
      fields={[
        { name: 'name', label: 'Nombre completo', type: 'text' as const, required: true, placeholder: 'Ingresa el nombre completo' },
        { name: 'email', label: 'Correo electrónico', type: 'email' as const, required: true, placeholder: 'usuario@ejemplo.com' }
      ]}
      value={value}
      onChange={setValue}
      onSubmit={save}
      onCancel={() => navigate('/users')}
      isNew={isNew}
      submitLabel={isNew ? 'Crear Usuario' : 'Guardar Cambios'}
    />
  );
};

export default UserEdit;
