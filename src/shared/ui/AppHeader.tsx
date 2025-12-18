import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from './LanguageSwitcher';
import { useCartStore } from '../../features/cart/cartStore';
import { useUIStore } from '../hooks/useUIStore';

const AppHeader: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const items = useCartStore((state) => state.items);
  const openCart = useUIStore((state) => state.openCart);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('header.catalog'), path: '/catalog' },
    { label: t('header.policy'), path: '/policy' },
  ];

  const handleCartClick = () => {
    if (isMobile) {
      window.location.href = '/cart';
    } else {
      openCart();
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              py: 1.5,
              px: { xs: 0, sm: 2 },
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                🌳
              </Box>
              {t('common.siteName')}
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    color="inherit"
                    sx={{
                      fontWeight: location.pathname === link.path ? 600 : 400,
                      color:
                        location.pathname === link.path
                          ? 'primary.main'
                          : 'text.primary',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: location.pathname === link.path ? '100%' : '0',
                        height: 2,
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
              {!isMobile && (
                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('header.leaveRequest')}
                </Button>
              )}

              <LanguageSwitcher />

              <IconButton
                onClick={handleCartClick}
                size="large"
                color="primary"
                aria-label={t('header.cart')}
                sx={{
                  position: 'relative',
                }}
              >
                <Badge
                  badgeContent={itemCount}
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {isMobile && (
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 320,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary.main" fontWeight={700}>
            {t('common.siteName')}
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                selected={location.pathname === link.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === link.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('header.leaveRequest')}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default AppHeader;