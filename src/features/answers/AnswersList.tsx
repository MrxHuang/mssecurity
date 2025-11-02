import React, { useEffect, useState } from 'react';
import apiClient from '../../lib/api';
import GenericList from '../../components/generic/GenericList';
import { useNotifications } from '../../utils/notifications';

type Answer = {
  id: number;
  user_id: number;
  security_question_id: number;
  content: string;
};

const AnswersList: React.FC = () => {
  const [rows, setRows] = useState<Answer[]>([]);
  const { showError, showSuccess } = useNotifications();

  const load = async () => {
    try {
      const { data } = await apiClient.get('/api/answers/');
      setRows(data);
    } catch (err) {
      showError('Error al cargar las respuestas');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (row: Answer) => {
    if (!confirm('¿Eliminar esta respuesta?')) return;
    try {
      await apiClient.delete(`/api/answers/${row.id}`);
      showSuccess('Respuesta eliminada correctamente');
      await load();
    } catch (err) {
      showError('Error al eliminar la respuesta');
    }
  };

  return (
    <GenericList
      title="Respuestas de Seguridad"
      subtitle={`${rows.length} ${rows.length === 1 ? 'respuesta' : 'respuestas'} • N:N Usuarios ↔ Preguntas`}
      data={rows}
      columns={[
        { key: 'id', label: 'ID', render: (row) => `#${row.id}` },
        { key: 'user_id', label: 'Usuario', render: (row) => `Usuario #${row.user_id}` },
        { key: 'security_question_id', label: 'Pregunta', render: (row) => `Pregunta #${row.security_question_id}` },
        { key: 'content', label: 'Respuesta' }
      ]}
      onDelete={handleDelete}
      createPath="/answers/new"
      editPath={(a) => `/answers/${a.id}`}
      emptyMessage="No hay respuestas registradas"
    />
  );
};

export default AnswersList;


