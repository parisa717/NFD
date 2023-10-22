import React from "react";

const Button = ({
  varient,
  fullwidth,
  maxwidth,
  children,
  className,
  ...rest
}) => {
  //varient =>primary , secondary ,thirdbtn,gray/// fullwidth, maxwidth
  return (
    <button
      className={`button ${className} ${varient === "primary"
        ? "button__primary"
        : varient === "outlined"
          ? "button__outlined"
          : varient === "secondary"
            ? "button__secondary"
            : varient === "thirdbtn"
              ? "button__thirdbtn"
              : varient === "white"
                ? "button__white"
                : varient === "fifth"
                  ? "button__fifthbtn"
                  : varient === "borderbot"
                    ? "button__borderbot":
                    varient === "outline-gray"
                    ?"button__outline-gray"
                    : varient === "gray" ? "button__gray" : varient === "Link" ? "button__Link":null} ${fullwidth
        ? "w-full"
        : maxwidth ? "maxwidth" : null}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
