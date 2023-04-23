import React from "react";
import { TrackDTO } from "../../api";
import { getTemplateDate } from "../../utils";

export interface TrackItemProps {
	track: TrackDTO;
	getActive: (id: TrackDTO["id"]) => string;
	onClick: (id: TrackDTO["id"]) => void;
}

export const TrackItem = (props: TrackItemProps) => {
	const { track, getActive, onClick } = props;
	const { id, title, time } = track;

	return (
		<li
			className={`track-list__list__item ${getActive(id)}`}
			key={id}
			onClick={() => onClick(id)}
		>
			{title} (добавлено: {getTemplateDate(time)})
		</li>
	);
};
