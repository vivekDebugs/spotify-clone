import React, { useEffect } from 'react'
import './App.css'
import Login from './Login'
import { getTokenFromUrl } from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './Player'
import { useStateValue } from './StateProvider'
import {
	SET_DISCOVER_WEEKLY,
	SET_PLAYLISTS,
	SET_SPOTIFY,
	SET_TOKEN,
	SET_USER,
} from './reducer'

const spotify = new SpotifyWebApi()

const App = () => {
	const [{ token }, dispatch] = useStateValue()

	useEffect(() => {
		const hash = getTokenFromUrl()
		window.location.hash = ''
		const _token = hash.access_token
		if (_token) {
			dispatch({
				type: SET_TOKEN,
				token: _token,
			})

			spotify.setAccessToken(_token)

			spotify.getMe().then(user => {
				dispatch({
					type: SET_USER,
					user: user,
				})
			})

			spotify.getUserPlaylists().then(playlists => {
				dispatch({
					type: SET_PLAYLISTS,
					playlists: playlists,
				})
			})

			spotify.getPlaylist('37i9dQZEVXcDpJImvG9RQf').then(response => {
				dispatch({
					type: SET_DISCOVER_WEEKLY,
					discover_weekly: response,
				})
			})

			dispatch({
				type: SET_SPOTIFY,
				spotify: spotify,
			})
		}
	}, [token, dispatch])

	return <div className='app'>{token ? <Player /> : <Login />}</div>
}

export default App
