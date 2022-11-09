import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../app/Features/userSlice';
import { setSidebarOpen } from '../app/Features/sidebarSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

import { AiOutlinePlus } from 'react-icons/ai';
import { MdShoppingCart, MdOutlineLogout } from 'react-icons/md';
import Logo from '../assets/logo.png';
import Avatar from '../assets/avatar.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(fireBaseAuth, provider);

      dispatch(setUser(providerData[0]));

      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.clear();

    dispatch(setUser(null));
  };

  const handleClickCart = () => {
    dispatch(setSidebarOpen());
  };

  return (
    <header className="fixed z-[99] w-screen bg-cardOverlay backdrop-blur-md    py-2 px-4 md:px-16">
      {/* desktop & tablet view */}
      <nav className="hidden md:flex w-full h-full item-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4 ml-auto">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition ease-in-out "
            >
              <Link to={'/'}>Home</Link>
            </li>
            <li
              onClick={() => setIsMenuOpen(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition ease-in-out "
            >
              Menu
            </li>
            <li
              onClick={() => setIsMenuOpen(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition ease-in-out "
            >
              About us
            </li>
            <li
              onClick={() => setIsMenuOpen(false)}
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition ease-in-out "
            >
              Service
            </li>
          </ul>

          <div
            onClick={handleClickCart}
            className="relative flex items-center justify-center"
          >
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {cartItems?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-3 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg"
              >
                <p className="text-xs  text-white  font-medium ">
                  {cartItems.length}
                </p>
              </motion.div>
            )}
          </div>

          <div className="relative ">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer "
              src={user ? user?.photoURL : Avatar}
              alt="avatar"
              onClick={handleLogin}
            />

            {isMenuOpen && (
              <motion.div
                key={'user'}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute top-12 right-1 w-40 p-1 bg-gray-50 rounded-lg shadow-md "
              >
                {/* Admin Panel */}
                {user && user.email === 'htetwailinn.official@gmail.com' && (
                  <Link to={'createItem'}>
                    <p
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-2 text-textColor transition ease-in-out duration-100 cursor-pointer hover:bg-slate-100"
                    >
                      New Item <AiOutlinePlus />
                    </p>
                  </Link>
                )}

                <p
                  onClick={handleLogout}
                  className="flex items-center gap-4 p-2 text-textColor transition ease-in-out duration-100 cursor-pointer hover:bg-slate-100"
                >
                  Logout <MdOutlineLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* mobile view */}
      <nav className="flex items-center justify-between w-full h-full md:hidden">
        <Link to={'/'} className="flex items-center gap-1 ">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div
          onClick={handleClickCart}
          className="relative flex items-center justify-center"
        >
          <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
          {cartItems?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-2 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-cartNumBg"
            >
              <p className="text-xs  text-white  font-medium ">
                {cartItems.length}
              </p>
            </motion.div>
          )}
        </div>

        <div className="relative ">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer "
            src={user ? user.photoURL : Avatar}
            alt="avatar"
            onClick={handleLogin}
          />

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute top-12 right-1 w-40 p-1 bg-gray-50 rounded-lg shadow-md "
            >
              <ul className="flex flex-col items-start border-b border-slate-300">
                <li className="p-2 text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100  duration-100 transition ease-in-out ">
                  <Link to={'/'}>Home</Link>
                </li>
                <li className="p-2 text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition ease-in-out ">
                  Menu
                </li>
                <li className="p-2 text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition ease-in-out ">
                  About us
                </li>
                <li className="p-2 text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition ease-in-out ">
                  Service
                </li>
              </ul>

              {/* Admin Panel */}
              {user && user.email === 'htetwailinn.official@gmail.com' && (
                <Link to={'createItem'}>
                  <p className="flex items-center gap-4 p-2 text-textColor transition ease-in-out duration-100 cursor-pointer hover:bg-slate-100">
                    New Item <AiOutlinePlus />
                  </p>
                </Link>
              )}

              <p
                onClick={handleLogout}
                className="flex items-center justify-center gap-4 p-2  text-textColor transition ease-in-out duration-100 cursor-pointer bg-slate-100 hover:bg-slate-200"
              >
                Logout <MdOutlineLogout />
              </p>
            </motion.div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
