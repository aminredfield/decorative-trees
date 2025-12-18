import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import productsData from '@data/products.json';
import ProductCard from '@entities/product/ProductCard';

const CatalogPage: React.FC = () => {
  const [sort, setSort] = useState('popular');

  const sorted = [...productsData].sort((a, b) => {
    switch (sort) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'new':
        // using id as recency proxy
        return Number(b.id) - Number(a.id);
      default:
        return 0;
    }
  });

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Каталог
        </Typography>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="sort-label">Сортировка</InputLabel>
            <Select
              labelId="sort-label"
              value={sort}
              label="Сортировка"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="popular">Популярные</MenuItem>
              <MenuItem value="priceAsc">Дешевле</MenuItem>
              <MenuItem value="priceDesc">Дороже</MenuItem>
              <MenuItem value="new">Новые</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {sorted.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CatalogPage;