import React from 'react';
import { Rate } from 'antd';

interface RatingStarsProps {
  value: number;
  onChange: (value: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ value, onChange }) => {
  return <Rate count={5} value={value} onChange={onChange} />;
};

export default RatingStars;
