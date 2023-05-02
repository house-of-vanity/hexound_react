import React, { FC } from "react";
import { Button } from "./types";
import styles from "./buttons.module.scss";
import clsx from "clsx";

export const ButtonPseudo: FC<Button> = ({ children, className, ...rest }) => {
	return (
		<button className={clsx(styles.btn, styles.pseudo, className)} {...rest}>
			{children}
		</button>
	);
};
