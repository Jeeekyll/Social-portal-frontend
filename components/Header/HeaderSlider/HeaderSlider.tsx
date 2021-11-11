import React, { FC } from "react"
import Slider from "react-slick"
import { Button } from "@mui/material"
import Fade from "react-reveal/Fade"
import AnchorLink from "react-anchor-link-smooth-scroll"
import styles from "./HeaderSlider.module.scss"

const homeSliderImages = [
  { src: "/header/header-1.jpg" },
  { src: "/header/header-2.jpg" },
  { src: "/header/header-4.jpg" },
]

const HeaderSlider: FC = () => {
  const homeSliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    draggable: false,
  }

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

        <Fade right distance='200px' duration={700} delay={600}>
          <div className={styles.home__slider__content__desc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            doloremque, eaque ex facilis fuga iste itaque nulla odit placeat
            quia quibusdam repellat repellendus.
          </div>
        </Fade>

        <Fade delay={1200}>
          <div className={styles.home__slider__content__actions}>
            <AnchorLink
              href='#news'
              className={styles.home__slider__content__actions__news}
            >
              <Button variant='outlined' size='large'>
                Read news
              </Button>
            </AnchorLink>

            <Button variant='contained' size='large'>
              Chat
            </Button>
          </div>
        </Fade>
      </div>
    </>
  )
}

export default HeaderSlider
