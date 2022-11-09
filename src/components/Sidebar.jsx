import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../app/Features/cartSlice';
import { setSidebarClose } from '../app/Features/sidebarSlice';
import { motion } from 'framer-motion';

import CartItem from './CartItem';

import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import emptyCart from '../assets/emptyCart.svg';
import { useEffect } from 'react';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const { isSideBar } = useSelector((state) => state.sidebar);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [items, setItems] = useState(cartItems);
  const [total, setTotal] = useState(
    items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    )
  );

  const handleBackSpace = () => {
    dispatch(setSidebarClose());
  };

  const handleClearCart = () => {
    dispatch(setCartItems([]));
    localStorage.clear();
  };

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    setTotal(
      items.reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      )
    );
  }, [items]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 z-[100] w-full md:w-375  flex flex-col gap-6 h-screen bg-white"
    >
      <div className="flex items-center justify-between p-4">
        <motion.div onClick={handleBackSpace} whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace className="text-2xl text-textColor cursor-pointer" />
        </motion.div>

        <p className="text-lg font-semibold text-textColor ">Cart</p>

        <motion.p
          onClick={handleClearCart}
          whileTap={{ scale: 0.75 }}
          className=" flex items-center gap-2 bg-gray-100 py-1 px-2 rounded-md text-sm  text-textColor hover:shadow-sm cursor-pointer "
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* Bottom Section */}
      {items?.length > 0 ? (
        <div className="w-full h-full flex flex-col bg-cartBg rounded-t-2xl ">
          {/* Carts Section */}
          <div className="flex flex-col gap-3 h-300 md:h-42 p-4 md:p-6 overflow-y-scroll scrollbar-none hover:scrollbar scrollbar-thumb-orange-300 scroll-smooth cursor-pointer ">
            {/* Individual Cart */}
            {items?.map((item, i) => (
              <CartItem
                key={i}
                i={i}
                item={item}
                items={items}
                setItems={setItems}
              />
            ))}
          </div>

          {/* Checkout Section */}
          <div className="flex flex-1 flex-col justify-evenly p-4 rounded-xl bg-cartTotal ">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Sub Total</p>
              <p className="text-sm text-slate-300">${total}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Delivery</p>
              <p className="text-sm text-slate-300">$6.9</p>
            </div>

            <div className="border-b border-gray-600"></div>

            <div className="flex items-center justify-between">
              <p className="text-slate-100 font-medium">Total</p>
              <p className="text-slate-100 font-medium">$ {total + 6.9} </p>
            </div>

            {/* If there's no user don't display */}
            {user ? (
              <div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="w-full py-2 bg-gradient-to-tr from-orange-400 to-orange-500 rounded-2xl text-white text-sm "
                >
                  Checkout
                </motion.button>
              </div>
            ) : (
              <div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="w-full py-2 bg-gradient-to-tr from-orange-400 to-orange-500 rounded-2xl text-white text-sm "
                >
                  Log In to checkout
                </motion.button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <img src={emptyCart} alt="emptycart" />
          <p className=" text-lg font-medium text-textColor  ">
            Add some items to your Cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
