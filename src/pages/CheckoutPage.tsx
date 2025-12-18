import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Stepper, Step, StepLabel, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCartStore } from '@features/cart/cartStore';
import { z } from 'zod';

interface LocationState {
  productId?: string;
}

const contactSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  phone: z.string().min(7, 'Введите телефон'),
  preferredChannel: z.string().optional(),
  comment: z.string().optional(),
  agree: z.literal(true),
});

const CheckoutPage: React.FC = () => {
  const { items, clear } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  // if coming from product page with single product, we may prefill cart
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', preferredChannel: '', comment: '', agree: false });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
    setSubmitting(true);
    try {
      const payload = {
        contact: {
          name: form.name,
          phone: form.phone,
          preferredChannel: form.preferredChannel || undefined,
          comment: form.comment || undefined,
        },
        cartItems: items.map((i) => ({ id: i.id, title: i.title, qty: i.qty, price: i.price })),
        meta: {
          pageUrl: window.location.href,
          referrer: document.referrer,
        },
        honeypot: '',
      };
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSuccess(true);
      clear();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Спасибо за вашу заявку!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Наш менеджер свяжется с вами для уточнения деталей заказа.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>На главную</Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Оформление заявки
        </Typography>
        <Stepper activeStep={step} sx={{ mb: 4 }}>
          <Step><StepLabel>Контакты</StepLabel></Step>
          <Step><StepLabel>Подтверждение</StepLabel></Step>
        </Stepper>
        {step === 0 && (
          <Paper sx={{ p: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Имя"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Телефон"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Предпочтительный способ связи (телеграм/видео/звонок)"
              name="preferredChannel"
              value={form.preferredChannel}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Комментарий"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              multiline
              rows={3}
            />
            <FormControlLabel
              control={<Checkbox checked={form.agree} onChange={handleChange} name="agree" />}
              label={
                <Typography variant="body2">
                  Я соглашаюсь с <Link to="/policy">политикой конфиденциальности</Link>
                </Typography>
              }
            />
            {errors.agree && <Typography color="error" variant="caption">{errors.agree}</Typography>}
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button variant="contained" onClick={handleNext}>Продолжить</Button>
            </Box>
          </Paper>
        )}
        {step === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Ваш заказ</Typography>
            {items.length === 0 ? (
              <Typography variant="body2">Корзина пуста</Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                {items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{item.title} × {item.qty}</Typography>
                    <Typography>{(item.price * item.qty).toLocaleString()} сум</Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Typography variant="h6" sx={{ mb: 3 }}>
              Итого: {items.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString()} сум
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={() => setStep(0)}>Назад</Button>
              <Button variant="contained" onClick={handleSubmit} disabled={submitting || items.length === 0}>
                {submitting ? 'Отправляем…' : 'Отправить заявку'}
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default CheckoutPage;