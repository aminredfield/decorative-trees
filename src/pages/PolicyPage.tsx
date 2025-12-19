import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import SEO from '../shared/ui/SEO';

const PolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Политика конфиденциальности | Декоративные деревья"
        description="Политика конфиденциальности и условия обработки персональных данных магазина декоративных деревьев."
        keywords="политика конфиденциальности, персональные данные, обработка данных, декоративные деревья"
        type="website"
        url="/policy"
        canonical="/policy"
        noindex
      />
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Политика конфиденциальности
          </Typography>
          <Typography variant="body1" paragraph>
            В данном разделе вы можете разместить текст политики конфиденциальности и условия обработки персональных данных. Этот текст является заглушкой и служит только для демонстрации структуры страницы.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default PolicyPage;