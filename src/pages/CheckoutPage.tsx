import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Stepper, Step, StepLabel, Paper, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useCartStore } from '../features/cart/cartStore';
import { useTelegramLead } from '../shared/hooks/useTelegramLead';
import SEO from '../shared/ui/SEO';

interface LocationState {
  productId?: string;
}

const contactSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  phone: z.string().min(7, 'Введите телефон'),
  preferredChannel: z.string().optional(),
  comment: z.string().optional(),
  agree: z.literal(true, { errorMap: () => ({ message: 'Необходимо согласие с политикой' }) }),
});

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const { items, clear } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferredChannel: '',
    comment: '',
    agree: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Используем единый хук для отправки
  const { isSubmitting, isSuccess, error: submitError, submitLead, reset } = useTelegramLead();

  // Сброс при размонтировании
  useEffect(() => {
    return () => reset();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    try {
      contactSchema.parse(form);
      setErrors({});
      setStep(1);
    } catch (err: any) {
      const fieldErrors: { [key: string]: string } = {};
      if (err?.errors) {
        err.errors.forEach((e: any) => {
          fieldErrors[e.path[0]] = e.message;
        });
      }
      setErrors(fieldErrors);
    }
  };

  const handleSubmit = async () => {
    await submitLead({
      contact: {
        name: form.name,
        phone: form.phone,
        preferredChannel: form.preferredChannel || undefined,
        comment: form.comment || undefined,
      },
      cartItems: items.map((i) => ({
        id: i.id,
        title: i.title,
        qty: i.qty,
        price: i.price
      })),
      meta: {
        source: 'checkout_page',
      },
    });
  };

  // После успешной отправки очищаем корзину и показываем результат
  useEffect(() => {
    if (isSuccess && items.length > 0) {
      clear();
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <>
        <SEO
          title={t('checkout.success.title')}
          description={t('checkout.success.message')}
          noindex={true}
        />
        <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom color="success.main">
              ✓ {t('checkout.success.title')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {t('checkout.success.message')}
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              {t('checkout.success.toHome')}
            </Button>
          </Container>
        </Box>
      </>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <SEO
        title={t('checkout.title')}
        description="Оформление заказа на декоративные деревья. Быстрая доставка по Ташкенту."
        noindex={true}
      />

      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            {t('checkout.title')}
          </Typography>

          <Stepper activeStep={step} sx={{ mb: 4 }}>
            <Step><StepLabel>{t('checkout.steps.contacts')}</StepLabel></Step>
            <Step><StepLabel>{t('checkout.steps.confirmation')}</StepLabel></Step>
          </Stepper>

          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          {step === 0 && (
            <Paper sx={{ p: 3 }}>
              <TextField
                fullWidth
                margin="normal"
                label={t('checkout.form.name')}
                name="name"
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('checkout.form.phone')}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                required
                placeholder="+998 90 123 45 67"
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('checkout.form.preferredChannel')}
                name="preferredChannel"
                value={form.preferredChannel}
                onChange={handleChange}
                placeholder="Telegram, WhatsApp, звонок"
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('checkout.form.comment')}
                name="comment"
                value={form.comment}
                onChange={handleChange}
                multiline
                rows={3}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.agree}
                    onChange={handleChange}
                    name="agree"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    {t('checkout.form.agree')} <Link to="/policy" target="_blank">политикой конфиденциальности</Link>
                  </Typography>
                }
              />
              {errors.agree && (
                <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                  {errors.agree}
                </Typography>
              )}
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button variant="contained" size="large" onClick={handleNext}>
                  {t('common.next')}
                </Button>
              </Box>
            </Paper>
          )}

          {step === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('checkout.order')}
              </Typography>

              {items.length === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {t('checkout.emptyCart')}
                </Alert>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  {items.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Typography>{item.title} × {item.qty}</Typography>
                      <Typography fontWeight={600}>
                        {(item.price * item.qty).toLocaleString()} {t('common.currency')}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {items.length > 0 && (
                <Typography variant="h6" sx={{ mb: 3, mt: 2 }}>
                  {t('common.total')}: {total.toLocaleString()} {t('common.currency')}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Наш менеджер свяжется с вами в ближайшее время для уточнения деталей заказа.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setStep(0)}
                  disabled={isSubmitting}
                >
                  {t('common.back')}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="large"
                >
                  {isSubmitting ? t('checkout.sending') : t('checkout.send')}
                </Button>
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </>
  );
};

export default CheckoutPage;