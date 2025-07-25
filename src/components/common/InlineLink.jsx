import React from 'react';
import { Link } from 'react-router-dom';

export const InlineLink = ({
    LinkUrl,
    isFlex = true,
    underlineColor = "white",
    id,
    target = "_blank",
    rel = "",
    children
}) => {
    const isExternal = /^(http|https):\/\//.test(LinkUrl);

    const commonClasses = `${isFlex ? "flex" : ""} items-center justify-center relative text-${underlineColor} font-semibold px-1 group`;
    const underlineSpan = (
        <span className={`absolute left-0 top-[102%] h-[3px] w-0 bg-${underlineColor} transition-all duration-400 group-hover:w-full`}></span>
    );

    return isExternal ? (
        <a
            href={LinkUrl}
            target={target}
            rel={rel || "noopener noreferrer"}
            id={id}
            className={commonClasses}
        >
            {children}
            {underlineSpan}
        </a>
    ) : (
        <Link
            to={LinkUrl}
            id={id}
            className={commonClasses}
        >
            {children}
            {underlineSpan}
        </Link>
    );
};
