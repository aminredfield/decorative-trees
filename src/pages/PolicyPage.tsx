import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const PolicyPage: React.FC = () => {
  return (
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
  );
};

export default PolicyPage;