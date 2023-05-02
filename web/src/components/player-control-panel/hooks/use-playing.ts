import { useEffect, useState } from "react";
import { player } from "../../../services/chiptune";

export const usePlaying = () => {
	const [paying, setPlaying] = useState<boolean>(false);

	useEffect(() => {
		player.handlers.push({
			eventName: "onEnded",
			handler: function () {
				setPlaying(false);
			},
			id: "paying",
		});

		player.handlers.push({
			eventName: "onStop",
			handler: function () {
				setPlaying(false);
			},
			id: "paying",
		});

		return () => {
			// @ts-ignore
			player.handlers = player.handlers.filter(({ id }) => id !== "paying");
		};
	}, []);

	useEffect(() => {
		if (!player.currentPlayingNode) {
			setPlaying(false);
			return;
		}

		setPlaying(!player.currentPlayingNode.paused);
		// eslint-disable-next-line
	}, [player.currentPlayingNode, player.currentPlayingNode?.paused]);

	return paying;
};
