import { Container, Typography, Paper, Box, Grid, Chip } from '@mui/material';
import { useSelector } from 'react-redux';

const Orders = () => {
  const orders = useSelector(state => state.orders.items);
  const userId = useSelector(state => state.auth.user?.id);

  // Фильтруем заказы текущего пользователя
  const userOrders = orders.filter(order => order.userId === userId);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        История заказов
      </Typography>

      {userOrders.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>У вас пока нет заказов</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {userOrders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Заказ №{order.id}
                  </Typography>
                  <Chip 
                    label={order.status}
                    color={order.status === 'Доставлен' ? 'success' : 'primary'}
                  />
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {new Date(order.date).toLocaleDateString()}
                </Typography>
                {order.items.map((item, index) => (
                  <Box key={`${item.id}-${index}`} sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.price.toLocaleString()} ₽</Typography>
                  </Box>
                ))}
                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" align="right">
                    Итого: {order.total.toLocaleString()} ₽
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders; 