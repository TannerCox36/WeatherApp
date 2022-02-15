let weather = {
    apiKey: "04ec61f6cda54fda9aac04e1833a6690",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&appid="
            + this.apiKey
        )
          .then((response) => response.json())
          .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText = this.convertTemp(temp) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " 
          + this.convertSpeed(speed) + "mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https:/source.unsplash.com/1600x900/?" + name + "')"
    },

    convertTemp: function(temp) {
        fahrenheit = (temp - 273.15) * (9/5) + 32;
        fahrenheit = Math.round(fahrenheit * 10) / 10;
        return fahrenheit;
    },

    convertSpeed: function(speed) {
        mph = speed / 1.609;
        mph = Math.round(mph * 10) / 10;
        return mph;
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Cleveland");

document.querySelector(".savedCitys button").addEventListener("click", function() {
    weather.search();
});