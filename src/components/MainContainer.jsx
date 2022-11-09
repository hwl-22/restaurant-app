import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getFoodItems } from '../utils/firebaseFunctions';

import HomeContainer from './HomeContainer';
import RowContainer from './RowContainer';
import MenuContainer from './MenuContainer';

import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Sidebar from './Sidebar';

const MainContainer = () => {
  const { foodItems } = useSelector((state) => state.foodItems);
  const { isSideBar } = useSelector((state) => state.sidebar);

  const rowContainerRef = useRef();

  const scroll = (scrollOffset) => {
    rowContainerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="w-full flex flex-col">
      <HomeContainer />

      <section className="space-y-20">
        <div className="flex items-center justify-between gap-4">
          <p className=" relative text-2xl text-headingColor font-semibold before:absolute before:w-36 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition ease-in-out before:rounded-lg ">
            Our Fresh & Healthy Fruits
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              onClick={() => scroll(-300)}
              whileTap={{ scale: 0.75 }}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 hover:shadow-md cursor-pointer transition duration-100 ease-in-out"
            >
              <MdChevronLeft className="text-xl text-white" />
            </motion.div>
            <motion.div
              onClick={() => scroll(300)}
              whileTap={{ scale: 0.75 }}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 hover:shadow-md cursor-pointer transition duration-100 ease-in-out"
            >
              <MdChevronRight className="text-xl text-white" />
            </motion.div>
          </div>
        </div>

        <RowContainer
          ref={rowContainerRef}
          overflow={true}
          data={foodItems?.filter((item) => item.category === 'fruits')}
        />
      </section>

      <MenuContainer />

      {isSideBar && <Sidebar />}
    </div>
  );
};

export default MainContainer;
