import React from "react";
import "./pult.css";
import Play from "../ActionBtn/Play";
import Pause from "../ActionBtn/Pause";
import Stop from "../ActionBtn/Stop";
import ForwardStep from "../ActionBtn/ForwardStep";
import RandomIcon from "../ActionBtn/Random";
import LoopIcon from "../ActionBtn/Loop";
import { PultActions } from "./use-pult-actions";
import { TrackDTO } from "../../api";
import { onEnded } from "../../features/track-list/duck/actions";
import { useProgress } from "./use-progress";
import { player } from "../../services/chiptune";

export interface PultProps extends PultActions {
	play: boolean;
	isDeTouch: boolean;
	track: TrackDTO;
	isLoop: boolean;
	isRandom: boolean;
}

export const Pult = (props: PultProps) => {
	const {
		track,
		play,
		// percent,
		isRandom,
		onToggleLoop,
		onToggleRandom,
		isLoop,
		isDeTouch,
		onPlay,
		onStop,
	} = props;

	const percent = useProgress();

	const percentW = percent <= 1 ? `${percent * 100}%` : `100%`;
	const currentTrackName = track === null ? "" : track.title;

	const handlePlayPause = () => {
		/* TODO set load track in player */
		if (!isDeTouch) {
			onPlay(!play);
		}
	};

	const handleStop = () => {
		if (!isDeTouch) {
			onStop();
			player.stop();
		}
	};

	const setProgress = (e: React.MouseEvent<HTMLDivElement>) => {
		const element = e.currentTarget;
		const { x, width } = element.getBoundingClientRect();
		const { clientX } = e.nativeEvent;
		const xWidht = clientX - x;
		const percent = xWidht / width;
		player.setPositionByPercent(percent);
	};

	return (
		<div className={`pult`}>
			<div onClick={setProgress} className={`pult__progress-wrap`}>
				<div style={{ width: percentW }} className={`pult__progress`}></div>
			</div>
			<div className={`pult__trackname`}>
				{currentTrackName && `Current track: ${currentTrackName}`}
			</div>
			<div className={`pult__btnbox`}>
				<span className={`pult__btn btn_toggle-play`} onClick={handlePlayPause}>
					{play ? (
						<Pause width={"40px"} height={"40px"} />
					) : (
						<Play width={"35px"} height={"35px"} />
					)}
				</span>
				<span className={`pult__btn btn_stop`} onClick={handleStop}>
					<Stop width={"40px"} height={"40px"} />
				</span>
				<span className={`pult__btn btn_stop`} onClick={onEnded}>
					<ForwardStep width={"40px"} height={"40px"} />
				</span>
				<span
					className={`pult__btn btn_toggle ${isRandom && `active`}`}
					onClick={onToggleRandom}
					style={{ width: `40px` }}
				>
					<RandomIcon width={"20px"} height={"20px"} />
				</span>

				<span
					className={`pult__btn btn_toggle  ${isLoop && `active`}`}
					onClick={onToggleLoop}
					style={{ width: `40px` }}
				>
					<LoopIcon width={"20px"} height={"20px"} />
				</span>
			</div>
		</div>
	);
};
