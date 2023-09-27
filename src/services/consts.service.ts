// * ID'S
const GUEST_ID = 'GUEST'
const ID_LENGTH = 5

// * FEED
const DEMO_POSTS_NUM = 10
const MAIN_BG_COLOR = 'rgb(16, 16, 16)'
const RANDOM_NAMES = ['Jermia Defoe', 'Gabriel Jesus Christ', 'Mike Johnson', 'Kevin Davies', 'Barry Kane', 'Gareth Snale', 'Cristi Ronalda', 'Lya Messica', 'Luka Nordic', 'Timmo Cookie']

// * SQUEAK STATS
const LIKE = 1
const UNLIKE = -1
const LIKES_FIELD = 'like'
const COMMENTS_FIELD = 'comment'
const DEMO_PHOTOS = [
    'https://picsum.photos/518/288',
    'https://picsum.photos/522/292',
    'https://picsum.photos/516/298',
    'https://picsum.photos/516/258',
    'https://static.scientificamerican.com/sciam/assets/Image/2019/spinningblackhole.gif',
    'https://media1.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
]
// * USERS
const NO_PROFILE_IMG_URL = 'https://source.boringavatars.com/beam/120/Stefan?colors=1DB954'
const NO_BG_WALLPAPER_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1bTnHSbBRSJZCtgfSdOM2dt8kRhncXuLlg&usqp=CAU'

// 'https://source.boringavatars.com/beam/120/Stefan?colors=1DB954'
//
// * UTIL FUNCTIONS
const DEBOUNCE_DELAY = 0 // ? in ms

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
    RANDOM_NAMES
}
