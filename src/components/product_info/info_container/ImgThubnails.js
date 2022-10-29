import React from 'react'

const ImgThubnails = ({productInfo}) => {
  return (
    <img src = {productInfo.image} alt={productInfo.category} />
  )
}

export default ImgThubnails