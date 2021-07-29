import React from 'react'
import './Header.css'
import { useStateValue } from './StateProvider'
import SearchIcon from '@material-ui/icons/Search'
import { Avatar } from '@material-ui/core'

const Header = () => {
    const [{ user }] = useStateValue()
    return (
        <div className='header'>
            <div className="header__left">
                <SearchIcon />
                <input type="text" placeholder='Search for Artistes, Songs, Albums' />
            </div>
            <div className="header__right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header
