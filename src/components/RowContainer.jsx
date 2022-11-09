import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, increaseQty } from '../app/Features/cartSlice';

import _ from 'underscore';
import { motion } from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';
import Demo from '../assets/c2.png';
import NotFound from '../assets/NotFound.svg';

const RowContainer = React.forwardRef(({ overflow, data }, ref) => {
  const [cart, setCart] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (element) => {
    //* Check if an added item already exists in the array
    if (cartItems.some((item) => item.id === element.id)) {
      //If exists increase the quantity
      dispatch(increaseQty(_.findIndex(cartItems, { id: element.id })));
    } else {
      setCart([...cartItems, element]);
    }
  };

  useEffect(() => {
    dispatch(setCartItems(cart));
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  return (
    <div
      ref={ref}
      style={{
        overflowX: overflow ? 'scroll' : 'hidden',
        scrollBehavior: 'smooth',
      }}
      className=" w-full bg-orange-100 py-6 px-4 scrollbar-none "
    >
      <motion.div
        layout
        className={`flex items-center gap-4 md:gap-6  ${
          !overflow && 'flex-wrap justify-center gap-6 '
        } `}
      >
        {data?.length > 0 ? (
          data.map((element, i) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={i}
              className="flex flex-col gap-4 w-[180px] min-w-[180px] md:w-225 md:min-w-350 p-4 bg-card backdrop-blur-md rounded-lg hover:shadow-md cursor-pointer"
            >
              <div className="flex justify-center  ">
                <motion.img
                  whileHover={{ scale: 1.125 }}
                  className=" w-20 h-20 md:w-40 md:h-40 object-contain drop-shadow-lg"
                  src={element.imageURL || Demo}
                  alt={`${element.title}-image `}
                />
              </div>

              <div className="flex items-center justify-between ">
                <div>
                  <p className=" text-sm md:text-baseline md:text-lg text-textColor font-semibold">
                    {element.title}
                  </p>
                  <p className=" text-[10px]  md:text-xs text-gray-400">
                    {element.calorie} Calories
                  </p>
                  <p className=" text-xs md:text-base font-semibold text-orange-600">
                    $ {element.price}
                  </p>
                </div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => handleAddToCart(element)}
                  className=" flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full  bg-orange-500 cursor-pointer hover:shadow-md "
                >
                  <MdShoppingBasket className="text-white text-base md:text-lg" />
                </motion.div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center gap-4 "
          >
            <img className="h-340" src={NotFound} alt="not-found" />
            <p className="text-headingColor font-semibold">
              Items not available at the moment
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});

export default RowContainer;
