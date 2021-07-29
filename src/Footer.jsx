import React from 'react'
import './Footer.css'
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from '@material-ui/core'
import { useStateValue } from './StateProvider';
import { SET_ITEM, SET_PLAYING } from './reducer';

const Footer = () => {
    const [{ playing, spotify }, dispatch] = useStateValue()

    // useEffect(() => {
    //     spotify.getMyCurrentPlaybackState().then(tr => {
    //         dispatch({
    //             type : SET_ITEM,
    //             item : tr.item
    //         })
    //     })
    // }, [dispatch, spotify])

    const handlePlayPause = () => {
        dispatch({
            type : SET_PLAYING,
            playing : !playing
        })
    }

    const skipPrev = () => {
        spotify.skipToPrevious()
        spotify.getMyCurrentPlaybackState().then(tr => {
            dispatch({
                type : SET_ITEM,
                item : tr.item
            })
            dispatch({
                type : SET_PLAYING,
                playing : true
            })
        })
    }

    const skipNext = () => {
        spotify.skipToNext()
        spotify.getMyCurrentPlaybackState().then(tr => {
            dispatch({
                type : SET_ITEM,
                item : tr.item
            })
            dispatch({
                type : SET_PLAYING,
                playing : true
            })
        })
    }

    return (
        <div className='footer'>
            <div className="footer__left">
                <img className='footer__albumLogo' src="https://yt3.ggpht.com/ytc/AKedOLRlnp-gAK0TO1J5cCwHhAJBPICMsIKqAXO5RY5q09M=s900-c-k-c0x00ffffff-no-rj" alt="album" />
                <div className="footer__songInfo">
                    <h4>Yeah!</h4>
                    <p>Usher</p>
                </div>
            </div>
            <div className="footer__center">
                <ShuffleIcon className='footer__icon' />
                <SkipPreviousIcon onClick={skipPrev} className='footer__icon' />
                {
                    playing ? <PauseCircleOutlineIcon onClick={handlePlayPause} className='footer__icon' fontSize='large' /> :
                        <PlayCircleOutlineIcon onClick={handlePlayPause} className='footer__icon' fontSize='large' />
                }
                <SkipNextIcon onClick={skipNext} className='footer__icon' />
                <RepeatIcon className='footer__icon' />
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
