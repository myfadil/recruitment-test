import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions : NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: 'tes',
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'credentials',
            credentials: {
                email : {label:'Email', type:'email'},
            },
            async authorize (credentials) {
                const {email} = credentials as {
                    email:string,
                };
                const user : any = {id:1, email:email};
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({token, account, profile , user}) => {
            if (account?.provider === 'credentials') {
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }:any) {
            if ('email' in token){
                session.user.email = token.email
            }
            return session
        }
    }
}

export default NextAuth(authOptions)