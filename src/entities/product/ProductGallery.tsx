import React, { useState } from 'react';
import { Box, ImageList, ImageListItem } from '@mui/material';

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const [active, setActive] = useState(0);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ width: '100%', pt: '75%', position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
        <img
          src={images[active]}
          alt="product"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      {images.length > 1 && (
        <ImageList cols={4} gap={8} sx={{ display: { xs: 'none', md: 'grid' } }}>
          {images.map((img, idx) => (
            <ImageListItem key={idx} onClick={() => setActive(idx)} sx={{ cursor: 'pointer', border: active === idx ? 2 : 0, borderColor: 'primary.main', borderRadius: 1 }}>
              <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default ProductGallery;