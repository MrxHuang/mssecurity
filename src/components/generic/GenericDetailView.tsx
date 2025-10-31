import React, { useState } from 'react';
import Layout from '../Layout';
import { useUiLibrary } from '../../context/UiLibraryContext';
import { Link } from 'react-router-dom';
import Avatar from 'boring-avatars';

type Field = {
  label: string;
  value: string | React.ReactNode;
  type?: 'text' | 'image' | 'link';
};

type Props = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageFallback?: string; // Texto para generar avatar si no hay imagen
  fields: Field[];
  editPath?: string;
  backPath?: string;
  backLabel?: string;
};

function GenericDetailView({
  title,
  subtitle,
  imageUrl,
  imageFallback,
  fields,
  editPath,
  backPath,
  backLabel = 'Volver'
}: Props) {
  const { library } = useUiLibrary();
  const [imageError, setImageError] = useState(false);

  // Colores para boring-avatars (adaptables por librería)
  const avatarColors = library === 'bootstrap'
    ? ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe']
    : library === 'mui'
    ? ['#1976d2', '#1565c0', '#0d47a1', '#42a5f5', '#64b5f6']
    : ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];
  
  const showImage = imageUrl && !imageError;
  const showAvatar = !imageUrl || imageError;

  const cardStyle = library === 'bootstrap'
    ? {
        background: '#fff',
        border: '1px solid #dee2e6',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
      }
    : library === 'mui'
    ? {
        background: '#fff',
        border: 'none',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    : {
        background: '#fff',
        border: '2px solid #e5e5e5',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      };

  const headerStyle = {
    padding: library === 'mui' ? '28px 32px' : '24px 28px',
    borderBottom: library === 'mui' ? 'none' : '1px solid #e5e5e5',
    marginBottom: library === 'mui' ? '24px' : '0'
  };

  return (
    <Layout>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ ...cardStyle, overflow: 'hidden' }}>
          {/* Header */}
          <div style={headerStyle}>
            <h2 style={{
              margin: 0,
              fontSize: library === 'mui' ? '32px' : '28px',
              fontWeight: library === 'mui' ? '700' : '600',
              color: library === 'mui' ? '#1976d2' : '#1a1a1a',
              letterSpacing: library === 'bootstrap' ? '0' : '-0.5px',
              textTransform: library === 'bootstrap' ? 'uppercase' as const : 'none'
            }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '14px',
                color: library === 'mui' ? '#666' : '#888'
              }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          <div style={{
            padding: library === 'mui' ? '32px' : '28px',
            display: 'grid',
            gridTemplateColumns: library === 'bootstrap' ? '280px 1fr' : '260px 1fr',
            gap: library === 'mui' ? '32px' : '28px',
            alignItems: 'start'
          }}>
            {/* Image/Avatar */}
            <div style={{
              width: '100%',
              aspectRatio: '1',
              background: library === 'mui' ? '#f5f5f5' : library === 'bootstrap' ? '#e9ecef' : '#f0f0f0',
              border: library === 'mui' ? 'none' : '1px solid #e5e5e5',
              borderRadius: library === 'mui' ? 16 : library === 'bootstrap' ? 8 : 12,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: library === 'mui' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}>
              {showImage ? (
                <img
                  src={imageUrl}
                  alt={title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <Avatar
                  size={library === 'mui' ? 320 : library === 'bootstrap' ? 280 : 300}
                  name={imageFallback || 'User'}
                  variant="marble"
                  colors={avatarColors}
                />
              )}
            </div>

            {/* Fields */}
            <div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: library === 'mui' ? '20px' : '16px'
              }}>
                {fields.map((field, idx) => (
                  <div key={idx} style={{
                    paddingBottom: idx < fields.length - 1 ? (library === 'mui' ? '20px' : '16px') : '0',
                    borderBottom: idx < fields.length - 1 && library !== 'mui' ? '1px solid #f0f0f0' : 'none'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: library === 'mui' ? '600' : '500',
                      textTransform: library === 'mui' ? 'uppercase' as const : 'none',
                      letterSpacing: library === 'mui' ? '0.5px' : '0',
                      color: library === 'mui' ? '#616161' : library === 'bootstrap' ? '#6c757d' : '#666',
                      marginBottom: '6px'
                    }}>
                      {field.label}
                    </div>
                    <div style={{
                      fontSize: library === 'mui' ? '16px' : '15px',
                      color: '#1a1a1a',
                      fontWeight: library === 'mui' ? '400' : '500'
                    }}>
                      {field.type === 'link' ? (
                        <Link
                          to={field.value as string}
                          style={{
                            color: library === 'mui' ? '#1976d2' : library === 'bootstrap' ? '#007bff' : '#007bff',
                            textDecoration: 'none'
                          }}
                        >
                          {field.value}
                        </Link>
                      ) : field.value || '-'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {(editPath || backPath) && (
                <div style={{
                  marginTop: library === 'mui' ? '32px' : '24px',
                  paddingTop: library === 'mui' ? '24px' : '20px',
                  borderTop: '1px solid #e5e5e5',
                  display: 'flex',
                  gap: '12px'
                }}>
                  {editPath && (
                    <Link
                      to={editPath}
                      style={{
                        padding: library === 'mui' ? '12px 24px' : '10px 20px',
                        background: library === 'bootstrap' ? '#007bff' : library === 'mui' ? '#1976d2' : '#1a1a1a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: library === 'mui' ? 24 : library === 'bootstrap' ? 6 : 8,
                        fontSize: '14px',
                        fontWeight: library === 'bootstrap' ? 600 : 500,
                        textDecoration: 'none',
                        textTransform: library === 'mui' ? 'uppercase' as const : 'none',
                        letterSpacing: library === 'mui' ? '0.5px' : '0',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        if (library === 'bootstrap') e.currentTarget.style.background = '#0056b3';
                        else if (library === 'mui') e.currentTarget.style.background = '#1565c0';
                        else e.currentTarget.style.background = '#2a2a2a';
                      }}
                      onMouseLeave={(e) => {
                        if (library === 'bootstrap') e.currentTarget.style.background = '#007bff';
                        else if (library === 'mui') e.currentTarget.style.background = '#1976d2';
                        else e.currentTarget.style.background = '#1a1a1a';
                      }}
                    >
                      Editar
                    </Link>
                  )}
                  {backPath && (
                    <Link
                      to={backPath}
                      style={{
                        padding: library === 'mui' ? '12px 24px' : '10px 20px',
                        background: library === 'bootstrap' ? '#6c757d' : library === 'mui' ? '#f5f5f5' : '#fff',
                        color: library === 'bootstrap' ? '#fff' : library === 'mui' ? '#666' : '#666',
                        border: library === 'mui' ? 'none' : '1px solid #e5e5e5',
                        borderRadius: library === 'mui' ? 24 : library === 'bootstrap' ? 6 : 8,
                        fontSize: '14px',
                        fontWeight: library === 'bootstrap' ? 600 : 500,
                        textDecoration: 'none',
                        textTransform: library === 'mui' ? 'uppercase' as const : 'none',
                        letterSpacing: library === 'mui' ? '0.5px' : '0',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        if (library === 'bootstrap') e.currentTarget.style.background = '#5a6268';
                        else if (library === 'mui') e.currentTarget.style.background = '#e0e0e0';
                        else e.currentTarget.style.background = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        if (library === 'bootstrap') e.currentTarget.style.background = '#6c757d';
                        else if (library === 'mui') e.currentTarget.style.background = '#f5f5f5';
                        else e.currentTarget.style.background = '#fff';
                      }}
                    >
                      {backLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GenericDetailView;
