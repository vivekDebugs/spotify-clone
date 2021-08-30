import React from 'react'
import './SongRow.css'

const SongRow = ({ track }) => {
	const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
		if (image.height < smallest.height) return image
		return smallest
	}, track.album.images[0])

	return (
		<div className='songRow'>
			<img
				className='songRow__album'
				src={
					smallestAlbumImage?.url ||
					'https://www.seekpng.com/png/small/120-1206652_movie-avatar-disc-circle.png'
				}
				alt={track?.name}
			/>
			<div className='songRow__info'>
				<h1>{track.name}</h1>
				<p>
					{' '}
					{track.artists.map(artist => artist.name).join(', ')} -{' '}
					{track.album.name}{' '}
				</p>
			</div>
		</div>
	)
}

export default SongRow
