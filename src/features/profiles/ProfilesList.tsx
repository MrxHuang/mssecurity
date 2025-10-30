import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type Profile = {
  id: number;
  user_id: number;
  phone: string;
  photo: string;
};

const ProfilesList: React.FC = () => {
  const [rows, setRows] = useState<Profile[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/profiles/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar los perfiles');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: Profile) => {
    if (!confirm('¿Eliminar este perfil?')) return;
    try {
      await apiClient.delete(`/api/profiles/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar el perfil');
    }
  };

  return (
    <GenericList
      title="Perfiles de Usuario"
      subtitle={`${rows.length} ${rows.length === 1 ? 'perfil' : 'perfiles'} • Relación 1:1 con Usuario`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'user_id', label: 'ID Usuario', render: (row) => `Usuario #${row.user_id}` },
        { key: 'phone', label: 'Teléfono' },
        { key: 'photo', label: 'Foto', render: (row) => (
          <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {row.photo}
          </span>
        )}
      ]}
      onDelete={handleDelete}
      createPath="/profiles/new"
      editPath={(profile) => `/profiles/${profile.id}`}
      emptyMessage="No hay perfiles registrados"
    />
  );
};

export default ProfilesList;
