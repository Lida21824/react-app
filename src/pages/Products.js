import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Container, TextField, Box, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'mac', label: 'Mac' },
    { id: 'ipad', label: 'iPad' },
    { id: 'watch', label: 'Watch' },
    { id: 'accessories', label: 'Аксессуары' },
  ];

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'iPhone 14 Pro',
        price: 99990,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896',
        description: 'iPhone 14 Pro с технологией Dynamic Island и передовой системой камер',
        category: 'iphone'
      },
      {
        id: 2,
        name: 'MacBook Air M2',
        price: 129990,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
        description: 'Невероятно тонкий и легкий ноутбук с чипом M2',
        category: 'mac'
      },
      {
        id: 3,
        name: 'iPad Pro 12.9"',
        price: 109990,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1664411207213',
        description: 'iPad Pro с дисплеем Liquid Retina XDR и чипом M2',
        category: 'ipad'
      },
      {
        id: 4,
        name: 'AirPods Pro',
        price: 24990,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1660803972361',
        description: 'Активное шумоподавление и адаптивный прозрачный режим',
        category: 'accessories'
      },
      {
        id: 5,
        name: 'Apple Watch Ultra',
        price: 79990,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO?wid=2000&hei=2000&fmt=png-alpha&.v=1683224241054',
        description: 'Самые прочные и функциональные Apple Watch для экстремальных условий',
        category: 'watch'
      },
      {
        id: 6,
        name: 'HomePod mini',
        price: 12990,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-orange-202110?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1632925511000',
        description: 'Компактная умная колонка с потрясающим звучанием',
        category: 'accessories'
      }
    ]);
  }, []);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Поиск товаров"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.label}
              onClick={() => setSelectedCategory(category.id)}
              color={selectedCategory === category.id ? 'primary' : 'default'}
              variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              sx={{
                fontSize: '1rem',
                py: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 280,
                  objectFit: 'contain',
                  padding: 2,
                  backgroundColor: '#f5f5f7',
                }}
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 500 }}>
                  {product.name}
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    minHeight: '3em',
                    lineHeight: 1.5,
                  }}
                >
                  {product.description}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                >
                  {product.price.toLocaleString()} ₽
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                {isAuthenticated ? (
                  <Button 
                    size="large" 
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      py: 1,
                    }}
                  >
                    В корзину
                  </Button>
                ) : (
                  <Button 
                    size="large" 
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/login')}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      py: 1,
                    }}
                  >
                    Войти для покупки
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {filteredProducts.length === 0 && (
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            mt: 4,
            color: 'text.secondary',
          }}
        >
          Товары не найдены
        </Typography>
      )}
    </Container>
  );
};

export default Products; 