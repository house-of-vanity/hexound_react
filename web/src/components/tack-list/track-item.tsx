import React from "react";
import { TrackDTO } from "../../api";
import { LinkIcon } from "../../icons/components";
import { toUpperFirst } from "../../utils/to-upper-first";
import styles from "./track-list.module.scss";
import clsx from "clsx";
import { useGoTrack } from "../../common";
import { useCallback } from "react";
import { LocalPlayListActions } from "../../features/local-play-list/components";

export interface TrackItemProps {
	track: TrackDTO;
	getActive: (id: TrackDTO["id"]) => string;
	onClick: (id: TrackDTO) => void;
	first: boolean;
}

export const TrackItem = (props: TrackItemProps) => {
	const { track, getActive, onClick, first } = props;
	const { id, title } = track;

	const goTrack = useGoTrack();
	const isActive = getActive(id);

	const onKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const { key } = event;
			if (key === "Enter") {
				onClick(track);
			}
		},
		[onClick, track]
	);

	return (
		<li
			className={clsx(styles.track, { [styles.trackActive]: isActive })}
			key={id}
			onClick={() => onClick(track)}
			role="button"
			{...(!isActive && first ? { tabIndex: 1 } : {})}
			onKeyDown={onKeyDown}
		>
			<span />
			{toUpperFirst(title)}
			<LocalPlayListActions track={track} />

			<span className={styles.linkBox} onClick={() => goTrack(id)}>
				<LinkIcon className={styles.linkIcon} />
			</span>
		</li>
	);
};
