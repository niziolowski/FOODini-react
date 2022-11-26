import { useContext } from "react";
import LayoutContext from "../../contexts/layout";
import Day from "./Day/Day";
import styles from "./Plan.module.css";

//* § Library for swipe slider effect - https://swiperjs.com/react
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

function Plan() {
  const { isMobile } = useContext(LayoutContext);

  const fakeData = [
    {
      title: "Poniedziałek",
      meals: ["1", "2"],
    },
    {
      title: "Wtorek",
      meals: ["1", "2"],
    },
    {
      title: "Środa",
      meals: ["1", "2"],
    },
    {
      title: "Czwartek",
      meals: ["1", "2"],
    },
    {
      title: "Piątek",
      meals: ["1", "2"],
    },
    {
      title: "Sobota",
      meals: ["1", "2"],
    },
    {
      title: "Niedziela",
      meals: ["1", "2"],
    },
  ];

  if (isMobile) {
    return (
      <div className={styles.mobile}>
        <Swiper
          className={styles.swiper}
          spaceBetween={15}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {fakeData.map((day) => (
            <SwiperSlide>
              <Day title={day.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className={styles.plan}>
        {fakeData.map((day) => (
          <Day title={day.title} />
        ))}
      </div>
    );
  }
}

export default Plan;
