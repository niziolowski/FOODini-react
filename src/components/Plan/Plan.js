import { useContext, useMemo } from "react";
import LayoutContext from "../../contexts/layout";
import Day from "./Day/Day";
import styles from "./Plan.module.css";
import PlanContext from "../../contexts/plan";

//* § Library for swipe slider effect - https://swiperjs.com/react
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

function Plan() {
  const { isMobile } = useContext(LayoutContext);
  const { activeWeek } = useContext(PlanContext);

  // Create meals array from active week
  let meals = useMemo(() => {
    // If undefined, return
    if (!activeWeek?.days) return;

    // Destructure meals data
    return Object.values(activeWeek.days).map((data) => data.meals);
  }, [activeWeek]);

  const days = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
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
          {days.map((day, i) => (
            <SwiperSlide key={day}>
              <Day title={day} meals={meals[i]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  if (!isMobile) {
    return (
      <div className={styles.plan}>
        {days.map((day, i) => {
          return <Day key={day} title={day} meals={meals[i]} />;
        })}
      </div>
    );
  }
}

export default Plan;
