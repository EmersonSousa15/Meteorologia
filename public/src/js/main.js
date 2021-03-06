import {requiredDataApi} from "./perm.js";
import { render } from "./render.js";

const getPosition = async (pos) => {
    if(pos.code){
        alert("Permita o acesso a localização para ver a informações da sua cidade")
    }else{
        const dataApi = await requiredDataApi(pos)
        const data = await sendDataRender(dataApi)
    }
}

navigator.geolocation.getCurrentPosition(getPosition, getPosition)        

setInterval(() => {
    navigator.geolocation.getCurrentPosition(getPosition)        
},30000)

let dataNecessary = {}

const sendDataRender = (arrDataApi) => {

    const location = (city) => {
        dataNecessary.nameCity = city
    }
    location(arrDataApi[1])

    const currentData = (jsonCurrent) => {
        dataNecessary.currentClimate = {
            humidity: `${jsonCurrent.humidity}%`,
            temp: `${jsonCurrent.temp.toFixed()}°`,
            description: jsonCurrent.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${jsonCurrent.weather[0].icon}.png`
        } 
    }
    currentData(arrDataApi[0].current)

    const weekData = (jsonDaily) => {
        dataNecessary.weekClimate = {
            day: [],
            humidity: [],
            tempMax: [],
            tempMin: [],
            icon: [],
            index: 0
        }

        for(let i = 0; i < jsonDaily.length; i++){
            dataNecessary.weekClimate.humidity.push(jsonDaily[i].humidity)
            dataNecessary.weekClimate.tempMax.push(jsonDaily[i].temp.max.toFixed())
            dataNecessary.weekClimate.tempMin.push(jsonDaily[i].temp.min.toFixed())
            dataNecessary.weekClimate.icon.push(`http://openweathermap.org/img/wn/${jsonDaily[i].weather[0].icon}.png`)
            dataNecessary.weekClimate.day.push(new Date(jsonDaily[i].dt * 1000).getDay())
            dataNecessary.weekClimate.index++
        } 
        
        const nameDay = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

        dataNecessary.weekClimate.day.forEach((numDay,index) => {
            dataNecessary.weekClimate.day[index] = nameDay[numDay]
        })
       
    }
    weekData(arrDataApi[0].daily)

    const calcDates = () => {
        const date = new Date()
        const daysWeek = ["Domingo", "Segunda", "Terça",
        "Quarta", "Quinta", "Sexta", "Sábado"]
        
        const addZero = (num) => {
        return num < 10 ? `0${num}` : num;
        }

        dataNecessary.time = {
            minutes: addZero(date.getMinutes()),
            hours: addZero(date.getHours()),
            day: addZero(date.getDate()),
            dayWeek: daysWeek[date.getDay()],
            month: addZero(date.getMonth()+1),
            year: date.getFullYear()
        }
    }
    calcDates()
    render(dataNecessary)    
}