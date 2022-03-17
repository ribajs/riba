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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5taXhpbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWl4aW5zL2FjdGlvbnMubWl4aW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sWUFBWSxHQUFHLENBQzFCLElBQXFDLEVBQ3JDLE9BQWEsRUFDYixFQUFFO0lBQ0YsT0FBTztRQUNMLElBQUk7UUFDSixPQUFPO0tBQ1IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQVJXLFFBQUEsWUFBWSxnQkFRdkI7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQXlDLEVBQUUsRUFBRTtJQUN6RSxPQUFPLElBQUEsb0JBQVksRUFBQyw4QkFBOEIsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUM7QUFGVyxRQUFBLGFBQWEsaUJBRXhCO0FBRUssTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO0lBQy9CLE9BQU8sSUFBQSxvQkFBWSxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxZQUFZLGdCQUV2QjtBQUVLLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUM5QixPQUFPLElBQUEsb0JBQVksRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQztBQUZXLFFBQUEsV0FBVyxlQUV0QiJ9