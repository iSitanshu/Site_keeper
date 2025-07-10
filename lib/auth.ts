import { prisma } from "@/lib/prisma"; 
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: { 
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials.password) throw new Error("Missing email or password");

            try {
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                })

                if(!user) throw new Error("No user found with this credentails");

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password,
                )

                if(!isValid) throw new Error("Invalid Password");

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name ?? "",
                }

            } catch (error) {
                console.error("Auth error while login: ",error);
                throw error
            }
        }
    })
  ], // user kese login karega
  callbacks: {
    async jwt({ token, user }){
        if(user) token.id = user.id;
        return token
    },
    async session({ session, token }){
        if(session.user) session.user.id = token.id as string;
        return session
    }
  }, // JWT aur Sessions k andar kya store karna hai
  pages: {
    signIn: "/login",
    error: "/login"
  }, // login fail ho to kaha redirect karna hai
  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
  }, // session JWT me store ho ya database me, kitni der tak valid rahe
  secret: process.env.NEXTAUTH_SECRET // JWT ko securely encrypt karne ke liye
}; 
