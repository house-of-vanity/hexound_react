import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { TrackDTO } from "../../api";
import { getTemplateDate } from "../../utils";
import { LinkIcon } from "../../icons/components";

export interface TrackItemProps {
	track: TrackDTO;
	getActive: (id: TrackDTO["id"]) => string;
	onClick: (id: TrackDTO["id"]) => void;
}

export const TrackItem = (props: TrackItemProps) => {
	const { track, getActive, onClick } = props;
	const { id, title, time } = track;

	const history = useHistory();

	const goTrack = useCallback(() => {
		history.push(`/track/${id}`);
	}, [history, id]);

	return (
		<li
			className={`track-list__list__item ${getActive(id)}`}
			key={id}
			onClick={() => onClick(id)}
		>
			{title} (добавлено: {getTemplateDate(time)}){" "}
			<span onClick={goTrack}>
				<LinkIcon className="link-icon" />
			</span>
		</li>
	);
};
