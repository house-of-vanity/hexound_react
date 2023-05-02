import React, { FC } from "react";
import { Button } from "./types";
import "./styles.css";

export const ButtonPseudo: FC<Button> = ({ children, ...rest }) => {
	return (
		<button className="btn-pseudo" {...rest}>
			{children}
		</button>
	);
};
