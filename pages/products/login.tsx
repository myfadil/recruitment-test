import React, { useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Login(){
    const {push,query} =useRouter()
    const callbackUrl : any = query.callbackUrl || '/'



    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
            const res = await signIn('credentials' , {
                redirect: false,
                nama_suplier: event.target.nama_suplier.value,
                email: event.target.email.value,
                callbackUrl,
            })

            if (!res?.error) {
                console.log('ini benar',callbackUrl)
                push('/')
            } else {
                alert(res?.error)
            }
        } catch (error) {
            alert(error)
    }
}
    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
            <h1>Login</h1>
            <div className='m-5 p-5 border border-primary rounded-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama_suplier" className="form-label">Nama Suplier</label>
                    <input type="text" className="form-control" id="nama_suplier" name="nama_suplier" placeholder='Masukkan Nama'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder='Masukkan email'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='mt-3'>
                Don't have an account? <br/>
                <Link href="/products/register">
                    Register
                </Link>
            </div>
            </div>
        </div>
    )
}