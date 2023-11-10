"use client";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { AppContext } from "./utils/context";

const Header = () => {
  const [cart, setCart] = useContext(AppContext);

  const cartQtn = cart?.totalQtn ?? "0";

  return (
    <nav className="flex gap-10 items-center justify-between mb-8 p-6">
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
      <ul className="text-black font-bold text-lg flex gap-8 uppercase ">
        <Link href="/shop">Shop</Link>
        <Link href="/cart">
          Cart{" "}
          <span className="text-sm font-medium text-gray-900">({cartQtn})</span>
        </Link>
        <Link href="/checkout">Checkout</Link>
      </ul>
    </nav>
  );
};

export default Header;
