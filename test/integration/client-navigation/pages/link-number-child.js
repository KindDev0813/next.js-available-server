import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      Hello World. <Link href="/about">{1000}</Link>
    </div>
  )
}
