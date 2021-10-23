import React from "react";
import { NextPage } from "next";
import Slider from "react-slick";
import styles from "./Home.module.scss";
import { Button } from "@mui/material";
import Fade from "react-reveal/Fade";

const homeSliderImages = [
  { src: "/header/header-1.jpg" },
  { src: "/header/header-2.jpg" },
  { src: "/header/header-4.jpg" },
];

const Index: NextPage = () => {
  const homeSliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    draggable: false,
  };

  return (
    <>
      <Slider {...homeSliderSettings} className={styles.home__slider}>
        {homeSliderImages &&
          homeSliderImages.map((image, index: number) => (
            <img src={image.src} key={index} />
          ))}
      </Slider>

      <div className={styles.home__slider__content}>
        <Fade up>
          <h3 className={styles.home__slider__content__title}>
            Hello, username
          </h3>
        </Fade>

        <Fade right distance="200px" duration={700} delay={600}>
          <div className={styles.home__slider__content__desc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            doloremque, eaque ex facilis fuga iste itaque nulla odit placeat
            quia quibusdam repellat repellendus.
          </div>
        </Fade>

        <Fade delay={1200}>
          <div className={styles.home__slider__content__actions}>
            <Button variant="outlined" size="large">
              Read news
            </Button>
            <Button variant="contained" size="large">
              Chat
            </Button>
          </div>
        </Fade>
      </div>

      <div style={{ maxWidth: 100 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, animi
        debitis, distinctio excepturi expedita incidunt magnam natus,
        necessitatibus neque placeat quisquam rem repellendus repudiandae
        tempora veniam? Adipisci aspernatur at, consectetur dolor dolorem
        doloribus eos, est fugiat fugit laboriosam magnam natus porro ratione
        recusandae reiciendis rerum sapiente sint temporibus vero voluptatum.
      </div>
    </>
  );
};

export default Index;
