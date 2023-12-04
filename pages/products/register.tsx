import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Register(){
    const {push} =useRouter()
    const [inputData, setInputData] = useState({
        nama_suplier: '',
        email: '',
        alamat: '',
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(inputData)
        axios.post('/api/auth/register', inputData)
        .then(res => {
            console.log(res)            
            push('/products/login')
        })
        .catch(err => {
            alert(err.response.data.message)
        })
        
    }
    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
            <h1>Register</h1>
            <div className='m-5 p-5 border border-primary rounded-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama_suplier" className="form-label">Nama Suplier</label>
                    <input placeholder='Masukkan Nama' type="text" className="form-control" id="nama_suplier" name="nama_suplier" value={inputData.nama_suplier} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input placeholder='Masukkan Email' type="email" className="form-control" id="email" name="email" value={inputData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="alamat" className="form-label">Alamat</label>
                    <input placeholder='Masukkan Alamat' type="text" className="form-control" id="alamat" name="alamat" value={inputData.alamat} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='mt-3'>
                Don't have an account? <br/>
                <Link href="/products/login">
                    Login
                </Link>
            </div>
            </div>
        </div>
    )
}