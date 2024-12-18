import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { ordersAPI } from '../services/api';
import OrderStatus from '../components/OrderStatus';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Ожидает обработки';
    case 'processing':
      return 'В обработке';
    case 'shipped':
      return 'Отправлен';
    case 'delivered':
      return 'Доставлен';
    case 'cancelled':
      return 'Отменён';
    default:
      return status;
  }
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const [prevStatus, setPrevStatus] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersAPI.getById(id);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (prevStatus && order && prevStatus !== order.status) {
      dispatch(addNotification({
        type: 'info',
        message: `Статус заказа изменен на "${getStatusText(order.status)}"`,
      }));
    }
    if (order) {
      setPrevStatus(order.status);
    }
  }, [order, prevStatus, dispatch]);

  if (!order) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">
                Заказ №{order._id}
              </Typography>
              <OrderStatus status={order.status} />
            </Box>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              от {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Информация о доставке
            </Typography>
            <Typography>
              Адрес: {order.shippingAddress}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Сумма заказа
            </Typography>
            <Typography variant="h5" color="primary">
              {order.totalAmount} ₽
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Товары
            </Typography>
            <List>
              {order.items.map((item) => (
                <ListItem key={item.product._id}>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`${item.quantity} шт. × ${item.price} ₽`}
                  />
                  <Typography variant="body1">
                    {item.quantity * item.price} ₽
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderDetails; 