// * UTILS
export const EMPTY_STR = ''
export const SPACE = ' '
export const LOGO_COLOR = '#1ed760'
const MAIN_BG_COLOR = 'rgb(16, 16, 16)'
export const ICON_COLOR = '#fff'
export const MOBILE_SCREEN_WIDTH = 1000
// * ID'S
const GUEST_ID = 'Guest000'
const ID_LENGTH = 5

// * FEED
const DEMO_POSTS_NUM = 10
const RANDOM_NAMES = ['Jermia Defoe', 'Gabriel Jesus Christ', 'Mike Johnson', 'Kevin Davies', 'Barry Kane', 'Gareth Snale', 'Cristi Ronalda', 'Lya Messica', 'Luka Nordic', 'Timmo Cookie']

// * SQUEAK STATS
const LIKE = 1
const UNLIKE = -1
const LIKES_FIELD = 'like'
const COMMENTS_FIELD = 'comment'
const BOOKMARKS_FIELD = 'bookmark'
const DEMO_PHOTOS = [
    'https://picsum.photos/518/288',
    'https://picsum.photos/522/292',
    'https://picsum.photos/516/298',
    'https://picsum.photos/516/258',
    'https://static.scientificamerican.com/sciam/assets/Image/2019/spinningblackhole.gif',
    'https://media1.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif',
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR,
    EMPTY_STR
]
// * USERS
const NO_PROFILE_IMG_URL = 'https://source.boringavatars.com/beam/120/Stefan?colors=1DB954'
const NO_BG_WALLPAPER_URL = 'https://wallpapers.com/images/featured/no-0ofqwe6s51ohii2t.jpg'

// 'https://source.boringavatars.com/beam/120/Stefan?colors=1DB954'
//
// * UTIL FUNCTIONS
const DEBOUNCE_DELAY = 0 // ? in ms

// * TRENDS NUMBER
const TRENDS_NUMBER = 5

// * SPOTIFY
const DEMO_PLAYLISTS = [
    { title: 'Dont smile at me', artist: 'Billie Eilish', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Billie_Eilish_-_Don%27t_Smile_at_Me.png' }
    // { title: 'MMLP - Eminem', artist: 'Eminem', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg' },
    // { title: 'Life Of Pablo', artist: 'Ye', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4d/The_life_of_pablo_alternate.jpg' },
    // {
    //     title: 'Ok Computer',
    //     artist: 'Radiohead',
    //     imgUrl: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png'
    // },
    // { title: 'This is Lewis Capaldi', artist: 'Lewis Capaldi', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/Lewis_Capaldi_-_Divinely_Uninspired_to_a_Hellish_Extent.png' },
    // { title: 'X - Deluxe', artist: 'Ed Sheeran', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ad/X_cover.png' },
    // { title: 'Abbey Road', artist: 'The Beatles', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg' },
    // { title: 'Hotel Califonria', artist: 'The Eagles', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg' }
]

export const constsService = {
    DEMO_POSTS_NUM,
    LIKE,
    UNLIKE,
    LIKES_FIELD,
    GUEST_ID,
    ID_LENGTH,
    NO_PROFILE_IMG_URL,
    NO_BG_WALLPAPER_URL,
    COMMENTS_FIELD,
    DEBOUNCE_DELAY,
    MAIN_BG_COLOR,
    DEMO_PHOTOS,
    RANDOM_NAMES,
    TRENDS_NUMBER,
    BOOKMARKS_FIELD,
    DEMO_PLAYLISTS
}
