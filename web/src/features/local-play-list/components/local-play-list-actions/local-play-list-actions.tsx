import React, { useCallback } from "react";
import { PlusIcon, MinusIcon } from "../../../../icons/components";
import { ButtonIcon } from "../../../../common";
import { useTrackInLocalPlayList, useLocalPlayListActions } from "../../hooks";
import { TrackDTO } from "../../../../api";
import styles from "./local-play-list-actions.module.scss";

export interface LocalPlayListActionsProps {
	track: TrackDTO;
}

export const LocalPlayListActions = (props: LocalPlayListActionsProps) => {
	const { track } = props;
	const inPlayList = useTrackInLocalPlayList(track);
	const { add, remove } = useLocalPlayListActions();

	const onClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (inPlayList) {
				remove(track);
			} else {
				add(track);
			}
		},
		[add, remove, track, inPlayList]
	);

	const label = inPlayList
		? "Remove from local play list"
		: "Add to local play list";

	return (
		<div>
			<ButtonIcon tabIndex={-1} title={label} onClick={onClick}>
				{inPlayList ? (
					<MinusIcon className={styles.localPlayListIcon} />
				) : (
					<PlusIcon className={styles.localPlayListIcon} />
				)}
			</ButtonIcon>
		</div>
	);
};
