import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenericForm from '../../components/generic/GenericForm';
import apiClient from '../../lib/api';

type ProfileInput = {
  phone: string;
  photo: string;
};

const ProfileUpdateMock: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = false;
  const [value, setValue] = useState<ProfileInput>({ phone: '', photo: '' });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.get(`/api/profiles/${id}`);
        setValue({ phone: data.phone || '', photo: data.photo || '' });
      } catch {
        alert('Error al cargar el perfil');
      }
    })();
  }, [id]);

  const save = async () => {
    try {
      await apiClient.put(`/api/profiles/${id}`, value);
      navigate(`/profile/${id}`);
    } catch {
      alert('Error al guardar el perfil');
    }
  };

  return (
    <GenericForm
      title={'FBC - Profile'}
      subtitle={"Editar información del perfil"}
      fields={[
        { name: 'phone', label: 'Phone', type: 'text' as const, required: true },
        { name: 'photo', label: 'Photo', type: 'text' as const, required: false, placeholder: 'ruta o URL' },
      ]}
      value={value}
      onChange={setValue}
      onSubmit={save}
      onCancel={() => navigate(`/profile/${id}`)}
      isNew={isNew}
      submitLabel={'Update'}
    />
  );
};

export default ProfileUpdateMock;


