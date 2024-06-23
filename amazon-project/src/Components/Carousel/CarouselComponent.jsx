import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import {images} from './Images/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carouselcss from '../Carousel/Carousel.module.css'


function CarouselComponent() {
  return (
    <div>
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
            // swipeable={true}
        >
        {
          images.map((imageItem)=>{
                return <img src={imageItem} />
          })
        }
        </Carousel>
      <div className={carouselcss.fade}></div>
    </div>
  )
}

export default CarouselComponent
