import Delivery from '../assets/delivery.png';
import HeroBg from '../assets/heroBg.png';
import { DUMMY_HERO_DATA } from '../utils/dummydata';

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 items-start md:grid-cols-2 gap-6 p-2">
      <div className="flex flex-col items-start justify-center md:justify-start gap-5   ">
        <div className="flex items-center gap-4 px-2 py-1 bg-white rounded-lg ">
          Bike Delivery
          <div className="w-10 h-10 rounded-full bg-white shadow-md ">
            <img
              className="w-full h-full object-contain "
              src={Delivery}
              alt="delivery icon"
            />
          </div>
        </div>

        <p className="text-[2rem] lg:text-[4rem] font-bold tracking-white text-headingColor">
          The fatest Delivery in
          <span className="text-orange-500 text-[2.5rem] lg:text-[4.5rem]">
            Your City
          </span>
        </p>

        <p className="text-center md:text-left  ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos aperiam
          deserunt odio? Incidunt, delectus obcaecati. Vero amet, illo quis
          magnam est animi ducimus commodi odio. Officia, odio. Illum impedit
        </p>

        <button className="w-full md:w-auto px-3 py-2 bg-orange-400 rounded-lg hover:bg-orange-300 transition ease-in-out duration-100 ">
          Order Now
        </button>
      </div>
      <div className="relative flex items-center py-2  ">
        <img
          className=" sm:w-full md:w-auto  h-420 lg:h-650 ml-auto"
          src={HeroBg}
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex flex-wrap items-center justify-center gap-4 lg:px-20 py-4">
          {DUMMY_HERO_DATA &&
            DUMMY_HERO_DATA.map((data, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center lg:w-190 space-y-1  p-4 bg-cardOverlay backdrop-blur-lg rounded-xl "
              >
                <div className=" w-20 -mt-10 lg:w-40 lg:-mt-20">
                  <img src={data.imageSrc} alt="icecream-icon" />
                </div>

                <p className="text-sm  lg:text-lg text-textColor font-semibold">
                  {data.name}
                </p>

                <p className=" text-[10px] lg:text-sm text-lighttextGray">
                  {data.text}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  $ {data.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
