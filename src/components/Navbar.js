import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        >
          E-Shop
        </Typography>

        <Button color="inherit" onClick={() => navigate('/products')}>
          Каталог
        </Button>

        {isAuthenticated ? (
          <>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {user?.name}
              </Typography>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Person />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigate('/profile')}>
                Профиль
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/orders')}>
                Мои заказы
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 