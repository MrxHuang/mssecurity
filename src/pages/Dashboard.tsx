import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useUiLibrary } from '../context/UiLibraryContext';
import { Users, FileText, Lock, Shield, UserPlus, FilePlus, Key, Target, MapPin, CheckSquare, PenTool, Monitor, HelpCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    { 
      to: '/addresses', 
      title: 'Direcciones', 
      desc: 'Direcciones de usuarios (1:1)',
      count: '3',
      icon: MapPin,
      color: '#5a5a5a'
    },
    { 
      to: '/digital-signatures', 
      title: 'Firmas', 
      desc: 'Firmas digitales de usuarios',
      count: '3',
      icon: PenTool,
      color: '#6a6a6a'
    },
    { 
      to: '/devices', 
      title: 'Dispositivos', 
      desc: 'Dispositivos registrados',
      count: '6',
      icon: Monitor,
      color: '#7a7a7a'
    },
    { 
      to: '/passwords', 
      title: 'Contraseñas', 
      desc: 'Gestión de contraseñas',
      count: '3',
      icon: Key,
      color: '#8a8a8a'
    },
    { 
      to: '/security-questions', 
      title: 'Preguntas', 
      desc: 'Preguntas de seguridad',
      count: '9',
      icon: HelpCircle,
      color: '#9a9a9a'
    },
    { 
      to: '/answers', 
      title: 'Respuestas', 
      desc: 'Respuestas de seguridad',
      count: '9',
      icon: MessageSquare,
      color: '#aa9a9a'
    },
    { 
      to: '/roles', 
      title: 'Roles (cat.)', 
      desc: 'Categorías de roles',
      count: '3',
      icon: Shield,
      color: '#ba9a9a'
    },
    { 
      to: '/permissions', 
      title: 'Permisos', 
      desc: 'Reglas de acceso a endpoints',
      count: '9',
      icon: CheckSquare,
      color: '#ca9a9a'
    },
    { 
      to: '/role-permissions', 
      title: 'Rol ↔ Permiso', 
      desc: 'Asignación de permisos a roles',
      count: '12',
      icon: CheckSquare,
      color: '#da9a9a'
    },
  ];

  const TailwindCard = ({ card }: { card: typeof cards[0] }) => (
    <Link 
      to={card.to} 
      className="bg-white border-2 border-gray-200 rounded-xl p-6 no-underline cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="leading-none">
          <card.icon size={32} className="text-gray-900" />
        </div>
        <div className="text-3xl font-bold text-gray-900 tracking-tight">
          {card.count}
        </div>
      </div>
      <div className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">
        {card.title}
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">
        {card.desc}
      </div>
    </Link>
  );

  const BootstrapCard = ({ card }: { card: typeof cards[0] }) => (
    <Link 
      to={card.to} 
      className="card text-white text-decoration-none overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="lh-1">
            <card.icon size={32} color="#fff" />
          </div>
          <div className="fs-2 fw-bold">
            {card.count}
          </div>
        </div>
        <h5 className="card-title fw-semibold mb-1">
          {card.title}
        </h5>
        <p className="card-text text-white-50 small mb-0">
          {card.desc}
        </p>
      </div>
    </Link>
  );

  const MuiCard = ({ card }: { card: typeof cards[0] }) => {
    const StyledCard = styled(Card)(({ theme }) => ({
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: theme.shadows[8],
        transform: 'translateY(-8px)'
      }
    }));

    return (
      <Link to={card.to} className="no-underline" style={{ textDecoration: 'none' }}>
        <StyledCard>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ lineHeight: 1 }}>
                <card.icon size={32} color="#1976d2" />
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, letterSpacing: '-1px' }}>
                {card.count}
              </Typography>
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5, letterSpacing: '-0.3px' }}>
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem', lineHeight: 1.4 }}>
              {card.desc}
            </Typography>
          </CardContent>
        </StyledCard>
      </Link>
    );
  };

  const renderCards = () => {
    if (library === 'bootstrap') {
      return (
        <div className="row g-4 mb-4">
          {cards.map((card) => (
            <div key={card.to} className="col-md-6 col-lg-4 col-xl-3">
              <BootstrapCard card={card} />
            </div>
          ))}
        </div>
      );
    } else if (library === 'mui') {
      return (
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 4
          }}
        >
          {cards.map((card) => (
            <MuiCard key={card.to} card={card} />
          ))}
        </Box>
      );
    } else {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <TailwindCard key={card.to} card={card} />
          ))}
        </div>
      );
    }
  };

  return (
    <Layout>
      {renderCards()}
      {library === 'bootstrap' ? (
        <div className="card bg-light">
          <div className="card-body p-4">
            <h5 className="card-title fw-semibold mb-3">Acciones Rápidas</h5>
            <div className="row g-2">
              {[
                { to: '/users/new', label: 'Crear Usuario', icon: UserPlus },
                { to: '/profiles/new', label: 'Crear Perfil', icon: FilePlus },
                { to: '/sessions/new', label: 'Nueva Sesión', icon: Key },
                { to: '/user-roles/new', label: 'Asignar Rol', icon: Target },
                { to: '/addresses/create', label: 'Crear Dirección', icon: MapPin },
                { to: '/digital-signatures/new', label: 'Crear Firma', icon: PenTool },
                { to: '/devices/new', label: 'Registrar Dispositivo', icon: Monitor },
                { to: '/passwords/new', label: 'Nueva Contraseña', icon: Key },
                { to: '/security-questions/new', label: 'Crear Pregunta', icon: HelpCircle },
                { to: '/answers/new', label: 'Crear Respuesta', icon: MessageSquare },
                { to: '/roles/new', label: 'Crear Rol (cat.)', icon: Shield },
                { to: '/permissions/new', label: 'Crear Permiso', icon: CheckSquare },
                { to: '/role-permissions/new', label: 'Asignar Permiso', icon: CheckSquare },
              ].map((action) => (
                <div key={action.to} className="col-md-6 col-lg-4 col-xl-3">
                  <Link
                    to={action.to}
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <action.icon size={18} />
                    {action.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : library === 'mui' ? (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2.5, letterSpacing: '-0.3px' }}>
              Acciones Rápidas
            </Typography>
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 1.5
              }}
            >
              {[
                { to: '/users/new', label: 'Crear Usuario', icon: UserPlus },
                { to: '/profiles/new', label: 'Crear Perfil', icon: FilePlus },
                { to: '/sessions/new', label: 'Nueva Sesión', icon: Key },
                { to: '/user-roles/new', label: 'Asignar Rol', icon: Target },
                { to: '/addresses/create', label: 'Crear Dirección', icon: MapPin },
                { to: '/digital-signatures/new', label: 'Crear Firma', icon: PenTool },
                { to: '/devices/new', label: 'Registrar Dispositivo', icon: Monitor },
                { to: '/passwords/new', label: 'Nueva Contraseña', icon: Key },
                { to: '/security-questions/new', label: 'Crear Pregunta', icon: HelpCircle },
                { to: '/answers/new', label: 'Crear Respuesta', icon: MessageSquare },
                { to: '/roles/new', label: 'Crear Rol (cat.)', icon: Shield },
                { to: '/permissions/new', label: 'Crear Permiso', icon: CheckSquare },
                { to: '/role-permissions/new', label: 'Asignar Permiso', icon: CheckSquare },
              ].map((action) => (
                <Button
                  key={action.to}
                  component={Link}
                  to={action.to}
                  variant="contained"
                  fullWidth
                  startIcon={<action.icon size={18} />}
                  sx={{ borderRadius: '20px', textTransform: 'none' }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-5 tracking-tight">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {[
              { to: '/users/new', label: 'Crear Usuario', icon: UserPlus },
              { to: '/profiles/new', label: 'Crear Perfil', icon: FilePlus },
              { to: '/sessions/new', label: 'Nueva Sesión', icon: Key },
              { to: '/user-roles/new', label: 'Asignar Rol', icon: Target },
              { to: '/addresses/create', label: 'Crear Dirección', icon: MapPin },
              { to: '/digital-signatures/new', label: 'Crear Firma', icon: PenTool },
              { to: '/devices/new', label: 'Registrar Dispositivo', icon: Monitor },
              { to: '/passwords/new', label: 'Nueva Contraseña', icon: Key },
              { to: '/security-questions/new', label: 'Crear Pregunta', icon: HelpCircle },
              { to: '/answers/new', label: 'Crear Respuesta', icon: MessageSquare },
              { to: '/roles/new', label: 'Crear Rol (cat.)', icon: Shield },
              { to: '/permissions/new', label: 'Crear Permiso', icon: CheckSquare },
              { to: '/role-permissions/new', label: 'Asignar Permiso', icon: CheckSquare },
            ].map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg no-underline text-gray-900 text-sm font-medium transition-all hover:bg-gray-100 hover:border-gray-300"
              >
                <action.icon size={18} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;


