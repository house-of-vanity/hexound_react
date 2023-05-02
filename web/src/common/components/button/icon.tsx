import React, { FC } from "react";
import { Button } from "./types";
import styles from "./buttons.module.scss";
import clsx from "clsx";

export const ButtonIcon: FC<Button> = ({ children, className, ...rest }) => {
	return (
		<button className={clsx(styles.btn, styles.iconBtn, className)} {...rest}>
			{children}
		</button>
	);
};
