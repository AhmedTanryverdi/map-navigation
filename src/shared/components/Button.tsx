import React from "react";

export const Button: React.FC<{
	type: "submit" | "button";
	children: React.ReactNode;
	className: string;
	onClick: () => void;
}> = ({ type, children, className, onClick }): React.JSX.Element => {
	return (
		<button type={type} className={className} onClick={onClick}>
			{children}
		</button>
	);
};
