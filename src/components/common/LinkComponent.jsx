import React from 'react'
import { Link } from 'react-router-dom'

export const LinkComponent = ({ linkUrl, id,children }) => {
    return (
        <Link to={linkUrl} id={id} className=" bg-amber-900 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition">
            {children}
        </Link>
    )
}
