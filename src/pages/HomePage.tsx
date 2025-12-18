import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper, TextField, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import productsData from '@data/products.json';
import ProductCard from '@entities/product/ProductCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const products = productsData.slice(0, 4);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In MVP we don't actually send anywhere; this would call the API
    alert('Спасибо! Мы свяжемся с вами.');
  };
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                Декоративные деревья для вашего пространства
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Украсьте дом или офис живыми и искусственными деревьями премиум‑класса.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" size="large" onClick={() => navigate('/catalog')}>
                  Перейти в каталог
                </Button>
                <Button variant="outlined" size="large" component={Link} to="/checkout">
                  Консультация
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', pt: '75%' }}>
                <img
                  src="/assets/tree5.png"
                  alt="Hero"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Popular Products */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Популярные товары
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" component={Link} to="/catalog">
              Смотреть весь каталог
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Contact form */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'surface' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom textAlign="center">
            Оставьте заявку
          </Typography>
          <Paper sx={{ p: 3 }} elevation={2}>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
              <TextField label="Имя" name="name" required fullWidth />
              <TextField label="Телефон" name="phone" required fullWidth />
              <TextField label="Комментарий" name="comment" multiline rows={3} fullWidth />
              <Button type="submit" variant="contained">Отправить</Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;