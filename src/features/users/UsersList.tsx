import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type User = {
  id: number;
  name: string;
  email: string;
};

const UsersList: React.FC = () => {
  const [rows, setRows] = useState<User[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/users/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar los usuarios');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: User) => {
    if (!confirm(`¿Eliminar usuario ${row.name}?`)) return;
    try {
      await apiClient.delete(`/api/users/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar el usuario');
    }
  };

  return (
    <GenericList
      title="Lista de Usuarios"
      subtitle={`${rows.length} ${rows.length === 1 ? 'usuario' : 'usuarios'}`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Email' }
      ]}
      onDelete={handleDelete}
      createPath="/users/new"
      editPath={(user) => `/users/${user.id}`}
      emptyMessage="No hay usuarios registrados"
    />
  );
};

export default UsersList;
