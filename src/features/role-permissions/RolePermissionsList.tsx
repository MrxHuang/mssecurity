import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type RolePermission = {
  id: number;
  role_id: number;
  permission_id: number;
};

const RolePermissionsList: React.FC = () => {
  const [rows, setRows] = useState<RolePermission[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/role-permissions/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar la relación rol-permiso');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: RolePermission) => {
    if (!confirm('¿Eliminar esta relación rol-permiso?')) return;
    try {
      await apiClient.delete(`/api/role-permissions/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar la relación');
    }
  };

  return (
    <GenericList
      title="Roles ↔ Permisos"
      subtitle={`${rows.length} relaciones N:N`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'role_id', label: 'Rol', render: (row) => `Rol #${row.role_id}` },
        { key: 'permission_id', label: 'Permiso', render: (row) => `Permiso #${row.permission_id}` },
      ]}
      onDelete={handleDelete}
      createPath="/role-permissions/new"
      editPath={(rp) => `/role-permissions/${rp.id}`}
      emptyMessage="No hay relaciones registradas"
    />
  );
};

export default RolePermissionsList;


