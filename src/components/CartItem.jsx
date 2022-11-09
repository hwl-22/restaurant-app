import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from '../app/Features/cartSlice';

import { motion } from 'framer-motion';
import { BiPlus, BiMinus } from 'react-icons/bi';
import IceCream from '../assets/i1.png';

const CartItem = ({ i, item, items, setItems }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantity = (action, i) => {
    if (action === 'plus') {
      dispatch(increaseQty(i));
    } else if (action === 'minus') {
      if (item.quantity === 1) {
        //No Quantity change here so no effect in local storage
        dispatch(removeItem(i));
        localStorage.setItem('cartItems', JSON.stringify(items));
      } else {
        dispatch(decreaseQty(i));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-between gap-3  px-2 bg-cartItem opacity-80 backdrop-blur-md shadow-sm  rounded-lg"
    >
      <div>
        <img
          className="w-20 h-20 max-w-[60px] object-contain"
          src={item.imageURL || IceCream}
          alt={`${item.title}-icon`}
        />
      </div>

      {/* Name Section */}
      <div className="flex flex-col gap-1">
        <p className="text-slate-100 text-sm font-medium">{item.title}</p>
        <p className="text-slate-300 text-xs  ">
          ${parseFloat(item.price * item.quantity)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex flex-1 items-center justify-end gap-2 text-slate-50">
        <motion.div
          onClick={() => handleQuantity('minus', i)}
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className="cursor-pointer " />
        </motion.div>

        <p>{item.quantity}</p>

        <motion.div
          onClick={() => handleQuantity('plus', i)}
          whileTap={{ scale: 0.75 }}
        >
          <BiPlus className="cursor-pointer " />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartItem;
