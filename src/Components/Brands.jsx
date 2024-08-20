import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Brands() {
  const [brands,setbrands] = useState([])
 useEffect(()=>{
  getBrands()
 },[])
  const getBrands = () =>{
    axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
    .then(res => setbrands(res.data.data));
  }
  return (
    <div>
      {
        brands.map((item,index)=>(
          <div key={index}>
            <h1>{item.title}</h1>
            <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} alt="" />
          </div>
        ))
      }
    </div>
  )
}

export default Brands
