import React from 'react'
import { SET_PLAYLIST, SET_SHOW_FEED } from './reducer'
import './SidebarOption.css'
import { useStateValue } from './StateProvider'

const SidebarOption = ({ title = 'test', Icon, playlist }) => {
	const [{ spotify, showFeed }, dispatch] = useStateValue()

	const getPlaylist = async (id, title) => {
		if (!id) {
			if (title === 'Home') {
				if (!showFeed) {
					dispatch({
						type: SET_SHOW_FEED,
						showFeed: true,
					})
				}
			}
			return
		}
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
		<div
			className='sidebarOption'
			onClick={() => getPlaylist(playlist?.id, title)}
		>
			{Icon && <Icon className='sidebarOption__icon' />}
			{Icon ? <h4>{title}</h4> : <p>{playlist.name}</p>}
		</div>
	)
}

export default SidebarOption
