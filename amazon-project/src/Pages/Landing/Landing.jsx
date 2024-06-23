import React from 'react'
import LayOut from '../../Components/Layout/LayOut'
import CarouselComponent from '../../Components/Carousel/CarouselComponent'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'

function Landing() {
  return (
    <LayOut>
      <CarouselComponent />
      <Category />
      <Product />
    </LayOut>
  )
}

export default Landing
