import React, { useEffect } from 'react'
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import RepeatIcon from '@material-ui/icons/Repeat'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import { Grid, Slider } from '@material-ui/core'
import { useStateValue } from './StateProvider'
import { SET_ITEM, SET_PLAYING } from './reducer'

const Footer = () => {
	const [{ playing, spotify, item }, dispatch] = useStateValue()

	useEffect(() => {
		spotify?.getMyCurrentPlaybackState().then(tr => {
			dispatch({
				type: SET_ITEM,
				item: tr.item,
			})
		})
	}, [dispatch, spotify])

	const handlePlayPause = () => {
		playing
			? spotify.pause().catch(err => console.log(err))
			: spotify.play().catch(err => console.log(err))
		dispatch({
			type: SET_PLAYING,
			playing: !playing,
		})
	}

	const skipPrev = async () => {
		spotify.skipToPrevious().catch(err => console.log(err))
		spotify.getMyCurrentPlaybackState().then(tr => {
			dispatch({
				type: SET_ITEM,
				item: tr.item,
			})
			dispatch({
				type: SET_PLAYING,
				playing: true,
			})
		})
	}

	const skipNext = () => {
		spotify.skipToNext().catch(err => console.log(err))
		spotify.getMyCurrentPlaybackState().then(tr => {
			dispatch({
				type: SET_ITEM,
				item: tr.item,
			})
			dispatch({
				type: SET_PLAYING,
				playing: true,
			})
		})
	}

	return (
		<div className='footer'>
			<div className='footer__left'>
				<img
					className='footer__albumLogo'
					src={
						item?.album?.images[0].url ||
						'https://www.seekpng.com/png/small/120-1206652_movie-avatar-disc-circle.png'
					}
					alt={item?.album?.name}
				/>
				<div className='footer__songInfo'>
					<h4>{item?.name}</h4>
					<p>{item?.artists[0].name}</p>
				</div>
			</div>
			<div className='footer__center'>
				<ShuffleIcon className='footer__icon' />
				<SkipPreviousIcon onClick={skipPrev} className='footer__icon' />
				{playing ? (
					<PauseCircleOutlineIcon
						onClick={handlePlayPause}
						className='footer__icon'
						fontSize='large'
					/>
				) : (
					<PlayCircleOutlineIcon
						onClick={handlePlayPause}
						className='footer__icon'
						fontSize='large'
					/>
				)}
				<SkipNextIcon onClick={skipNext} className='footer__icon' />
				<RepeatIcon className='footer__icon' />
			</div>
			<div className='footer__right'>
				<Grid container spacing={2}>
					<Grid item>
						<PlaylistPlayIcon />
					</Grid>
					<Grid item>
						<VolumeDownIcon />
					</Grid>
					<Grid item xs>
						<Slider aria-labelledby='continuous-slider' />
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default Footer
