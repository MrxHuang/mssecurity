import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useUiLibrary } from '../../context/UiLibraryContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  title: string;
  subtitle: string;
  data: T[];
  columns: Column<T>[];
  onDelete: (row: T) => void;
  createPath: string;
  editPath: (row: T) => string;
  emptyMessage?: string;
};

function GenericList<T extends { id: string | number }>({
  title,
  subtitle,
  data,
  columns,
  onDelete,
  createPath,
  editPath,
  emptyMessage = 'No hay datos registrados'
}: Props<T>) {
  const navigate = useNavigate();
  const { library } = useUiLibrary();

  const containerStyle = library === 'bootstrap' 
    ? { background: '#fff', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }
    : library === 'mui'
    ? { background: '#fff', border: 'none', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
    : { background: '#fff', border: '2px solid #e5e5e5', borderRadius: '12px', overflow: 'hidden' };

  const buttonStyle = library === 'bootstrap'
    ? { padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }
    : library === 'mui'
    ? { padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' as const }
    : { padding: '10px 20px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' };

  const thStyle = (align: 'left' | 'right' = 'left') => ({
    padding: library === 'mui' ? '16px 24px' : '12px 24px',
    textAlign: align,
    fontSize: library === 'bootstrap' ? '13px' : '12px',
    fontWeight: library === 'mui' ? '700' : '600',
    color: library === 'bootstrap' ? '#495057' : library === 'mui' ? '#1976d2' : '#666',
    textTransform: 'uppercase' as const,
    letterSpacing: library === 'bootstrap' ? '0' : '0.5px'
  });

  return (
    <Layout>
      <div style={containerStyle}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a1a1a',
              letterSpacing: '-0.3px'
            }}>
              {title}
            </h3>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '13px',
              color: '#666'
            }}>
              {subtitle}
            </p>
          </div>
          <button
            onClick={() => navigate(createPath)}
            style={{
              ...buttonStyle,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (library === 'bootstrap') {
                e.currentTarget.style.background = '#218838';
              } else if (library === 'mui') {
                e.currentTarget.style.background = '#1565c0';
              } else {
                e.currentTarget.style.background = '#2a2a2a';
              }
            }}
            onMouseLeave={(e) => {
              if (library === 'bootstrap') {
                e.currentTarget.style.background = '#28a745';
              } else if (library === 'mui') {
                e.currentTarget.style.background = '#1976d2';
              } else {
                e.currentTarget.style.background = '#1a1a1a';
              }
            }}
          >
            <Plus size={16} />
            {library === 'mui' ? title.split(' ')[0] : `Crear ${title.split(' ')[0]}`}
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ background: library === 'bootstrap' ? '#e9ecef' : library === 'mui' ? '#f5f5f5' : '#fafafa' }}>
                {columns.map((col, idx) => (
                  <th key={String(col.key)} style={thStyle(idx === columns.length - 1 ? 'right' : 'left')}>
                    {col.label}
                  </th>
                ))}
                <th style={thStyle('right')}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderTop: '1px solid #f0f0f0',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fafafa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      color: col.key === 'id' ? '#666' : '#1a1a1a',
                      fontWeight: col.key === 'id' ? '400' : '500'
                    }}>
                      {col.render ? col.render(row) : String(row[col.key as keyof T] || '')}
                    </td>
                  ))}
                  <td style={{
                    padding: '16px 24px',
                    textAlign: 'right'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => navigate(editPath(row))}
                        style={{
                          padding: library === 'mui' ? '8px 16px' : '6px 12px',
                          background: library === 'bootstrap' ? '#007bff' : library === 'mui' ? '#1976d2' : '#f0f0f0',
                          border: library === 'bootstrap' || library === 'mui' ? 'none' : '1px solid #e5e5e5',
                          borderRadius: library === 'mui' ? '16px' : '6px',
                          fontSize: '13px',
                          color: library === 'bootstrap' || library === 'mui' ? '#fff' : '#1a1a1a',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: library === 'bootstrap' ? '600' : '400',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          if (library === 'bootstrap') e.currentTarget.style.background = '#0056b3';
                          else if (library === 'mui') e.currentTarget.style.background = '#1565c0';
                          else e.currentTarget.style.background = '#e5e5e5';
                        }}
                        onMouseLeave={(e) => {
                          if (library === 'bootstrap') e.currentTarget.style.background = '#007bff';
                          else if (library === 'mui') e.currentTarget.style.background = '#1976d2';
                          else e.currentTarget.style.background = '#f0f0f0';
                        }}
                      >
                        <Edit size={14} />
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        style={{
                          padding: library === 'mui' ? '8px 16px' : '6px 12px',
                          background: library === 'bootstrap' ? '#dc3545' : library === 'mui' ? '#d32f2f' : '#fff',
                          border: library === 'bootstrap' || library === 'mui' ? 'none' : '1px solid #ffdddd',
                          borderRadius: library === 'mui' ? '16px' : '6px',
                          fontSize: '13px',
                          color: library === 'bootstrap' || library === 'mui' ? '#fff' : '#cc0000',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: library === 'bootstrap' ? '600' : '400',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          if (library === 'bootstrap') e.currentTarget.style.background = '#c82333';
                          else if (library === 'mui') e.currentTarget.style.background = '#c62828';
                          else { e.currentTarget.style.background = '#fff5f5'; e.currentTarget.style.borderColor = '#ffcccc'; }
                        }}
                        onMouseLeave={(e) => {
                          if (library === 'bootstrap') e.currentTarget.style.background = '#dc3545';
                          else if (library === 'mui') e.currentTarget.style.background = '#d32f2f';
                          else { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#ffdddd'; }
                        }}
                      >
                        <Trash2 size={14} />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div style={{
            padding: '60px 24px',
            textAlign: 'center',
            color: '#999',
            fontSize: '14px'
          }}>
            {emptyMessage}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default GenericList;

