export const initialState = {
    spotify : null,
    user : null,
    playlists : [],
    playing : false,
    item : null, 
    discover_weekly : null,
}

export const SET_USER = 'SET_USER'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const SET_ITEM = 'SET_ITEM'
export const SET_PLAYING = 'SET_PLAYING'
export const SET_SPOTIFY = 'SET_SPOTIFY'
export const SET_DISCOVER_WEEKLY = 'SET_DISCOVER_WEEKLY'

const reducer = (state, action) => {
    console.log(action)

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user : action.user
            }

        case SET_TOKEN:
            return {
                ...state,
                token : action.token
            }
        
        case SET_PLAYLISTS:
            return {
                ...state,
                playlists : action.playlists
            }
        
        case SET_ITEM:
            return {
                ...state,
                item : action.item
            }
        
        case SET_PLAYING:
            return {
                ...state,
                playing : action.playing
            }
        
        case SET_SPOTIFY:
            return {
                ...state,
                spotify : action.spotify
            }

        case SET_DISCOVER_WEEKLY:
            return {
                ...state,
                discover_weekly : action.discover_weekly
            }
    
        default:
            return state
    }

}

export default reducer