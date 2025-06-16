import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/" className="absolute top-0 left-5 p-4">
      <Image
        src="/logo/logo.svg"
        alt="Logo"
        width={124}
        height={31}
        priority 
      />
    </Link>
  )
}

export default Logo
