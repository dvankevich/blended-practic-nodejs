import { CATEGORY_LIST } from '../constants/constants.js';

const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;

  const isCategory = CATEGORY_LIST.includes(category);
  if (isCategory) return category;
};

const parsePrice = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = Number(number);
  if (Number.isNaN(parsedNumber)) return;
  return parsedNumber;
};

export const parseFilterParams = ({ category, minPrice, maxPrice }) => {
  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parsePrice(minPrice);
  const parsedMaxPrice = parsePrice(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
