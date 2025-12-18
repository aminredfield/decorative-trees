import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from './types';
import { useCartStore } from '@features/cart/cartStore';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({ id: product.id, title: product.title, price: product.price });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 1, '&:hover': { boxShadow: 4 } }}>
      <CardMedia
        component={Link}
        to={`/product/${product.slug}`}
        sx={{ height: 0, paddingTop: '56.25%', position: 'relative' }}
        image={product.images[0]}
        title={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component={Link} to={`/product/${product.slug}`} sx={{ textDecoration: 'none', color: 'text.primary' }}>
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {product.attributes.heightCm && (
            <Typography variant="body2" color="text.secondary">
              Высота: {product.attributes.heightCm} см
            </Typography>
          )}
          {product.attributes.type && (
            <Typography variant="body2" color="text.secondary">
              Тип: {product.attributes.type}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Typography variant="subtitle1" color="primary.main">
          {product.price.toLocaleString()} {product.currency}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={Link} to={`/product/${product.slug}`} variant="outlined" size="small">
            Подробнее
          </Button>
          <Button variant="contained" size="small" onClick={handleAdd} disabled={product.attributes.stock === 'out_of_stock'}>
            В корзину
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;