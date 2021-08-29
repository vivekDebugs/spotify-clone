import React from 'react'
import './PlaylistCard.css'
import { SET_PLAYLIST, SET_SHOW_FEED } from './reducer'
import { useStateValue } from './StateProvider'

const PlaylistCard = ({ playlist }) => {
	const [{ spotify, showFeed }, dispatch] = useStateValue()
	const getPlaylist = async id => {
		if (showFeed) {
			dispatch({
				type: SET_SHOW_FEED,
				showFeed: false,
			})
		}
		await spotify.getPlaylist(id).then(response => {
			dispatch({
				type: SET_PLAYLIST,
				playlist: response,
			})
		})
	}
	return (
		<div className='playlistCard' onClick={() => getPlaylist(playlist.id)}>
			<div>
				<img src={playlist.images[0].url} alt={playlist.name} />
				<h3>{playlist.name}</h3>
				<p>{playlist.description}</p>
			</div>
		</div>
	)
}

export default PlaylistCard
