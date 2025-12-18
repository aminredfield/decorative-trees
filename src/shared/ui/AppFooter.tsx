import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.default', borderTop: 1, borderColor: 'divider', py: 4 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Typography variant="h6" color="primary.main">
          Декоративные деревья
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MuiLink component={Link} to="/catalog" color="inherit" underline="hover">
            Каталог
          </MuiLink>
          <MuiLink component={Link} to="/policy" color="inherit" underline="hover">
            Политика
          </MuiLink>
        </Box>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Декоративные деревья. Все права защищены.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppFooter;