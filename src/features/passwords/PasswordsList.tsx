import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type Password = {
  id: number;
  user_id: number;
  hash: string;
  created_at?: string;
};

const PasswordsList: React.FC = () => {
  const [rows, setRows] = useState<Password[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/passwords/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar las contraseñas');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: Password) => {
    if (!confirm('¿Eliminar este registro de contraseña?')) return;
    try {
      await apiClient.delete(`/api/passwords/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar el registro');
    }
  };

  return (
    <GenericList
      title="Historial de Contraseñas"
      subtitle={`${rows.length} registros • Relación 1:N con Usuario`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'user_id', label: 'Usuario', render: (row) => `Usuario #${row.user_id}` },
        { key: 'hash', label: 'Hash', render: (row) => (
          <span style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{row.hash}</span>
        )},
        { key: 'created_at', label: 'Creado' }
      ]}
      onDelete={handleDelete}
      createPath="/passwords/new"
      editPath={(p) => `/passwords/${p.id}`}
      emptyMessage="No hay registros de contraseñas"
    />
  );
};

export default PasswordsList;


