import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { TrackDTO } from "../../api";
import { LinkIcon } from "../../icons/components";
import { toUpperFirst } from "../../utils/to-upper-first";
import styles from "./track-list.module.scss";
import clsx from "clsx";

export interface TrackItemProps {
	track: TrackDTO;
	getActive: (id: TrackDTO["id"]) => string;
	onClick: (id: TrackDTO["id"]) => void;
}

export const TrackItem = (props: TrackItemProps) => {
	const { track, getActive, onClick } = props;
	const { id, title } = track;

	const history = useHistory();

	const goTrack = useCallback(() => {
		history.push(`/track/${id}`);
	}, [history, id]);

	return (
		<li
			className={clsx(styles.track, { [styles.trackActive]: getActive(id) })}
			key={id}
			onClick={() => onClick(id)}
		>
			<span />
			{toUpperFirst(title)}
			<span className={styles.linkBox} onClick={goTrack}>
				<LinkIcon className="link-icon" />
			</span>
		</li>
	);
};

// `track-list__list__item ${getActive(id)}`
