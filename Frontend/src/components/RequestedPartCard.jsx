import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const RequestedPartCard = ({ part,addToCart, imgSrc }) => {
  return (
    <Card className="max-w-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardMedia
        component="img"
        height="200"
        image={imgSrc || 'https://via.placeholder.com/200'}
        alt="Product Image"
        className="object-cover"
      />
      <CardContent className="space-y-3">
        <Typography variant="h6" component="div" className="text-gray-800">
          {part.car_part_title}
        </Typography>
        <Typography variant="h6" component="div" className="text-gray-800">
          Price: ${part.car_part_price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity Left: {part.car_part_available_qty}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={() => addToCart(part)}
          fullWidth
          className="mt-2"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default RequestedPartCard;
