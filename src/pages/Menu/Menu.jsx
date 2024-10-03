// import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from 'swiper/modules'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Imagedata } from "../../assets/imagedata";
import { FoodMenuCard } from "../../components/FoodMenuCard/FoodMenuCard";
import "./Menu.css"

export const Menu = () => {
  return (
    <div className="swiper-container">
    <div className="swipper-card">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {Imagedata.map((data, key) => {
          return (
            <div className="swiper-img" key={key}>
              <SwiperSlide>
                <img src={data.image} alt="" />
              </SwiperSlide>
              ...
            </div>
          );
        })}
      </Swiper>
    </div>
    <FoodMenuCard />
  </div>
  )
}
