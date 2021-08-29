import React from 'react'
import './Playlist.css'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import SongRow from './SongRow'
import { useStateValue } from './StateProvider'

const Playlist = () => {
	const [{ playlist }] = useStateValue()
	return (
		<div className='playlist'>
			<div className='playlist__info'>
				<img src={playlist?.images[0].url} alt='user' />
				<div className='playlist__infoText'>
					<strong>PLAYLIST</strong>
					<h2>{playlist?.name}</h2>
					<p>{playlist?.description}</p>
				</div>
			</div>
			<div className='playlist__songs'>
				<div className='playlist__icons'>
					<PlayCircleFilledIcon className='playlist__shuffle' />
					<FavoriteIcon fontSize='large' />
					<MoreHorizIcon />
				</div>
				{playlist?.tracks.items.map((item, index) => (
					<SongRow track={item.track} key={index} />
				))}
			</div>
		</div>
	)
}

export default Playlist
