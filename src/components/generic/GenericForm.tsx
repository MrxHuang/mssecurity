import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useUiLibrary } from '../../context/UiLibraryContext';

type Field = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'date' | 'select';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
};

type Props<T> = {
  title: string;
  subtitle: string;
  fields: Field[];
  value: T;
  onChange: (value: T) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isNew: boolean;
  submitLabel?: string;
};

function GenericForm<T extends Record<string, any>>({
  title,
  subtitle,
  fields,
  value,
  onChange,
  onSubmit,
  onCancel,
  isNew,
  submitLabel
}: Props<T>) {
  const navigate = useNavigate();
  const { library } = useUiLibrary();

  const containerStyle = library === 'bootstrap'
    ? { background: '#fff', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }
    : library === 'mui'
    ? { background: '#fff', border: 'none', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
    : { background: '#fff', border: '2px solid #e5e5e5', borderRadius: '12px', overflow: 'hidden' };

  const inputStyle = () => ({
    width: '100%',
    padding: library === 'mui' ? '14px' : '12px',
    fontSize: '14px',
    border: library === 'bootstrap' ? '1px solid #ced4da' : library === 'mui' ? '1px solid #ccc' : '1px solid #e5e5e5',
    borderRadius: library === 'mui' ? '4px' : library === 'bootstrap' ? '4px' : '8px',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
    outline: 'none'
  });

  const handleInputChange = (fieldName: string, newValue: any) => {
    onChange({ ...value, [fieldName]: newValue });
  };

  return (
    <Layout>
      <div style={{ maxWidth: '600px' }}>
        <div style={containerStyle}>
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e5e5e5'
          }}>
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

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div style={{ padding: '24px' }}>
              {fields.map((field) => (
                <div key={field.name} style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    color: '#1a1a1a',
                    letterSpacing: '-0.1px'
                  }}>
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={value[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      style={{ ...inputStyle(), background: field.disabled ? '#f5f5f5' : '#fff', cursor: field.disabled ? 'not-allowed' : 'default' }}
                      required={field.required}
                      disabled={field.disabled}
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={value[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      style={{ ...inputStyle(), background: field.disabled ? '#f5f5f5' : '#fff', cursor: field.disabled ? 'not-allowed' : 'default' }}
                      required={field.required}
                      disabled={field.disabled}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div style={{
              background: library === 'bootstrap' ? '#f8f9fa' : '#fafafa',
              padding: '16px 24px',
              borderTop: '1px solid #e5e5e5',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  border: library === 'bootstrap' ? '1px solid #6c757d' : library === 'mui' ? 'none' : '1px solid #e5e5e5',
                  borderRadius: library === 'mui' ? '20px' : '8px',
                  background: library === 'bootstrap' ? '#6c757d' : library === 'mui' ? '#f5f5f5' : '#fff',
                  color: library === 'bootstrap' ? '#fff' : library === 'mui' ? '#666' : '#666',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  textTransform: library === 'mui' ? 'uppercase' as const : 'none'
                }}
                onMouseEnter={(e) => {
                  if (library === 'bootstrap') e.currentTarget.style.background = '#5a6268';
                  else if (library === 'mui') e.currentTarget.style.background = '#e0e0e0';
                  else { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.borderColor = '#d0d0d0'; }
                }}
                onMouseLeave={(e) => {
                  if (library === 'bootstrap') e.currentTarget.style.background = '#6c757d';
                  else if (library === 'mui') e.currentTarget.style.background = '#f5f5f5';
                  else { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e5e5'; }
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: library === 'mui' ? '20px' : '8px',
                  background: library === 'bootstrap' ? '#28a745' : library === 'mui' ? '#1976d2' : '#1a1a1a',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: library === 'bootstrap' ? '600' : '500',
                  transition: 'all 0.2s',
                  textTransform: library === 'mui' ? 'uppercase' as const : 'none'
                }}
                onMouseEnter={(e) => {
                  if (library === 'bootstrap') e.currentTarget.style.background = '#218838';
                  else if (library === 'mui') e.currentTarget.style.background = '#1565c0';
                  else e.currentTarget.style.background = '#2a2a2a';
                }}
                onMouseLeave={(e) => {
                  if (library === 'bootstrap') e.currentTarget.style.background = '#28a745';
                  else if (library === 'mui') e.currentTarget.style.background = '#1976d2';
                  else e.currentTarget.style.background = '#1a1a1a';
                }}
              >
                {submitLabel || (isNew ? 'Crear' : 'Guardar Cambios')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default GenericForm;

