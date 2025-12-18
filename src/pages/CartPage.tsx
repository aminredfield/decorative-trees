import React from 'react';
import { Box, Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useCartStore } from '@features/cart/cartStore';

const CartPage: React.FC = () => {
  const { items, updateQty, removeItem } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Корзина
        </Typography>
        {items.length === 0 ? (
          <Typography variant="body1">
            Корзина пуста. <Button component={Link} to="/catalog">Перейти в каталог</Button>
          </Typography>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Товар</TableCell>
                  <TableCell>Количество</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, Number(e.target.value))}
                        inputProps={{ min: 1, style: { width: 60 } }}
                      />
                    </TableCell>
                    <TableCell>{(item.price * item.qty).toLocaleString()} сум</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeItem(item.id)}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Итого: {total.toLocaleString()} сум</Typography>
              <Button component={Link} to="/checkout" variant="contained">
                Оставить заявку
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;