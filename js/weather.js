// a831eca6f4ec47aa8b3c8e4219d4c64d
window.addEventListener("load", () => {
    let lon;
    let lat;
    let key = "a831eca6f4ec47aa8b3c8e4219d4c64d";
    let city = document.querySelector(".city");
    let tempValue = document.querySelector(".value");
    let tempDescription = document.querySelector(".description");
    let weatherIcon = document.querySelector(".weather-icon-img");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude
            lat = position.coords.latitude

            const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`;

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    //  console.log(data)
                    const{ city_name, temp} = data.data[0]
                    const { description, icon} = data.data[0].weather

                    city.textContent = city_name;
                    tempValue.textContent = Math.floor(temp) + "°C";
                    tempDescription.textContent = description;
                    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;          
                })

        })
    }
})
