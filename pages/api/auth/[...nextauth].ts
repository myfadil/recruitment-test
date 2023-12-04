import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import init from "../../../db";

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
                nama_suplier : {label:'nama_suplier', type:'text'},
                email : {label:'email', type:'email'},
            },
            async authorize (credentials) {
                const {nama_suplier, email} = credentials as {
                    nama_suplier:string,
                    email:string,
                };
                const db = await init();
                const hasil = await db.get('SELECT * FROM suplier WHERE nama_suplier = ? AND email = ?', nama_suplier, email);
                const user : any = hasil
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({token, account, profile , user} : any) => {
            if (account?.provider === 'credentials') {
                token.email = user.email;
                token.name = user.id_suplier;
            }
            return token;
        },

        async session({ session, token }:any) {
            if ('email' in token){
                session.user.email = token.email
            }
            if ('name' in token){
                session.user.name = token.name
            }
            return session
        }
    },
    pages: {
        signIn: '/products/login',
    }
}

export default NextAuth(authOptions)