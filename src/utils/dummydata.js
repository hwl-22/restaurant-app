import IcreCream from '../assets/i1.png';
import Strawberry from '../assets/f1.png';
import Kebab from '../assets/c3.png';
import Fish from '../assets/fi1.png';

export const DUMMY_OPTIONS = [
  {
    value: 'seafood',
    label: 'Seafood',
  },
  { value: 'fruits', label: 'Fruits' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'softdrinks', label: 'Soft Drinks' },
];

export const DUMMY_HERO_DATA = [
  {
    name: 'Icecream',
    text: 'Chocolate & Vanilla',
    price: '6.9',
    imageSrc: IcreCream,
  },
  {
    name: 'Strawberries',
    text: 'Fresh Strawberry',
    price: '6.9',
    imageSrc: Strawberry,
  },
  {
    name: 'Chicken Kebab',
    text: 'Mixed Kebab Plate',
    price: '6.9',
    imageSrc: Kebab,
  },
  {
    name: 'Fish Kebab',
    text: 'Mixed Fish Kebab',
    price: '6.9',
    imageSrc: Fish,
  },
];

export const DUMMY_CATEGORY = [
  {
    name: 'Chicken',
    urlParamName: 'chicken',
  },
  {
    name: 'Curry',
    urlParamName: 'curry',
  },
  {
    name: 'Fish',
    urlParamName: 'fish',
  },
  {
    name: 'Fruits',
    urlParamName: 'fruits',
  },
  {
    name: 'Soft Drinks',
    urlParamName: 'softdrinks',
  },
  {
    name: 'Desserts',
    urlParamName: 'desserts',
  },
];
