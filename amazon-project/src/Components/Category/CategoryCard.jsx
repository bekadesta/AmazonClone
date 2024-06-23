import React from 'react'
import categorycss from '../Category/Category.module.css'
import {Link} from 'react-router-dom'

function CategoryCard({data}) {
  return (
    <div className={categorycss.block}>
        <Link to={`/category/${data.name}`}>
          <span>
              <h2>{data.title}</h2>
          </span>
          <img src={data.imagelink} alt=''/>
          <p>Shop NOW!</p>
        </Link>
      </div>
  )
}

export default CategoryCard
