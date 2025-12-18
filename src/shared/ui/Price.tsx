import React from 'react';

interface Props {
  value: number;
  currency?: string;
}

const Price: React.FC<Props> = ({ value, currency = 'UZS' }) => {
  return <span>{value.toLocaleString()} {currency}</span>;
};

export default Price;