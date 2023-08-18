const ELEMENTS_HTML = {
    INFO_WINDOW : {
        city : document.querySelector('.city'),
        temperature : document.querySelector('.temperature'),
        speed : document.querySelector('.speed'),
        cloudiness : document.querySelector('.cloudiness')
    },
    TEHNICAL_PARTS : {
        MAIN_INPUT : document.querySelector('.main_input'),
        FORM_MAIN_INPUT : document.querySelector('.form_main_input'),
        BUTTON_ADDING_FAVORITE_CITY :document.querySelector('.icon_add_favorite'),
        window_favorite : document.querySelector('.wrapper_favorite_city')
    },
    INFO_CITY : {} 
}  

let ARRAY_FAVORITE_CITES = []

async function requestInfoWeather(city) {

    let currentCity = localStorage.getItem('city')
    currentCity = city
    localStorage.setItem('city', currentCity)

    let apiKey = '25f2c7227652f33189d4bd085538dc2a'
    let url = `http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&APPID=${apiKey}`

    await fetch(url)
        .then(response => response.json())
        .then(data => ELEMENTS_HTML.INFO_CITY = {...data} )

    writingIngo(ELEMENTS_HTML.INFO_CITY, city)
}

function writingIngo (data, dataCity) {
    ELEMENTS_HTML.INFO_WINDOW.city.textContent = data.list[0].name
    ELEMENTS_HTML.INFO_WINDOW.temperature.textContent =  data.list[0].main.temp
    ELEMENTS_HTML.INFO_WINDOW.speed.textContent = data.list[0].wind.speed
    ELEMENTS_HTML.INFO_WINDOW.cloudiness.textContent = data.list[0].weather[0].description
}

function updateListLocalStorage () {
    let currentList = localStorage.getItem(".currentList")
    currentList = ARRAY_FAVORITE_CITES

    localStorage.setItem('currentList', currentList)
}

function newRequestData () {
    let name_city = document.querySelectorAll('.city_name')

    name_city.forEach(item => {
        item.addEventListener('click', () => {
            let city = item.textContent
            requestInfoWeather(city)
        })        
    })
}

function deleteFavoriteCity () {
    let delete_favorite_city = document.querySelectorAll('.delete_city')

    delete_favorite_city.forEach(item => {
        item.addEventListener('click', () => {

            const parentElement = item.parentNode
            const name_city_of_list = parentElement.querySelector('span').textContent
            
            let index = ARRAY_FAVORITE_CITES.indexOf(name_city_of_list)

            if (ARRAY_FAVORITE_CITES.length > 0) {
                ARRAY_FAVORITE_CITES = [...ARRAY_FAVORITE_CITES.slice(0, index), ...ARRAY_FAVORITE_CITES.slice(index + 1)]
            } 

            writimgFavoriteCites()  
            updateListLocalStorage()
        })
    })
}

function writimgFavoriteCites () {
    const cites = ARRAY_FAVORITE_CITES.map( item => sample(item) )

    ELEMENTS_HTML.TEHNICAL_PARTS.window_favorite.innerHTML = cites
    deleteFavoriteCity()
    newRequestData()
}

function localStorageFavoriteCites () {
    
}

const sample = (item) => {
    return (
        `
        <div class="item_favorite_city">
            <span class='city_name'>${item}</span>
            <span class="delete_city">x</span>
        </div>        
        `
    )
}

function currentCityLocalStorage () {
    if (localStorage.getItem('city')) {
        let city = localStorage.getItem('city')
        requestInfoWeather(city)
    } else {
        console.log('похоже вы тут в первый раз');
    }    
}

function currentListLocalStorage () {
    if (localStorage.getItem('currentList')) {
       let currentList = localStorage.getItem('currentList').split(',')
        currentList.forEach(item => {
            ARRAY_FAVORITE_CITES.push(item)
        })
        writimgFavoriteCites()
    } else {
        console.log('похоже вы здесь впервые ');
    }
}

ELEMENTS_HTML.TEHNICAL_PARTS.FORM_MAIN_INPUT.onsubmit = () => {
    event.preventDefault()

    requestInfoWeather(ELEMENTS_HTML.TEHNICAL_PARTS.MAIN_INPUT.value)
}

ELEMENTS_HTML.TEHNICAL_PARTS.BUTTON_ADDING_FAVORITE_CITY.addEventListener('click', () => {

    if (ARRAY_FAVORITE_CITES.indexOf(ELEMENTS_HTML.INFO_CITY.list[0].name) === -1) {

        ARRAY_FAVORITE_CITES.push(ELEMENTS_HTML.INFO_CITY.list[0].name)
        
        writimgFavoriteCites()        
    } else {
        alert('Этот город уже есть в избранных !')
    }

    updateListLocalStorage()
    deleteFavoriteCity()
    newRequestData()
})

currentCityLocalStorage()
currentListLocalStorage()
deleteFavoriteCity()