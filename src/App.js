import React, { useEffect } from 'react'
import './App.css'
import Login from './Login'
import { getTokenFromUrl } from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './Player'
import { useStateValue } from './StateProvider'
import {
	SET_FEATURED_PLAYLISTS,
	SET_PLAYLISTS,
	SET_SPOTIFY,
	SET_TOKEN,
	SET_USER,
} from './reducer'

const spotify = new SpotifyWebApi()

const App = () => {
	const [{ token, user }, dispatch] = useStateValue()

	useEffect(() => {
		const init = async () => {
			const hash = getTokenFromUrl()
			window.location.hash = ''
			const _token = hash.access_token
			if (_token) {
				await dispatch({
					type: SET_TOKEN,
					token: _token,
				})

				await dispatch({
					type: SET_SPOTIFY,
					spotify: spotify,
				})

				spotify.setAccessToken(_token)

				await spotify.getMe().then(user => {
					dispatch({
						type: SET_USER,
						user: user,
					})
				})

				await spotify.getUserPlaylists().then(playlists => {
					dispatch({
						type: SET_PLAYLISTS,
						playlists: playlists,
					})
				})

				// gets featured playlists
				const res = await fetch(
					'https://api.spotify.com/v1/browse/featured-playlists',
					{
						headers: { Authorization: 'Bearer ' + _token },
					}
				)
				const data = await res.json()

				dispatch({
					type: SET_FEATURED_PLAYLISTS,
					featuredPlaylists: data,
				})
			}
		}

		init()
	}, [token, dispatch, user])

	return <div className='app'>{token ? <Player /> : <Login />}</div>
}

export default App
