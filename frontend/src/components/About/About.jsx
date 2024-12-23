import React from "react";
import aboutImg from "../../assets/images/about.jpeg";
import aboutcardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* ========= about image ========= */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <figure>
              <img
                src={aboutImg}
                alt="About Us image showcasing healthcare professionals"
                className="w-full"
              />
              <figcaption className="absolute z-20 bottom-4 w-[200] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                <img
                  src={aboutcardImg}
                  alt="Illustrative card about our services"
                  className="w-full"
                />
              </figcaption>
            </figure>
          </div>
          {/* ========= about content ========= */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nations best</h2>

            <p className="text_para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              in, velit accusantium deserunt tenetur consequatur. Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Esse, dolores!
            </p>

            <p className="text_para mt-[30px]">
              Our best is something we strive for each day, caring for our
              patients—not looking back at what we accomplished but towards what
              we can do tomorrow. Providing the best.
            </p>

            <Link to="/">
              <button className="btn mt-6">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
