import React from 'react'
import './Body.css'
import Feed from './Feed'
import Header from './Header'
import Playlist from './Playlist'
import { useStateValue } from './StateProvider'

const Body = () => {
	const [{ showFeed }] = useStateValue()
	return (
		<div className='body'>
			<Header />
			{showFeed ? <Feed /> : <Playlist />}
		</div>
	)
}

export default Body
