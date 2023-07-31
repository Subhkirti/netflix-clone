import React, { useEffect } from 'react'
import Loader from '@/app/loader';

function logout() {

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            window.location = "/"
        }
    }, [])

    return (
        <Loader />
    )
}

export default logout