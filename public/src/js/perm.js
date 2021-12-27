export const requiredDataApi = async (position) => { 
    let dataApi = []
    let lat = position.coords.latitude
    let lon = position.coords.longitude

    const getValue = (valueRequested) => {
        dataApi.push(valueRequested)
    }

    const fetchLocation = async (lat, lon) => { 
        const responseLocation = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        const jsonLocation = await responseLocation.json()
        .then(jsonLocation =>{ 
            getValue(jsonLocation.address.city)
        })    
    }

    const fetchClimate = async (lat, lon) => {
        const responseClimate = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts,y&units=metric&lang=pt_br&appid=5e8a917cbea4cab26c6a9cccdc094692`)
        const jsonClimate = await responseClimate.json()
         .then(jsonClimate => {
            getValue(jsonClimate)
        })
    }
    
    await fetchClimate(lat,lon)
    await fetchLocation(lat, lon)
    return dataApi

}

/*

export const dataApiClimate = (position) => {   
    let lat = position.coords.latitude
    let lon = position.coords.longitude

    const fetchLocation = async (lat, lon) => { 
        const responseLocation = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        const jsonLocation = await responseLocation.json()
        return jsonLocation.address.town
    }

    const fetchClimate = async (lat, lon) => {
        const responseClimate = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&lang=pt_br&appid=5e8a917cbea4cab26c6a9cccdc094692`)
        const jsonClimate = await responseClimate.json()
        return jsonClimate
    }

    return {
        promiseNameCity: fetchLocation(lat, lon),
        promiseDataClimate: fetchClimate(lat,lon) 
    }
}
*/