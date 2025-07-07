// src/components/common/Modal.jsx
import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded shadow-md max-w-sm">
                <h2 className="text-xl font-semibold mb-2">🔔 Notice</h2>
                <p>{message}</p>
                <ul className="list-none flex flex-col items-center gap-3 text-gray-700">
                    <li>
                        <a href="tel:  +91 6283250677" className="text-inherit no-underline  hover:underline">
                            Call
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:akshit628325@gmail.com"
                            className="text-inherit no-underline hover:underline"
                        >
                         E-mail
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Modal;
