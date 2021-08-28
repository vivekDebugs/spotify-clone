import React from 'react'
import { logo } from './Login'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import { useStateValue } from './StateProvider'

const Sidebar = () => {
	const [{ playlists }] = useStateValue()
	return (
		<div className='sidebar'>
			<img className='sidebar__logo' src={logo} alt='spotify-logo' />
			<SidebarOption title='Home' Icon={HomeIcon} />
			<SidebarOption title='Search' Icon={SearchIcon} />
			<SidebarOption title='Your Library' Icon={LibraryMusicIcon} />

			<br />
			<hr />
			<div className='sidebar__playlistsContainer'>
				{playlists?.items?.map(playlist => (
					<SidebarOption
						title={playlist.name}
						key={playlist.name}
						playlist={playlist}
					/>
				))}
			</div>
		</div>
	)
}

export default Sidebar
