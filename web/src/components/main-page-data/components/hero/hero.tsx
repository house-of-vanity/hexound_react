import React from "react";
import styles from "./hero.module.scss";

export const Hero = () => {
	return (
		<div className="container">
			<div className={styles.root}>
				<h1 className={styles.title}>Hexound</h1>
				<p className={styles.description}>
					Web player for listening to chiptune.{" "}
					<a
						className={styles.moreLink}
						href="https://github.com/house-of-vanity/hexound_react"
						target="_blank"
						rel="noreferrer"
					>
						More
					</a>
				</p>
			</div>
		</div>
	);
};
