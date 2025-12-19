import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Breadcrumbs, Button, Chip, Divider, Tabs, Tab } from '@mui/material';
import productsData from '../data/products.json';
import { Product } from '../entities/product/types';
import ProductGallery from '../entities/product/ProductGallery';
import { useCartStore } from '../features/cart/cartStore';
import ProductCard from '../entities/product/ProductCard';
import SEO from '../shared/ui/SEO';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === slug) as Product | undefined;
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5">Товар не найден</Typography>
      </Container>
    );
  }
  const handleAddToCart = () => {
    addItem({ id: product.id, title: product.title, price: product.price });
  };
  const similar = productsData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);


  const baseDescParts: string[] = [];

  if (product.attributes.heightCm) baseDescParts.push(`Высота ${product.attributes.heightCm} см`);
  if (product.attributes.diameterCm) baseDescParts.push(`Диаметр ${product.attributes.diameterCm} см`);
  if (product.attributes.type) baseDescParts.push(`Тип: ${product.attributes.type}`);
  if (product.attributes.material) baseDescParts.push(`Материал: ${product.attributes.material}`);

  const shortDesc =
    product.shortDesc ||
    `${product.title}. ${baseDescParts.join(', ')}. Доставка по Ташкенту и регионам.`;

  const availability =
    product.attributes.stock === 'in_stock'
      ? 'instock'
      : product.attributes.stock === 'preorder'
        ? 'preorder'
        : 'outofstock';

  const keywords = [
    product.title,
    product.category,
    product.attributes.type,
    product.attributes.material,
    'декоративные деревья',
    'Ташкент',
    'купить',
    'доставка',
  ]
    .filter(Boolean)
    .join(', ');

  const imageForSeo = product.images?.[0] || '/assets/tree1.png';
  return (
    <>
      <SEO
        title={`${product.title} — купить в Ташкенте | Декоративные деревья`}
        description={shortDesc}
        keywords={keywords}
        type="product"
        image={imageForSeo}
        url={`/product/${product.slug}`}
        canonical={`/product/${product.slug}`}
        productPrice={product.price}
        productCurrency={product.currency || 'UZS'}
        productAvailability={availability}
      />

      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Typography color="text.primary">{product.title}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <ProductGallery images={product.images} />
            </Box>
            <Box sx={{ flex: 1, position: { md: 'sticky' }, top: 80 }}>
              <Typography variant="h5" color="primary.main" gutterBottom>
                {product.price.toLocaleString()} {product.currency}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {product.attributes.stock === 'in_stock'
                  ? 'В наличии'
                  : product.attributes.stock === 'preorder'
                    ? 'Предзаказ'
                    : 'Нет в наличии'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={handleAddToCart} disabled={product.attributes.stock === 'out_of_stock'}>
                  В корзину
                </Button>
                <Button variant="outlined" onClick={() => navigate('/checkout', { state: { productId: product.id } })}>
                  Оставить заявку
                </Button>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1">Характеристики</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                  {product.attributes.heightCm && (
                    <Typography variant="body2">Высота: {product.attributes.heightCm} см</Typography>
                  )}
                  {product.attributes.diameterCm && (
                    <Typography variant="body2">Диаметр: {product.attributes.diameterCm} см</Typography>
                  )}
                  <Typography variant="body2">Тип: {product.attributes.type}</Typography>
                  <Typography variant="body2">Материал: {product.attributes.material}</Typography>
                  {product.attributes.color && <Typography variant="body2">Цвет: {product.attributes.color}</Typography>}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Tabs for description and additional info */}
          <Box sx={{ mt: 6 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Описание" />
              <Tab label="Доставка и оплата" />
              <Tab label="Уход" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {tab === 0 && <Typography variant="body1">{product.fullDesc}</Typography>}
              {tab === 1 && (
                <Typography variant="body1">
                  Мы доставляем товары по Ташкенту и регионам. Оплата производится наличными или переводом.
                </Typography>
              )}
              {tab === 2 && <Typography variant="body1">{product.attributes.care}</Typography>}
            </Box>
          </Box>
          {similar.length > 0 && (
            <Box sx={{ mt: 8 }}>
              <Typography variant="h5" gutterBottom>
                Похожие товары
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                {similar.map((p) => (
                  <ProductCard product={p} key={p.id} />
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductPage;