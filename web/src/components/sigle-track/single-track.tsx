import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { PlayerControlPanel } from "../player-control-panel";
import { TrackDTO, getSingleTrack } from "../../api";
import { ButtonPseudo } from "./buttons/pseudo";

export const SingleTrack = () => {
	const { trackID } = useParams<{ trackID: string }>();
	const history = useHistory();

	const [track, setTrack] = useState<TrackDTO | null>(null);

	const backOnMainPage = useCallback(
		(isPush: boolean = false) => {
			if (isPush) {
				history.push("/");
			} else {
				history.replace("/");
			}
		},
		[history]
	);

	useEffect(() => {
		if (!trackID) {
			backOnMainPage();
		} else {
			getSingleTrack(trackID).then((track) => setTrack(track));
		}
	}, [trackID, backOnMainPage]);

	const getNextTrack = () => {
		if (track) {
			setTrack({ ...track });
		}
	};

	return (
		<>
			<div className="container">
				<div>
					<ButtonPseudo onClick={() => backOnMainPage(true)}>
						На главную
					</ButtonPseudo>
				</div>
				{track && (
					<div>
						<h2>{track.title}</h2>
					</div>
				)}
			</div>
			{track && (
				<PlayerControlPanel track={track} getNextTrack={getNextTrack} />
			)}
		</>
	);
};
