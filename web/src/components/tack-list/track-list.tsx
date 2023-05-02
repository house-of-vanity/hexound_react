import React from "react";
import "./TrackList.css";
import { TrackItem } from "./track-item";
import { TrackDTO, TrackDictDTO } from "../../api";
import styles from "./track-list.module.scss";

export interface TrackListProps {
	isDeTouch: boolean;
	trackList: TrackDictDTO;
	setCurrentTrack: (id: TrackDTO["id"]) => void;
	currentTrack: TrackDTO;
	playList: TrackDTO[];
	hendleGetTracks: () => void;
	hasItems: boolean;
}

const TrackList = (props: TrackListProps) => {
	const {
		isDeTouch,
		trackList,
		setCurrentTrack,
		currentTrack,
		playList,
		hendleGetTracks,
		hasItems,
	} = props;

	const handleOnClick = (trackID: TrackDTO["id"]) => {
		if (!isDeTouch) {
			setCurrentTrack(trackList[String(trackID)]);
		}
	};

	const getActive = (trackID: TrackDTO["id"]) => {
		if (currentTrack !== null) {
			return +trackID === currentTrack.id ? "active" : "";
		} else {
			return "";
		}
	};

	let styleObj: Record<any, any> = {};

	if (isDeTouch) {
		styleObj.opacity = "0.6";
	} else {
		delete styleObj.opacity;
	}

	return (
		<div className={`track-list`}>
			<div className={`container`}>
				<div className={styles.listHead}>
					<span />
					<span>track</span>
					<span>link</span>
				</div>
			</div>

			<div className={`track-list__container`}>
				<ul style={styleObj} className={`track-list__list`}>
					{playList.map((id: any) => (
						<TrackItem
							key={id}
							onClick={handleOnClick}
							track={trackList[id]}
							getActive={getActive}
						/>
					))}
				</ul>
			</div>
			<div className={`container`}>
				{hasItems && <div onClick={hendleGetTracks}>Ещё</div>}
			</div>
		</div>
	);
};

export default TrackList;
