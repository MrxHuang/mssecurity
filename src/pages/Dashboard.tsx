import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useUiLibrary } from '../context/UiLibraryContext';
import { Users, FileText, Lock, Shield, UserPlus, FilePlus, Key, Target } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { library } = useUiLibrary();
  const cards = [
    { 
      to: '/users', 
      title: 'Usuarios', 
      desc: 'Gestión de usuarios del sistema',
      count: '3',
      icon: Users,
      color: '#1a1a1a'
    },
    { 
      to: '/profiles', 
      title: 'Perfiles', 
      desc: 'Perfiles de usuario (1:1)',
      count: '3',
      icon: FileText,
      color: '#2a2a2a'
    },
    { 
      to: '/sessions', 
      title: 'Sesiones', 
      desc: 'Sesiones activas (1:N)',
      count: '6',
      icon: Lock,
      color: '#3a3a3a'
    },
    { 
      to: '/user-roles', 
      title: 'Roles', 
      desc: 'Asignación de roles (N:N)',
      count: '3',
      icon: Shield,
      color: '#4a4a4a'
    },
  ];

  const getCardStyle = () => {
    if (library === 'bootstrap') {
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '8px',
        color: '#fff'
      };
    } else if (library === 'mui') {
      return {
        background: '#fff',
        border: 'none',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      };
    } else {
      return {
        background: '#fff',
        border: '2px solid #e5e5e5',
        borderRadius: '12px'
      };
    }
  };

  return (
    <Layout>
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {cards.map((card) => (
          <Link 
            key={card.to} 
            to={card.to} 
            style={{ 
              textDecoration: 'none',
              ...getCardStyle(),
              padding: '24px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (library === 'bootstrap') {
                e.currentTarget.style.transform = 'scale(1.05)';
              } else if (library === 'mui') {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-8px)';
              } else {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#3b82f6';
              }
            }}
            onMouseLeave={(e) => {
              if (library === 'bootstrap') {
                e.currentTarget.style.transform = 'scale(1)';
              } else if (library === 'mui') {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              } else {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e5e5';
              }
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div style={{
                lineHeight: 1
              }}>
                <card.icon 
                  size={32} 
                  color={library === 'bootstrap' ? '#fff' : '#1a1a1a'} 
                />
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: library === 'bootstrap' ? '#fff' : '#1a1a1a',
                letterSpacing: '-1px'
              }}>
                {card.count}
              </div>
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              color: library === 'bootstrap' ? '#fff' : '#1a1a1a',
              marginBottom: '4px',
              letterSpacing: '-0.3px'
            }}>
              {card.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: library === 'bootstrap' ? 'rgba(255,255,255,0.9)' : '#666',
              lineHeight: '1.4'
            }}>
              {card.desc}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: library === 'bootstrap' ? '#f8f9fa' : '#fff',
        border: library === 'mui' ? 'none' : '1px solid #e5e5e5',
        borderRadius: library === 'mui' ? '16px' : '12px',
        padding: '24px',
        boxShadow: library === 'mui' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1a1a1a',
          letterSpacing: '-0.3px'
        }}>
          Acciones Rápidas
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {[
            { to: '/users/new', label: 'Crear Usuario', icon: UserPlus },
            { to: '/profiles/new', label: 'Crear Perfil', icon: FilePlus },
            { to: '/sessions/new', label: 'Nueva Sesión', icon: Key },
            { to: '/user-roles/new', label: 'Asignar Rol', icon: Target },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: library === 'bootstrap' ? '#007bff' : library === 'mui' ? '#1976d2' : '#fafafa',
                border: library === 'tailwind' ? '1px solid #e5e5e5' : 'none',
                borderRadius: library === 'mui' ? '20px' : '8px',
                textDecoration: 'none',
                color: library === 'bootstrap' || library === 'mui' ? '#fff' : '#1a1a1a',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (library === 'bootstrap') {
                  e.currentTarget.style.background = '#0056b3';
                } else if (library === 'mui') {
                  e.currentTarget.style.background = '#1565c0';
                } else {
                  e.currentTarget.style.background = '#f0f0f0';
                  e.currentTarget.style.borderColor = '#d0d0d0';
                }
              }}
              onMouseLeave={(e) => {
                if (library === 'bootstrap') {
                  e.currentTarget.style.background = '#007bff';
                } else if (library === 'mui') {
                  e.currentTarget.style.background = '#1976d2';
                } else {
                  e.currentTarget.style.background = '#fafafa';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }
              }}
            >
              <action.icon size={18} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;


