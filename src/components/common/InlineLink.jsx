import React from 'react'
import { Link } from 'react-router-dom'

export const InlineLink = ({ LinkUrl,isFlex=true, id, target="_blank",rel, children }) => {
    return (
        <Link
            to={LinkUrl}
          
            target={ target}
            id={id}
            rel={rel}
            className={`${isFlex && "flex"} items-center justify-center link-custom`}
        >
            {children}
        </Link>
    )
}
