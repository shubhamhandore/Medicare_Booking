/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { HiStar } from "react-icons/hi";
import patientAvatar from "../../assets/images/patient-avatar.png";

const testimonials = [
  {
    id: 1,
    name: "Shubham Handore",
    review:
      "I have medical services from them. They treat so well and they are providing the best medical services.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ananya Verma",
    review: "Excellent service, very friendly staff. Highly recommended!",
    rating: 4,
  },
  {
    id: 3,
    name: "Raj Kumar",
    review:
      "The doctors here are very professional and caring. Great experience!",
    rating: 5,
  },
  // Add more testimonials as needed
];

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <img
                  src={patientAvatar}
                  alt={testimonial.name}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <HiStar
                        key={index}
                        className="text-yellowColor w-[18px] h-5"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {testimonial.review}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
