import React from 'react'

export const Button = ({type,width,children}) => {
    return (
        <button type={type} className=" bg-amber-900 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition">
            {children}
        </button>
    )
}
