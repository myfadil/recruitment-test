import { signIn , useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
    const{data}=useSession()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/products/create">Add Product</Link>
                        </li>
                    </ul>
                    {data ? (
                        <button className="btn btn-primary" style={{marginLeft: 'auto'}} onClick={()=>signOut()}>Sign out</button>
                    ) : (
                        <button className="btn btn-primary" style={{marginLeft: 'auto'}} onClick={()=>signIn()}>Sign in</button>
                    )}
                </div>
            </div>
        </nav>
    )
}