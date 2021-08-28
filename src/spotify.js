export const authEndpoint = 'https://accounts.spotify.com/authorize'

const redirectUri = 'http://localhost:3000/'
const clientId = 'e9b56a259717406184574bc1382acb86'

const scopes = [
	'streaming',
	'user-read-email',
	'user-read-private',
	'user-library-read',
	'user-library-modify',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-top-read',
	'playlist-read-private',
	'playlist-read-collaborative',
	'user-follow-read',
]

export const getTokenFromUrl = () => {
	return window.location.hash
		.substring(1)
		.split('&')
		.reduce((initial, item) => {
			let parts = item.split('=')
			initial[parts[0]] = decodeURIComponent(parts[1])
			return initial
		}, {})
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
	'%20'
)}&response_type=token&show_dialogue=true`
