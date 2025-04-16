
import connectDb from "@/lib/connectDb"
import { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import profileImg from '../../../../../public/send-it-logo.png';
import User from "@/models/User.model";
import printMessage from "@/errorMsg";


export const authOptions: NextAuthOptions = ({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {

      let isAllowedToSignIn = false;

      await connectDb();
      try {

        const response = await User.updateOne(
          {
            email: user.email
          },
          {
            $set: {
              name: user.name,
              profileImg: user.image ? user.image : profileImg
            },
          },
          { upsert: true }
        )
        if (response.acknowledged) isAllowedToSignIn = true;
      } catch (err) {
        console.log("couldn't be able to sign-in! Please try again",err)
        printMessage(false, "couldn't be able to sign-in! Please try again", 400)
      }

      if (isAllowedToSignIn) return true;
      else {
        printMessage(false, "couldn't be able to sign-in! Please try again", 400)
        console.log('isAllowedToSignIn',isAllowedToSignIn);
        
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET!
})
