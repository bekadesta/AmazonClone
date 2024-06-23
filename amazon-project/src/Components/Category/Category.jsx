import React from 'react'
import {categories} from './Info.jsx'
import CategoryCard from './CategoryCard.jsx'
import categorycss from '../Category/Category.module.css'

function Category() {
  
  return (    
      <section className={categorycss.container}>
        {
          categories.map((infos)=>(
            <CategoryCard data={infos} />
          ))
        }
    </section>)
  
}

export default Category
