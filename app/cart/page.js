'use client'
import React from 'react'

const CartPage = () => {
  const [showAddress, setShowAddress] = React.useState(false)
  const [coupon, setCoupon] = React.useState('')
  const [discount, setDiscount] = React.useState(0)

  const products = [
    {
      name: "Retro",
      description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image: "https://m.media-amazon.com/images/I/516Vkg9aLwL.jpg",
      category: "Eyeglasses",
    },
    {
      name: "Classic",
      description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image: "https://m.media-amazon.com/images/I/31+mw3x7qaL._UY1100_.jpg",
      category: "Eyeglasses",
    },
    {
      name: "Vintage",
      description: ["Lightweight and comfortable", "Breathable mesh upper", "Ideal for jogging and casual wear"],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image: "https://m.media-amazon.com/images/I/51c9chOPgQL._UY1100_.jpg",
      category: "Eyeglasses",
    },
  ]

  const total = products.reduce((acc, p) => acc + p.offerPrice * p.quantity, 0)
  const tax = Math.round(total * 0.02)
  const grandTotal = total + tax - discount

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(10)
    } else if (coupon === 'SAVE50') {
      setDiscount(50)
    } else {
      setDiscount(0)
      alert('Invalid coupon code')
    }
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* Left - Cart */}
      <div className='flex-1 max-w-4xl'>
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-gray-700">{products.length} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {products.map((product, index) => (
          <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img className="max-w-full h-full object-cover" src={product.image} alt={product.name} />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Size: <span>{product.size || "N/A"}</span></p>
                  <div className='flex items-center'>
                    <p>Qty:</p>
                    <select className='outline-none'>
                      {Array(5).fill('').map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">${product.offerPrice * product.quantity}</p>
            <button className="cursor-pointer mx-auto">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}

        <button className="group cursor-pointer flex items-center mt-8 gap-2 text-gray-500 font-medium">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Right - Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address Section */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button onClick={() => setShowAddress(!showAddress)} className="text-gray-500 hover:underline cursor-pointer">
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                  New York, USA
                </p>
                <p onClick={() => setShowAddress(false)} className="text-gray-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Coupon */}
        <div className="mb-5">
          <p className="text-sm font-medium uppercase mb-2">Apply Coupon</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 outline-none"
              placeholder="Enter coupon code"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-gray-500 text-white font-medium hover:bg-gray-600 transition"
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-sm mt-2">Coupon applied: -${discount}</p>
          )}
        </div>

        <hr className="border-gray-300" />

        {/* Price Breakdown */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span><span>${total}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span><span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span><span>${tax}</span>
          </p>
          {discount > 0 && (
            <p className="flex justify-between text-red-500">
              <span>Discount</span><span>-${discount}</span>
            </p>
          )}
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span><span>${grandTotal}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-gray-700 text-white font-medium hover:bg-gray-600 transition">
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CartPage
