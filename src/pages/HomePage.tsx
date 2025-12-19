import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Stack,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  LocalShipping as DeliveryIcon,
  VerifiedUser as QualityIcon,
  Support as SupportIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import productsData from '../data/products.json';
import ProductCard from '../entities/product/ProductCard';
import { useTelegramLead } from '../shared/hooks/useTelegramLead';
import SEO from '../shared/ui/SEO';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const products = productsData.slice(0, 4);

  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Используем единый хук для отправки
  const { isSubmitting, isSuccess, error, submitLead, reset } = useTelegramLead();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setSnackbar({
        open: true,
        message: 'Пожалуйста, заполните обязательные поля',
        severity: 'error'
      });
      return;
    }

    await submitLead({
      contact: {
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment || undefined,
      },
      meta: {
        source: 'home_page_contact_form',
      },
    });
  };

  // Обработка успешной отправки
  useEffect(() => {
    if (isSuccess) {
      setSnackbar({
        open: true,
        message: t('contact.success'),
        severity: 'success'
      });
      setFormData({ name: '', phone: '', comment: '' });
      // Сброс состояния хука через 3 секунды
      setTimeout(() => reset(), 3000);
    }
  }, [isSuccess, t, reset]);

  // Обработка ошибки
  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: 'Произошла ошибка. Попробуйте позже.',
        severity: 'error'
      });
    }
  }, [error]);

  const advantages = [
    {
      icon: <DeliveryIcon sx={{ fontSize: 40 }} />,
      title: t('advantages.delivery.title'),
      desc: t('advantages.delivery.desc'),
      color: theme.palette.primary.light,
    },
    {
      icon: <QualityIcon sx={{ fontSize: 40 }} />,
      title: t('advantages.quality.title'),
      desc: t('advantages.quality.desc'),
      color: theme.palette.success.main,
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: t('advantages.selection.title'),
      desc: t('advantages.selection.desc'),
      color: theme.palette.secondary.main,
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: t('advantages.care.title'),
      desc: t('advantages.care.desc'),
      color: theme.palette.info.main,
    },
  ];

  const howToSteps = [
    {
      num: '01',
      title: t('howToOrder.step1.title'),
      desc: t('howToOrder.step1.desc'),
    },
    {
      num: '02',
      title: t('howToOrder.step2.title'),
      desc: t('howToOrder.step2.desc'),
    },
    {
      num: '03',
      title: t('howToOrder.step3.title'),
      desc: t('howToOrder.step3.desc'),
    },
  ];

  const faqs = [
    { q: t('faq.q1.question'), a: t('faq.q1.answer') },
    { q: t('faq.q2.question'), a: t('faq.q2.answer') },
    { q: t('faq.q3.question'), a: t('faq.q3.answer') },
    { q: t('faq.q4.question'), a: t('faq.q4.answer') },
  ];

  return (
    <>
      <SEO
        title="Декоративные деревья для дома и офиса | Доставка по Ташкенту"
        description="Купить декоративные деревья в Ташкенте: бонсай, живые и искусственные растения премиум-класса. Быстрая доставка, гарантия качества, консультация специалистов."
        keywords="декоративные деревья ташкент, бонсай купить, искусственные деревья, живые растения, топиарий, фикус бенджамина, сосна декоративная"
        type="website"
        image="/assets/tree1.png"
        url="/"
      />

      {/* Hero Section with Gradient Background */}
      <Box
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '60%',
            height: '200%',
            background: `radial-gradient(circle, ${alpha(
              theme.palette.primary.main,
              0.08
            )} 0%, transparent 70%)`,
            transform: 'rotate(-15deg)',
          },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  component="h1"
                  variant="h1"
                  gutterBottom
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  {t('hero.title')}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.7, maxWidth: 540 }}
                >
                  {t('hero.subtitle')}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate('/catalog')}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.0625rem',
                    }}
                  >
                    {t('hero.toCatalog')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/checkout"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.0625rem',
                    }}
                  >
                    {t('hero.consultation')}
                  </Button>
                </Stack>

                {/* Quick benefits */}
                <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                  {[t('hero.delivery'), t('hero.selection'), t('hero.guarantee')].map(
                    (text, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                          }}
                        />
                        <Typography variant="body2" fontWeight={500}>
                          {text}
                        </Typography>
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[4],
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    pt: '75%',
                    backgroundImage: 'url(/assets/tree1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Popular Products */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography component="h2" variant="h2" gutterBottom>
              {t('products.popular')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Выберите из нашей коллекции самых популярных декоративных деревьев
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/catalog"
              size="large"
              endIcon={<ArrowIcon />}
            >
              {t('products.viewAll')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Advantages */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography component="h2" variant="h2" gutterBottom>
              {t('advantages.title')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {advantages.map((adv, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    border: 1,
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[3],
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: alpha(adv.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: adv.color,
                    }}
                  >
                    {adv.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {adv.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {adv.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How to Order */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography component="h2" variant="h2" gutterBottom>
              {t('howToOrder.title')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {howToSteps.map((step, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    border: 1,
                    borderColor: 'divider',
                    position: 'relative',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      position: 'absolute',
                      top: -24,
                      left: 24,
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '4rem',
                      opacity: 0.1,
                    }}
                  >
                    {step.num}
                  </Typography>
                  <Typography variant="h5" gutterBottom fontWeight={600} sx={{ position: 'relative' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography component="h2" variant="h2" gutterBottom>
              {t('faq.title')}
            </Typography>
          </Box>

          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              elevation={0}
              sx={{
                mb: 2,
                border: 1,
                borderColor: 'divider',
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Contact Form */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography component="h2" variant="h2" gutterBottom>
              {t('contact.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('contact.subtitle')}
            </Typography>
          </Box>

          <Paper elevation={3} sx={{ p: 4 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
              <TextField
                label={t('contact.form.name')}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                disabled={isSubmitting}
              />
              <TextField
                label={t('contact.form.phone')}
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                fullWidth
                disabled={isSubmitting}
                placeholder="+998 90 123 45 67"
              />
              <TextField
                label={t('contact.form.comment')}
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : t('contact.form.submit')}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomePage;