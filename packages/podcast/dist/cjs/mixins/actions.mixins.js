"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPlay = exports.requestPause = exports.selectEpisode = exports.createAction = void 0;
const createAction = (type, payload) => {
    return {
        type,
        payload
    };
};
exports.createAction = createAction;
const selectEpisode = (payload) => {
    return (0, exports.createAction)("PLAYER_SELECT_PLAYLIST_ENTRY", payload);
};
exports.selectEpisode = selectEpisode;
const requestPause = () => {
    return (0, exports.createAction)("PLAYER_REQUEST_PAUSE");
};
exports.requestPause = requestPause;
const requestPlay = () => {
    return (0, exports.createAction)("PLAYER_REQUEST_PLAY");
};
exports.requestPlay = requestPlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5taXhpbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWl4aW5zL2FjdGlvbnMubWl4aW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBcUMsRUFBRSxPQUFhLEVBQUUsRUFBRTtJQUNuRixPQUFPO1FBQ0wsSUFBSTtRQUNKLE9BQU87S0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFDO0FBTFcsUUFBQSxZQUFZLGdCQUt2QjtBQUVLLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBeUMsRUFBRSxFQUFFO0lBQ3pFLE9BQU8sSUFBQSxvQkFBWSxFQUFDLDhCQUE4QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQTtBQUZZLFFBQUEsYUFBYSxpQkFFekI7QUFFTSxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDL0IsT0FBTyxJQUFBLG9CQUFZLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUE7QUFGWSxRQUFBLFlBQVksZ0JBRXhCO0FBRU0sTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE9BQU8sSUFBQSxvQkFBWSxFQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFBO0FBRlksUUFBQSxXQUFXLGVBRXZCIn0=