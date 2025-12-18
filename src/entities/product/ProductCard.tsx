import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
  Stack,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AddShoppingCart as AddIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { Product } from './types';
import { useCartStore } from '../../features/cart/cartStore';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, title: product.title, price: product.price });
  };

  const stockLabel = {
    in_stock: t('products.inStock'),
    preorder: t('products.preorder'),
    out_of_stock: t('products.outOfStock'),
  }[product.attributes.stock];

  const stockColor = {
    in_stock: 'success',
    preorder: 'warning',
    out_of_stock: 'error',
  }[product.attributes.stock] as 'success' | 'warning' | 'error';

  return (
    <Card
      component={Link}
      to={`/product/${product.slug}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Tags */}
      {product.tags.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
          }}
        >
          {product.tags.includes('hit') && (
            <Chip label="HIT" size="small" color="primary" sx={{ fontWeight: 600 }} />
          )}
          {product.tags.includes('new') && (
            <Chip label="NEW" size="small" color="secondary" sx={{ fontWeight: 600 }} />
          )}
          {product.tags.includes('sale') && (
            <Chip label="SALE" size="small" color="warning" sx={{ fontWeight: 600 }} />
          )}
        </Box>
      )}

      {/* Image */}
      <CardMedia
        component="div"
        sx={{
          paddingTop: '75%',
          position: 'relative',
          bgcolor: alpha('#1F6B3B', 0.03),
          backgroundImage: `url(${product.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.3,
            mb: 1,
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.shortDesc}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
          {product.attributes.heightCm && (
            <Chip
              label={`${t('products.height')}: ${product.attributes.heightCm} см`}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 1.5 }}
            />
          )}
          <Chip
            label={stockLabel}
            size="small"
            color={stockColor}
            variant="outlined"
            sx={{ borderRadius: 1.5, fontWeight: 500 }}
          />
        </Stack>

        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: 700, fontSize: '1.375rem' }}
        >
          {product.price.toLocaleString()} {t('common.currency')}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ViewIcon />}
          sx={{
            flex: 1,
            mr: 1,
          }}
        >
          {t('common.details')}
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={product.attributes.stock === 'out_of_stock'}
          sx={{
            flex: 1,
          }}
        >
          {t('common.addToCart')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;