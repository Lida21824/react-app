import { Container, Typography, Box, Button, Grid, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, Security, Support, Payment } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Быстрая доставка',
      description: 'Доставка по всей России от 1 до 3 дней'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Гарантия качества',
      description: 'Официальная гарантия на всю продукцию'
    },
    {
      icon: <Support sx={{ fontSize: 40 }} />,
      title: '24/7 Поддержка',
      description: 'Круглосуточная поддержка клиентов'
    },
    {
      icon: <Payment sx={{ fontSize: 40 }} />,
      title: 'Безопасная оплата',
      description: 'Защищенные платежи и возврат средств'
    }
  ];

  const newProducts = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896',
      price: '99 990 ₽'
    },
    {
      id: 2,
      name: 'MacBook Air M2',
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      price: '129 990 ₽'
    },
    {
      id: 3,
      name: 'iPad Pro 12.9"',
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1664411207213',
      price: '109 990 ₽'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(45deg, #2E7D32 30%, #388E3C 90%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 4
            }}
          >
            E-Shop
          </Typography>
          <Typography variant="h5" paragraph>
            Официальный магазин техники Apple в России
          </Typography>
          <Box sx={{ mt: 4 }}>
            {isAuthenticated ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
              >
                Перейти к покупкам
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
              >
                Войти для покупок
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* New Products Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Новые поступления
        </Typography>
        <Grid container spacing={4}>
          {newProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => navigate('/products')}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 250,
                    objectFit: 'contain',
                    p: 2,
                    bgcolor: '#f5f5f7',
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Готовы сделать покупку?
          </Typography>
          <Typography variant="h6" paragraph color="text.secondary">
            Зарегистрируйтесь и получите скидку 5% на первый заказ
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Начать покупки
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 