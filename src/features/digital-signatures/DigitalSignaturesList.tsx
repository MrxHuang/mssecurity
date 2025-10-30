import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';

type DigitalSignature = {
  id: number;
  user_id: number;
  photo: string;
};

const DigitalSignaturesList: React.FC = () => {
  const [rows, setRows] = useState<DigitalSignature[]>([]);

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/digital-signatures/');
      setRows(data);
    } catch (err) {
      alert('Error al cargar las firmas digitales');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: DigitalSignature) => {
    if (!confirm('¿Eliminar esta firma digital?')) return;
    try {
      await apiClient.delete(`/api/digital-signatures/${row.id}`);
      await load();
    } catch (err) {
      alert('Error al eliminar la firma digital');
    }
  };

  return (
    <GenericList
      title="Firmas Digitales"
      subtitle={`${rows.length} ${rows.length === 1 ? 'firma' : 'firmas'} • Relación 1:1 con Usuario`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'user_id', label: 'ID Usuario', render: (row) => `Usuario #${row.user_id}` },
        { key: 'photo', label: 'Imagen', render: (row) => (
          <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {row.photo}
          </span>
        )}
      ]}
      onDelete={handleDelete}
      createPath="/digital-signatures/new"
      editPath={(sig) => `/digital-signatures/${sig.id}`}
      emptyMessage="No hay firmas registradas"
    />
  );
};

export default DigitalSignaturesList;


