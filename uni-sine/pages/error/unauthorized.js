import React from "react"
import { useRouter } from 'next/router'
import Link from "next/link";

const Unauthorized = () => {
    const router = useRouter()
    return (
        <div>
            <p>{router.query.errorDescription || `There was an error signing you in, please try again later.`}</p>
            <a href='/'>Return home</a>
        </div>
    )
};

export default Unauthorized;
