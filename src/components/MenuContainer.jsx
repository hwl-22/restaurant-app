import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import RowContainer from './RowContainer';
import { DUMMY_CATEGORY } from '../utils/dummydata';
import { IoFastFood } from 'react-icons/io5';

const MenuContainer = () => {
  const [filter, setFilter] = useState('chicken');

  const { foodItems } = useSelector((state) => state.foodItems);

  return (
    <div className="flex flex-col items-center justify-center mt-16 space-y-8">
      <p className=" relative self-start text-2xl text-headingColor font-semibold before:absolute before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition ease-in-out before:rounded-lg ">
        Our Hot Dishes
      </p>

      <div className="w-full flex items-center justify-start lg:justify-center gap-4 md:gap-8 overflow-x-scroll scrollbar-none">
        {DUMMY_CATEGORY &&
          DUMMY_CATEGORY.map((el, i) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={i}
              onClick={() => setFilter(el.urlParamName)}
              className={` group flex flex-col items-center justify-center gap-2  w-24 min-w-[94px] h-28 rounded-lg ${
                filter === el.urlParamName ? 'bg-orange-500' : 'bg-card'
              } hover:bg-orange-500  drop-shadow-xl cursor-pointer `}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  filter === el.urlParamName
                    ? 'bg-white text-orange-500'
                    : 'bg-orange-500 text-white'
                }  group-hover:bg-white `}
              >
                <IoFastFood className="text-xl  group-hover:text-orange-500 " />
              </div>
              <p
                className={`text-sm ${
                  filter === el.urlParamName ? 'text-white' : 'text-orange-500'
                } group-hover:text-white `}
              >
                {el.name}
              </p>
            </motion.div>
          ))}
      </div>

      <RowContainer
        overflow={false}
        data={foodItems?.filter((el) => el.category === filter)}
      />
    </div>
  );
};

export default MenuContainer;
