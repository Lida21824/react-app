import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Корзина пуста</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item, index) => (
              <Grid item key={`${item.id}-${index}`} xs={12}>
                <Card sx={{ display: 'flex', p: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="h6" color="primary">
                        {item.price} ₽
                      </Typography>
                      <Button
                        color="secondary"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Удалить
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" gutterBottom>
              Итого: {total} ₽
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/checkout')}
              disabled={cartItems.length === 0}
            >
              Оформить заказ
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart; 