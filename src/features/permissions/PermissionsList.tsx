import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type Permission = {
  id: number;
  name: string;
  description?: string;
};

const PermissionsList: React.FC = () => {
  const [rows, setRows] = useState<Permission[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/permissions/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar los permisos');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: Permission) => {
    if (!confirm('¿Eliminar este permiso?')) return;
    try {
      await apiClient.delete(`/api/permissions/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar el permiso');
    }
  };

  return (
    <GenericList
      title="Permisos"
      subtitle={`${rows.length} ${rows.length === 1 ? 'permiso' : 'permisos'}`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'name', label: 'Nombre' },
        { key: 'description', label: 'Descripción' }
      ]}
      onDelete={handleDelete}
      createPath="/permissions/new"
      editPath={(p) => `/permissions/${p.id}`}
      emptyMessage="No hay permisos registrados"
    />
  );
};

export default PermissionsList;


