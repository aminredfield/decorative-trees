import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Telegram as TelegramIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        pt: { xs: 6, md: 8 },
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  🌳
                </Box>
                {t('common.siteName')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t('hero.subtitle')}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="telegram"
                  size="small"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.main' },
                  }}
                >
                  <TelegramIcon />
                </IconButton>
                <IconButton
                  aria-label="instagram"
                  size="small"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.main' },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label="facebook"
                  size="small"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.main' },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
            >
              {t('footer.catalog')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink
                component={Link}
                to="/catalog"
                color="text.secondary"
                underline="hover"
                sx={{
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                }}
              >
                {t('header.catalog')}
              </MuiLink>
              <MuiLink
                component={Link}
                to="/policy"
                color="text.secondary"
                underline="hover"
                sx={{
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                }}
              >
                {t('footer.policy')}
              </MuiLink>
              <MuiLink
                component={Link}
                to="/checkout"
                color="text.secondary"
                underline="hover"
                sx={{
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                }}
              >
                {t('header.leaveRequest')}
              </MuiLink>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}
            >
              {t('footer.contacts')}
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                <MuiLink
                  href="tel:+998901234567"
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  +998 (90) 123-45-67
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                <MuiLink
                  href="mailto:info@decorative-trees.uz"
                  color="text.secondary"
                  underline="hover"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  info@decorative-trees.uz
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationIcon sx={{ color: 'primary.main', fontSize: '1.25rem', mt: 0.25 }} />
                <Typography variant="body2" color="text.secondary">
                  г. Ташкент, ул. Примерная, 123
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {t('common.siteName')}. {t('footer.rights')}.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with 💚
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;