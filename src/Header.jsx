import React, { useState, useEffect } from 'react'
import './Header.css'
import { useStateValue } from './StateProvider'
import SearchIcon from '@material-ui/icons/Search'
import { Avatar } from '@material-ui/core'

const Header = () => {
	const [{ user, spotify }] = useStateValue()
	const [searchText, setSearchText] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [showResults, setShowResults] = useState(false)

	useEffect(() => {
		if (!searchText) {
			setShowResults(false)
			return setSearchResults([])
		}
		setShowResults(true)
		let cancel = false
		spotify
			.searchTracks(searchText, { limit: 20 })
			.then(res => {
				if (cancel) return
				setSearchResults(
					res.tracks.items.map(item => {
						const smallestAlbumImage = item.album.images.reduce(
							(smallest, image) => {
								if (image.height < smallest.height) return image
								return smallest
							},
							item.album.images[0]
						)
						return {
							artist: item.artists[0].name,
							title: item.name,
							uri: item.uri,
							albumImg: smallestAlbumImage.url,
						}
					})
				)
			})
			.catch(err => console.log(err))
		return () => (cancel = true)
	}, [searchText, spotify])

	return (
		<div className='header'>
			<div className='header__left'>
				<SearchIcon />
				<input
					type='text'
					placeholder='Search for Artistes, Songs, Albums'
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
			</div>
			<div className='header__right'>
				<Avatar src={user?.images[0]?.url} alt={user?.display_name} />
				<h4>{user?.display_name}</h4>
			</div>
			<div className={`header__searchResults ${showResults && 'show'}`}>
				{searchResults.map((track, index) => (
					<div key={index}>
						<img src={track.albumImg} alt={track.title} />
						<div>
							<div className='header__track_title'>{track.title}</div>
							<div className='header__track_artist'>{track.artist}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Header
