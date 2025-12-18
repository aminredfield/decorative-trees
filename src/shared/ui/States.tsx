import React from 'react';
import { Box, Skeleton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
    {Array.from({ length: count }).map((_, idx) => (
      <Skeleton key={idx} variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
    ))}
  </Box>
);

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'Ничего не найдено' }) => (
  <Box sx={{ textAlign: 'center', py: 10 }}>
    <Typography variant="h6" gutterBottom>
      {message}
    </Typography>
    <Button component={Link} to="/catalog" variant="contained">
      Сбросить фильтры
    </Button>
  </Box>
);

export const ErrorState: React.FC<{ message?: string }> = ({ message = 'Произошла ошибка' }) => (
  <Box sx={{ textAlign: 'center', py: 10 }}>
    <Typography variant="h6" color="error.main">
      {message}
    </Typography>
  </Box>
);