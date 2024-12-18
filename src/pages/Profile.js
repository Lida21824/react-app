import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Grid, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // В будущем здесь будет обновление данных на сервере
    alert('Данные успешно обновлены!');
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Личный кабинет
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => navigate('/orders')}
            >
              Мои заказы
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="h6">
                {user?.email}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Имя"
                disabled={!isEditing}
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Телефон"
                disabled={!isEditing}
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Адрес"
                multiline
                rows={3}
                disabled={!isEditing}
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button type="submit" variant="contained">
                    Сохранить
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEditing(false)}>
                    Отмена
                  </Button>
                </Box>
              ) : (
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Редактировать
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 