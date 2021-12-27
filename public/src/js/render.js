export const render = async (allData) => {
    console.log(allData);
    const infor_day = document.querySelector("#infor-day")
    infor_day.innerHTML =
    `

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
                <i class="fa fa-umbrella"></i>
                <span id="percent-humidity">${allData.currentClimate.humidity}</span>
            </div>
        </div>
    </section>


    `
}