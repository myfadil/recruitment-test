import { signIn, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'

export default function MyNavbar() {
    const { data } = useSession()
    return (
        <Navbar className="mx-2" expand="lg">
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="d-flex gap-3 mx-5 col-12">
                    <Link href="/" className="text-decoration-none fw-bold fs-5">
                        <Nav.Link as="div" style={{ color: "#2E266F" }}>
                            Home
                        </Nav.Link>
                    </Link>
                    <Link
                        href='/products/create'
                        className="text-decoration-none fw-bold fs-5"
                    >
                        <Nav.Link as="div" style={{ color: "#2E266F" }}>
                            Add Produk
                        </Nav.Link>
                    </Link>
                    <div className='col-4 d-flex justify-content-center' style={{marginLeft: 'auto'}}>
                        {data ? (
                            <button className="btn btn-primary" onClick={() => signOut()}>Sign out</button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => signIn()}>Sign in</button>
                        )}
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}