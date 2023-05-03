import React from "react";
import { TrackItem } from "./track-item";
import { TrackDTO } from "../../api";
import styles from "./track-list.module.scss";

export interface TrackListProps {
	isDeTouch: boolean;
	setCurrentTrack: (track: TrackDTO) => void;
	currentTrack: TrackDTO | null;
	playList: TrackDTO[];
	hendleGetTracks?: () => void;
	hasItems: boolean;
}

export const TrackList = (props: TrackListProps) => {
	const {
		isDeTouch,
		setCurrentTrack,
		currentTrack,
		playList,
		hendleGetTracks,
		hasItems,
	} = props;

	const handleOnClick = (track: TrackDTO) => {
		if (!isDeTouch) {
			setCurrentTrack(track);
		}
	};

	const getActive = (trackID: TrackDTO["id"]) => {
		if (currentTrack !== null) {
			return +trackID === currentTrack.id ? "active" : "";
		} else {
			return "";
		}
	};

	return (
		<div>
			<div className={`container`}>
				<div className={styles.listHead}>
					<span />
					<span>track</span>
					<span>actions</span>
					<span>link</span>
				</div>
			</div>

			<div className={styles.listRoot}>
				<ul className={styles.listList}>
					{playList.map((track, i) => (
						<TrackItem
							first={i === 0}
							key={track.id}
							onClick={handleOnClick}
							track={track}
							getActive={getActive}
						/>
					))}
				</ul>
			</div>
			<div className={`container`}>
				{hasItems && <div onClick={hendleGetTracks}>Load more</div>}
			</div>
		</div>
	);
};

export default TrackList;
