import {requiredDataApi} from "./perm.js";
import { render } from "./render.js";

const getPosition = async (pos) => {
    const dataApi = await requiredDataApi(pos)
    const data = await sendDataRender(dataApi)
    
}
navigator.geolocation.getCurrentPosition(getPosition)


const sendDataRender = (arrDataApi) => {

    let dataNecessary = {}

    const getDescription = (jsonClimate) => {
        dataNecessary.descriptionClimate = []
        for(let i = 0; i < jsonClimate.daily.length; i++){
            dataNecessary.descriptionClimate.push(jsonClimate.daily[i].weather[0].description)
            //console.log(dataNecessary.descriptionClimate)
        }
    }
    getDescription(arrDataApi[0])

    const location = (city) => {
        dataNecessary.nameCity = city
    }
    location(arrDataApi[1])

    const currentData = (jsonClimate) => {
        dataNecessary.currentClimate = {
            humidity: jsonClimate.current.humidity + "%",
            temp: jsonClimate.current.temp.toFixed() + "°",
            description: jsonClimate.current.weather[0].description,
            icon: "http://openweathermap.org/img/wn/" + jsonClimate.current.weather[0].icon + ".png"
        } 
    }
    currentData(arrDataApi[0])

    const calcDates = () => {
        const date = new Date()
        const daysWeek = ["Domingo", "Segunda", "Terça",
        "Quarta", "Quinta", "Sexta", "Sabádo"]
        
        const addZero = (num) => {
        return num < 10 ? `0${num}` : num;
        }

        dataNecessary.time = {
            minutes: addZero(date.getMinutes()),
            hours: addZero(date.getHours()),
            day: date.getDate(),
            dayWeek: daysWeek[date.getDay()],
            month: date.getMonth()+1,
            year: date.getFullYear()
        }
    }
    calcDates()
    console.log(arrDataApi);
    
    
    render(dataNecessary)


}

/*


// console.log(navigator)   Comment 

const render = ((info) => {
    const cityDate = {
        city: document.querySelector("#name-city"),
        hours: document.querySelector("#hours"),
        day: document.querySelector("#day"),
        date: document.querySelector("#date")
    }
    cityDate.city.innerHTML = info.results.city_name

    setInterval(() => {
        let dataDate = calcDates()

        cityDate.hours.innerHTML = `${dataDate.hours}:${dataDate.minutes} <span id="am-pm">${dataDate.pmAm}</span>`   
        cityDate.day.innerHTML = `${dataDate.daysWeek[dataDate.day]}`
        cityDate.date.innerHTML = ` ${info.results.date}` 
    }, 1000);
    
    const temperClimate = {
        temper: document.querySelector("#text-temper"),
        iconTemper: document.querySelector("#icon-climate-today"),
        climate: document.querySelector("#text-climate"),
        humidity: document.querySelector("#percent-humidity")
    }
    
    temperClimate.temper.innerHTML = `${info.results.temp}°`
    temperClimate.climate.innerHTML = `${info.results.description}`
    temperClimate.humidity.innerHTML = `${info.results.humidity}%`

    const dayWeek = document.querySelector("#week")
    const infoForecast = info.results.forecast

    infoForecast.map((i) =>{
        
        let retIconClimate = iconClimate(i)
        //console.log(retIconClimate)
        const infoWeek = `
        <div class="day-week">
            <h1 id="name-day">${i.weekday}</h1>
            <img class="icon-climate" src="${retIconClimate.srcClimate}" alt="nuvem">
            <div class="temper">
                <i class="fa fa-thermometer-full"></i>
                <p class="text-temper" id="temp-max">${i.max}°</p>
            </div>
            <div class="temper">
                <i class="fa fa-thermometer-0"></i>
                <p class="text-temper" id="temp-min">${i.min}°</p>
            </div>
        </div>
        `
        temperClimate.iconTemper.src = retIconClimate.iconToday 
        dayWeek.innerHTML += infoWeek
    })
})



const iconClimate = ((i) => {
        let desc = i.description
        desc = desc.replace(' ', '_')
        const icons = {
        iconToday: ' ',
        srcClimate: ' ' 
        }

        const climate = {
         "Parcialmente_nublado": "src/images/sun.png",
         "Tempo_limpo": "src/images/sun (1).png",
         "Chuvas_esparsas": "src/images/rain.png",
         "Tempo_nublado": "src/images/cloudy.png"
        }   
        for( let i in climate){
            if(desc == i){
                icons.srcClimate = climate[i]
            }
            icons.iconToday = climate[i]
        }
        return icons
})*/