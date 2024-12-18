import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.secondary',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              О нас
            </Typography>
            <Typography variant="body2" color="text.secondary">
              E-Shop - официальный магазин техники Apple в России. Мы предлагаем широкий ассортимент продукции Apple с официальной гарантией.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@eshop.ru
            </Typography>
            <Typography variant="body2" paragraph>
              Телефон: +7 (999) 123-45-67
            </Typography>
            <Typography variant="body2">
              Адрес: г. Москва, ул. Примерная, д. 1
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Аккаунт
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/profile')}
                    sx={{ textAlign: 'left' }}
                  >
                    Мой профиль
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/orders')}
                    sx={{ textAlign: 'left' }}
                  >
                    Мои заказы
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleLogout}
                    sx={{ textAlign: 'left', color: 'error.main' }}
                  >
                    Выйти
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/login')}
                    sx={{ textAlign: 'left' }}
                  >
                    Войти
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/register')}
                    sx={{ textAlign: 'left' }}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} E-Shop. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 