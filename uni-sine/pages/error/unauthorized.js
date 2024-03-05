import React from "react"
import { useRouter } from 'next/router'
import Link from "next/link";

const Unauthorized = () => {
    const router = useRouter()
    return (
        <div style={{margin: '5em 0'}}>
            <p>{router.query.errorDescription || `There was an error signing you in, please try again later.`}</p>
            <Link style={{textDecoration: 'underline'}} href='/'>Return home</Link>
        </div>
    )
};

export default Unauthorized;
