import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCartStore } from '@features/cart/cartStore';
import { useUIStore } from '@shared/hooks/useUIStore';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, updateQty, removeItem } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={closeCart} PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Ваша корзина</Typography>
        <IconButton onClick={closeCart}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {items.length === 0 && (
          <ListItem>
            <ListItemText primary="Корзина пуста" />
          </ListItem>
        )}
        {items.map((item) => (
          <ListItem key={item.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar variant="rounded">{item.title.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <TextField
                    type="number"
                    size="small"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    inputProps={{ min: 1, style: { width: 60 } }}
                  />
                  <Typography variant="body2">× {item.price.toLocaleString()} сум</Typography>
                  <IconButton size="small" onClick={() => removeItem(item.id)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Итого: {total.toLocaleString()} сум
        </Typography>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          fullWidth
          onClick={closeCart}
          disabled={items.length === 0}
        >
          Оформить заявку
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;