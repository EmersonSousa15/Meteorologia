export const render = async (allData) => {

    const infor_day = document.querySelector("#infor-day")
    infor_day.innerHTML = `
        <section class="city-date"> 
            <div class="city-hours">
                <h1 id="name-city">${allData.nameCity}</h1>
                <p id="hours">${allData.time.hours}:${allData.time.minutes}</p>
            </div>
            <div class="date-day">
                <h1 id="day">${allData.time.dayWeek}</h1>
                <p id="date">${allData.time.day}/${allData.time.month}/${allData.time.year}</p>
            </div>
        </section>

        <section class="temper-climate">
            <div class="temper-icon">
                <img src="${allData.currentClimate.icon}" class="icon-climate" alt="icon-climate">
                <span id="text-temper">${allData.currentClimate.temp}</span>
                </div>
                <div class="climate">
                    <h4 id="text-climate">${allData.currentClimate.description}</h4>
                <div class="humidity">
                    <i class="fa fa-tint"></i>
                    <span id="percent-humidity">${allData.currentClimate.humidity}</span>
                </div>
            </div>
        </section>
    `

    const infor_week = document.querySelector("#week")
    infor_week.innerHTML = ''

    for (let i = 0; i < allData.weekClimate.index; i++) {
        let day = `
            <section class="day-week">
                <h1 id="name-day">${allData.weekClimate.day[i]}</h1>
                <img class="icon-climate" src=${allData.weekClimate.icon[i]} alt="nuvem">
                <div class="temper">
                    <i class="fa fa-thermometer-full"></i>
                    <p class="text-temper" id="temp-max">${allData.weekClimate.tempMax[i]}</p>
                </div>
                <div class="temper">
                    <i class="fa fa-thermometer-0"></i>
                    <p class="text-temper" id="temp-min">${allData.weekClimate.tempMin[i]}</p>
                </div>
            </section>
        `
        infor_week.innerHTML += day
    }
    
}