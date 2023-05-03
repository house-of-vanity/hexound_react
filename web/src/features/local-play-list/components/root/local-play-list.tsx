import React, { useCallback, useState } from "react";
import { PlayerControlPanel } from "../../../../components/player-control-panel";
import { TrackList } from "../../../../components/tack-list/track-list";
import { useLocalPlayList } from "../../hooks";
import { getNextTrackUtil, OnGetNextParams } from "../../../shared";
import { TrackDTO } from "../../../../api";
import { ButtonPseudo } from "../../../../common";
import { useHistory } from "react-router-dom";

export const LocalPlayList = () => {
	const tracks = useLocalPlayList();

	const [currentTrack, setCurrentTrack] = useState<TrackDTO | null>(null);

	const onGetNextTrack = useCallback(
		(params: OnGetNextParams) => {
			const nextTrack = getNextTrackUtil(tracks, currentTrack, params);
			setCurrentTrack(nextTrack);
		},
		[tracks, currentTrack]
	);

	const history = useHistory();

	return (
		<>
			<div className="container">
				<ButtonPseudo onClick={() => history.push("/")}>
					На главную
				</ButtonPseudo>
			</div>
			<TrackList
				isDeTouch={false}
				playList={tracks}
				setCurrentTrack={setCurrentTrack}
				currentTrack={currentTrack}
				hendleGetTracks={() => {}}
				hasItems={false}
			/>
			<PlayerControlPanel
				track={currentTrack}
				getNextTrack={onGetNextTrack}
				autoplay={true}
			/>
		</>
	);
};
