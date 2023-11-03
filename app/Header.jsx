import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <nav className='flex gap-10 items-center justify-between mb-8 p-6'>
        <Link href="/">        
        <Image
          className="relative"
          src="/next.svg"
          alt="Next.js Logo"
          width={100}
          height={37}
          priority
        />
        </Link>
        <ul className='text-black font-bold text-lg flex gap-8 uppercase '>
            <Link href="/shop">Shop</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
        </ul>

    </nav>
  )
}

export default Header