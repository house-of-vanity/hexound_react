import React, { useCallback } from "react";
import styles from "./control-panel.module.scss";
import { TrackDTO } from "../../../api";
import { toUpperFirst } from "../../../utils/to-upper-first";
import { ButtonIcon, useGoTrack } from "../../../common";
import { LinkIcon } from "../../../icons/components";
import { LocalPlayListActions } from "../../../features/local-play-list/components";

export interface TrackViewProps {
	track: TrackDTO;
}

export const TrackView = (props: TrackViewProps) => {
	const { track } = props;
	const { title } = track;

	const goTrack = useGoTrack();

	const onRequestGoTrack = useCallback(() => {
		if (track) {
			goTrack(track.id);
		}
	}, [track, goTrack]);

	return (
		<div className={styles.pultTrackName}>
			<div className={styles.trackNameBlock}>
				<span className={styles.trackPlayer}>Playing:</span>
				<span>{toUpperFirst(title)}</span>
				<span>
					<ButtonIcon tabIndex={-1} onClick={onRequestGoTrack}>
						<LinkIcon className={styles.linkIcon} />
					</ButtonIcon>
				</span>
				<span>
					<LocalPlayListActions track={track} />
				</span>
			</div>
		</div>
	);
};
