import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { addOrder } from '../redux/ordersSlice';
import { addNotification } from '../redux/notificationSlice';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [shippingData, setShippingData] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    comment: '',
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingData.address.trim() || !shippingData.phone.trim()) {
      dispatch(addNotification({
        type: 'error',
        message: 'Пожалуйста, заполните адрес и телефон'
      }));
      return;
    }

    try {
      const order = {
        items: cartItems,
        total: totalAmount,
        shippingData,
        userId: user.id
      };

      dispatch(addOrder(order));
      dispatch(clearCart());
      
      dispatch(addNotification({
        type: 'success',
        message: 'Заказ успешно оформлен!'
      }));
      
      navigate('/orders');
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Произошла ошибка при оформлении заказа'
      }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Корзина пуста
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Перейти к покупкам
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Оформление заказа
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Адрес доставки"
                required
                value={shippingData.address}
                onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Телефон"
                required
                value={shippingData.phone}
                onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Комментарий к заказу"
                multiline
                rows={3}
                value={shippingData.comment}
                onChange={(e) => setShippingData({ ...shippingData, comment: e.target.value })}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Ваш заказ
            </Typography>
            {cartItems.map((item, index) => (
              <Box key={`${item.id}-${index}`} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{item.name}</Typography>
                <Typography>{item.price.toLocaleString()} ₽</Typography>
              </Box>
            ))}
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="h6">
                Итого: {totalAmount.toLocaleString()} ₽
              </Typography>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Оформить заказ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 