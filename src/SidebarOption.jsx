import React from 'react'
import { SET_PLAYLIST } from './reducer'
import './SidebarOption.css'
import { useStateValue } from './StateProvider'

const SidebarOption = ({ title = 'test', Icon, playlist }) => {
	const [{ spotify }, dispatch] = useStateValue()

	const getPlaylist = async id => {
		if (!id) return
		await spotify.getPlaylist(id).then(response => {
			dispatch({
				type: SET_PLAYLIST,
				playlist: response,
			})
		})
	}

	return (
		<div className='sidebarOption' onClick={() => getPlaylist(playlist?.id)}>
			{Icon && <Icon className='sidebarOption__icon' />}
			{Icon ? <h4>{title}</h4> : <p>{playlist.name}</p>}
		</div>
	)
}

export default SidebarOption
