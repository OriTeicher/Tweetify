export const utilService = {
    getRandomIntInclusive,
    getRandomColor,
    getCurrentDate,
    getInitials,
    generateRandomSentences,
    generateId,
    getJoinedDateFormat,
    debounce
}

function generateId(idLength: number = 5) {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let id = ''
    for (let i = 0; i < idLength; i++) {
        id += letters.charAt(getRandomIntInclusive(0, letters.length - 1))
    }
    return id
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor(): string {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)

    const color = `${red.toString(16)}${green.toString(16)}${blue.toString(16)}`

    return color
}

function getCurrentDate(timeStamp: number): string {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const date = new Date(timeStamp)
    const currentDate = new Date()
    const timeDiff = Math.abs(currentDate.getTime() - date.getTime())
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))
    const minutesDiff = Math.floor(timeDiff / (1000 * 60))

    if (hoursDiff < 24) {
        if (hoursDiff === 0) {
            if (minutesDiff === 0) return 'now'
            else return `${minutesDiff}m`
        } else {
            return `${hoursDiff}h`
        }
    }

    const day = date.getDate().toString().padStart(2, '0')
    const month = months[date.getMonth()]

    const formattedDate = `${month} ${day}`
    return formattedDate
}

function getInitials(fullName: string) {
    if (!fullName) return
    const nameParts = fullName.split(' ')
    const firstInitial = nameParts[0].charAt(0)
    const lastInitial = nameParts[nameParts.length - 1].charAt(0)
    const initials = `${firstInitial}${lastInitial}`
    return initials
}

function generateRandomSentences(sentencesCount: number) {
    const sentences = [
        'The Premier League has been won by six different clubs: Manchester United, Manchester City, Chelsea, Arsenal, Blackburn Rovers, and Leicester City. ',
        'Manchester City holds the record for the most points in a single Premier League season, with 100 points in the 2017-2018 campaign. ',
        'The Premier League introduced goal-line technology in the 2013-2014 season to help determine whether the ball has crossed the goal line. ',
        'Cristiano Ronaldo scored the fastest hat-trick in Premier League history, taking just 4 minutes and 33 seconds to score three goals. ',
        'The Premier League has the highest average stadium attendance of any football league in the world. ',
        "Since its inception, the Premier League has produced numerous iconic moments, including Sergio Aguero's last-minute title-winning goal for Manchester City in 2012. ",
        'Liverpool holds the record for the most goals scored by a team in a single Premier League season, netting 106 goals in the 2013-2014 season. ',
        'The Premier League trophy weighs approximately 4.5 kilograms and is made of solid sterling silver. ',
        'Only four clubs have been ever-present in the Premier League since its formation: Arsenal, Chelsea, Everton, and Manchester United. ',
        'The record for the most clean sheets in a single Premier League season is held by Petr Cech, who kept 24 clean sheets for Chelsea in the 2004-2005 season. ',
        "Manchester United's Ryan Giggs holds the record for the most Premier League assists, providing 162 assists during his career. ",
        'The Premier League has a global television audience of around 4.7 billion people. ',
        'Alan Shearer is the all-time leading goal scorer in the Premier League, netting 260 goals during his career. ',
        'The first-ever Premier League goal was scored by Brian Deane for Sheffield United against Manchester United on August 15, 1992. ',
        'The fastest goal in Premier League history was scored by Shane Long, who found the net after just 7.69 seconds for Southampton against Watford in 2019. ',
        "The Premier League's highest-scoring match ended in a 4-4 draw between Tottenham Hotspur and Arsenal in 2008. ",
        "Eric Cantona is famously known for his quote, 'When the seagulls follow the trawler, it is because they think sardines will be thrown into the sea.' ",
        'The Premier League has had some iconic managers, including Sir Alex Ferguson, Arsène Wenger, and José Mourinho. ',
        'In the 2015-2016 season, Leicester City won the Premier League title against all odds, having started the season as 5000-1 outsiders. ',
        "Peter Crouch, the former Premier League striker, claims that he has never been booked for diving because 'it's hard to get up off the floor when you're 6ft 7in.' ",
        'Former Manchester United manager Sir Alex Ferguson used to chew gum during matches, and it is estimated that he went through approximately 30 pieces of gum per match. ',
        'West Ham United once signed a player named Paolo Di Canio, who pushed over the referee after being shown a red card. ',
        'Liverpool once played a match against Sunderland in 2016 where the game had to be stopped temporarily because a black cat ran onto the pitch. ',
        "Swansea City's manager, Bob Bradley, made history when he relegated 200 times (not really) "
    ]
    let res = ''
    for (let i = 0; i < sentencesCount; i++)
        res += sentences[getRandomIntInclusive(0, sentences.length - 1)]
    return res
}

function getJoinedDateFormat() {
    const currentDate = new Date()
    let month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    return `${month < 10 ? '0' + month : month}/${year}`
}

function debounce(func: Function, delay: any) {
    let timeoutId: ReturnType<typeof setTimeout> | null

    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            func(...args)
            timeoutId = null
        }, delay)
    }
}
