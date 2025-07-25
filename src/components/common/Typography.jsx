// components/Typography.js

export const Heading = ({ children ,size="3xl",alignText="center"}) => (
  <h1 className={`text-${size} text-${alignText}  md:text-4xl font-dancingFont font-bold leading-tight mb-4`}>{children}</h1>
);

export const SubHeading = ({ children ,alignText="center"}) => (
  <h2 className={`text-xl text-${alignText}  text-lg font-semibold font-dancingFont leading-snug mb-3`}>{children}</h2>
);

export const Paragraph = ({ children,alignText="center" }) => (
  <p className={`text-base text-${alignText} leading-relaxed mb-2`}>{children}</p>
);
