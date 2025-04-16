'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

const SessionWrapper = ({ children }: { children: ReactNode }) => {

  // console.log("children @sessionWrapper : ",children)
  return (

    <SessionProvider>{children}</SessionProvider>


  )
}

export default SessionWrapper


