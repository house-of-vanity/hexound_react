import React, { useCallback, useEffect, useState } from "react";
import { TrackDTO } from "../../../api";
import { playTrackById } from "../../../services/chiptune/utils";
import Play from "../../ActionBtn/Play";
import Pause from "../../ActionBtn/Pause";
import Stop from "../../ActionBtn/Stop";
import ForwardStep from "../../ActionBtn/ForwardStep";
import RandomIcon from "../../ActionBtn/Random";
import LoopIcon from "../../ActionBtn/Loop";
import "./player.css";
import { useProgress } from "../hooks/use-progress";
import { usePlaying } from "../hooks/use-playing";
import { player } from "../../../services";

export interface GetNextTrackParams {
	isRandom: boolean;
	isLoop: boolean;
}

export interface PlayerControlPanelProps {
	track: TrackDTO | null;
	getNextTrack: (params: GetNextTrackParams) => void;
	autoplay?: boolean;
}

export const PlayerControlPanel = (props: PlayerControlPanelProps) => {
	const { track, getNextTrack, autoplay = true } = props;

	const [isRandom, setRandom] = useState<boolean>(false);
	const [isLoop, setLoop] = useState<boolean>(false);
	const onToggleRandom = () => setRandom((p) => !p);
	const onToggleLoop = () => setLoop((p) => !p);

	const handlePlay = useCallback((track: TrackDTO) => {
		const loadFunction = playTrackById(track.id);
		loadFunction().then();
	}, []);

	useEffect(() => {
		if (track && autoplay) {
			handlePlay(track);
		}
		return () => {
			player.stop();
		};
	}, [handlePlay, track, autoplay]);

	const percent = useProgress();
	const percentW = percent <= 1 ? `${percent * 100}%` : `100%`;

	const setProgress = (e: React.MouseEvent<HTMLDivElement>) => {
		const element = e.currentTarget;
		const { x, width } = element.getBoundingClientRect();
		const { clientX } = e.nativeEvent;
		const xWidht = clientX - x;
		const percent = xWidht / width;
		player.setPositionByPercent(percent);
	};

	const currentTrackName = track === null ? "" : track.title;

	const isPlaying = usePlaying();

	const handlePlayPause = () => {
		if (player.currentPlayingNode) {
			if (isPlaying) {
				player.currentPlayingNode.pause();
			} else {
				player.currentPlayingNode.unpause();
			}
		} else {
			track && handlePlay(track);
		}
	};

	const handleStop = () => {
		player.stop();
	};

	const handleNext = useCallback(() => {
		getNextTrack({ isLoop, isRandom });
	}, [getNextTrack, isLoop, isRandom]);

	useEffect(() => {
		player.handlers.push({
			eventName: "onEnded",
			handler: function () {
				handleNext();
			},
			id: "next",
		});

		return () => {
			// @ts-ignore
			player.handlers = player.handlers.filter(({ id }) => id !== "next");
		};
	}, [handleNext]);

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
					{isPlaying ? (
						<Pause width={"40px"} height={"40px"} />
					) : (
						<Play width={"35px"} height={"35px"} />
					)}
				</span>
				<span className={`pult__btn btn_stop`} onClick={handleStop}>
					<Stop width={"40px"} height={"40px"} />
				</span>
				<span className={`pult__btn btn_stop`} onClick={handleNext}>
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
