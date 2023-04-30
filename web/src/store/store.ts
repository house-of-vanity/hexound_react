import { configureStore } from '@reduxjs/toolkit';
import { playerReducers } from "./redusers";
import { onEnded } from "../features/track-list/duck/actions";
import { player } from '../services'

export const store = configureStore({
	reducer: playerReducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Add Player handlers
(function (store) {
	player.handlers.push({
		eventName: "onEnded",
		handler: function (params: any) {
			store.dispatch(onEnded());
		},
	});
})(store);
