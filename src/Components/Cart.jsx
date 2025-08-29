import React, { useContext } from 'react'
import { ProductsData } from '../context/Context'

function Cart() {
    const {addCart} = useContext(ProductsData)
  return (
    <div>
      cart
    </div>
  )
}

export default Cart
