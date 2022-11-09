import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getFoodItems } from './utils/firebaseFunctions';
import { setFoodItems } from './app/Features/foodItemsSlice';

import { AnimatePresence } from 'framer-motion';
import { Header, MainContainer, CreateContainer } from './components';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const fetchItems = async () => {
    await getFoodItems().then((data) => {
      dispatch(setFoodItems(data));
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="w-screen h-auto flex flex-col bg-primary ">
      <Header />

      <main className="w-full p-4 mt-16 md:mt-20 md:p-8 ">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
