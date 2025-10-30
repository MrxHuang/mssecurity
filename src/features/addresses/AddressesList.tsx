import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type Address = {
  id: number;
  user_id: number;
  street: string;
  city: string;
  country: string;
};

const AddressesList: React.FC = () => {
  const [rows, setRows] = useState<Address[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/addresses/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar las direcciones');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: Address) => {
    if (!confirm('¿Eliminar esta dirección?')) return;
    try {
      await apiClient.delete(`/api/addresses/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar la dirección');
    }
  };

  return (
    <GenericList
      title="Direcciones"
      subtitle={`${rows.length} ${rows.length === 1 ? 'dirección' : 'direcciones'} • Relación 1:1 con Usuario`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'user_id', label: 'ID Usuario', render: (row) => `Usuario #${row.user_id}` },
        { key: 'street', label: 'Calle' },
        { key: 'city', label: 'Ciudad' },
        { key: 'country', label: 'País' }
      ]}
      onDelete={handleDelete}
      createPath="/addresses/new"
      editPath={(address) => `/addresses/${address.id}`}
      emptyMessage="No hay direcciones registradas"
    />
  );
};

export default AddressesList;


