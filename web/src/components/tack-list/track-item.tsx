import React from "react";
import { TrackDTO } from "../../api";
import { LinkIcon } from "../../icons/components";
import { toUpperFirst } from "../../utils/to-upper-first";
import styles from "./track-list.module.scss";
import clsx from "clsx";
import { useGoTrack } from "../../common";
import { useCallback } from "react";

export interface TrackItemProps {
	track: TrackDTO;
	getActive: (id: TrackDTO["id"]) => string;
	onClick: (id: TrackDTO["id"]) => void;
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
				onClick(id);
			}
		},
		[onClick, id]
	);

	return (
		<li
			className={clsx(styles.track, { [styles.trackActive]: isActive })}
			key={id}
			onClick={() => onClick(id)}
			role="button"
			{...(!isActive && first ? { tabIndex: 1 } : {})}
			onKeyDown={onKeyDown}
		>
			<span />
			{toUpperFirst(title)}
			<span className={styles.linkBox} onClick={() => goTrack(id)}>
				<LinkIcon className="link-icon" />
			</span>
		</li>
	);
};
