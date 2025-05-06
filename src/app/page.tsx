'use client'

import { Button } from "@/components/button"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
export default function Home() {
  const { data: session } = useSession()
  console.log("type of window : ", typeof window)
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
        <Button className="m-5" onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <Button className="m-5" onClick={() => signIn()}>Sign in</Button>
    </>
  )
}