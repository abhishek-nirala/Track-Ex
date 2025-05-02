'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        and profile image {console.log("session : ",session)} <br />
        {session?.user?.image &&
         <Image
          src={session?.user?.image}
          alt="User's profile picture"
          width={120}
          height={120}
          loading="lazy"
          prefix=""
        />
        }
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}