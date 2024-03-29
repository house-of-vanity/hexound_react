import React from "react";
import XakPlant from "../CreditsIcon/Xakplant";
import Github from "../CreditsIcon/Github";
// @ts-ignore
import logo from "../../icons/hexound_logo.png";
import { useHistory } from "react-router";
import styles from "./credits.module.scss";
import { ButtonIcon } from "../../common";
import {
	useLocalPlayList,
	useToLocalPlayList,
} from "../../features/local-play-list/hooks";
import { ItunesNoteIcon } from "../../icons/components";

export const Credits = () => {
	const history = useHistory();

	const goToMain = () => history.push("/");
	const onGoLocalList = useToLocalPlayList();
	const localPlayList = useLocalPlayList();
	const hasLocal = localPlayList.length > 0;

	return (
		<div className={styles.credits}>
			<div>
				<img
					src={logo}
					width={`40px`}
					height={`40px`}
					alt="chiptune player"
					title="Hexound v2 (chiptune web-player)"
				/>
			</div>
			<div onClick={goToMain} className={styles.title}>
				Hexound v2
				<span className={styles.subTitle}>chiptune web-player</span>
			</div>
			{hasLocal && (
				<div>
					<ButtonIcon
						title="local play list"
						className={styles.playListIcon}
						onClick={onGoLocalList}
					>
						<ItunesNoteIcon />
					</ButtonIcon>
				</div>
			)}

			<div>
				<a
					style={{ color: "#000000" }}
					title={`Github создателя и автора идеи Hexound`}
					href={`https://github.com/house-of-vanity`}
					target={`_blank`}
				>
					<Github width={`30px`} height={`30px`} />
				</a>
				<a
					title={`Блог о web-разработке соавтора hexound v2`}
					target={`_blank`}
					href={`https://xakplant.ru`}
				>
					<XakPlant width={`30px`} height={`30px`} />
				</a>
			</div>
		</div>
	);
};
