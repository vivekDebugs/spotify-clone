import React from 'react'
import Body from './Body'
// import Footer from './Footer'
import './Player.css'
import Sidebar from './Sidebar'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useStateValue } from './StateProvider'

const Player = ({ trackUri }) => {
	const [{ token }] = useStateValue()
	if (!token) return null
	return (
		<div className='player'>
			<div className='player__body'>
				<Sidebar />
				<Body />
			</div>
			<div className='player__player'>
				<SpotifyPlayer
					token={token}
					showSaveIcon
					uris={trackUri ? [trackUri] : []}
				/>
			</div>
		</div>
	)
}

export default Player
