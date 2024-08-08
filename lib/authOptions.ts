import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import mongooseConnect from "@/lib/mongooseConnect";
import { NextAuthOptions } from "next-auth";
import { revalidatePath } from "next/cache";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      await mongooseConnect();

      console.log({ user, account, profile, email, credentials });
      const foundUser = await User.findOne({email: user.email});
      if (!foundUser) {
        await User.create({
          name: user.name,
          email: user.email,
          imageUrl: user.image,
          registered: true,
          active: true
        })
      }

      return true;
    }
  }
}

export default authOptions;