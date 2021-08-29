import React from 'react'
import './Feed.css'
import PlaylistCard from './PlaylistCard'
import { useStateValue } from './StateProvider'

const Feed = () => {
	const [{ featuredPlaylists }] = useStateValue()
	return (
		<div className='feed'>
			<div className='featuredPlaylistsContainer'>
				{featuredPlaylists?.playlists.items.map(playlist => (
					<PlaylistCard key={playlist.id} playlist={playlist} />
				))}
			</div>
		</div>
	)
}

export default Feed
