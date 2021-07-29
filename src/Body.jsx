import React from 'react'
import './Body.css'
import Header from './Header'
import { useStateValue } from './StateProvider'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from './SongRow';

const Body = () => {
    const [{ discover_weekly }] = useStateValue()
    return (
        <div className='body'>
            <Header />
            <div className="body__info">
                <img src={discover_weekly?.images[0].url} alt="user" />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon className='body__shuffle' />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {discover_weekly?.tracks.items.map(item => (
                    <SongRow track={item.track} key={item.track.name} />
                ))}
            </div>
        </div>
    )
}

export default Body
