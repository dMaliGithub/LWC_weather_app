import { LightningElement } from 'lwc';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons';
import getWeatherDetails from '@salesforce/apex/weatherAppController.getWeatherDetails'

const API_KEY = '4f5a5baa18552a2cde81440f459c2db8'

export default class WeatherApp extends LightningElement {

    clearIcon=WEATHER_ICONS+'/weatherAppIcons/clear.svg';
    cloudIcon=WEATHER_ICONS+'/weatherAppIcons/cloud.svg';
    dropletIcon=WEATHER_ICONS+'/weatherAppIcons/droplet.svg';
    hazeIcon=WEATHER_ICONS+'/weatherAppIcons/haze.svg';
    mapIcon=WEATHER_ICONS+'/weatherAppIcons/map.svg';
    rainIcon=WEATHER_ICONS+'/weatherAppIcons/rain.svg';
    snowIcon=WEATHER_ICONS+'/weatherAppIcons/snow.svg';
    stromIcon=WEATHER_ICONS+'/weatherAppIcons/strom.svg';
    thermometerIcon=WEATHER_ICONS+'/weatherAppIcons/thermometer.svg';
    arrowBackIcon=WEATHER_ICONS+'/weatherAppIcons/arrow-back.svg';

    cityName='';
    loadingText='';
    isError=false;
    data 
    icon
    get dynamicStyle(){
        return this.isError ? 'error-msg' : 'success-msg';
    }

    searchHandler(event){
        this.cityName = event.target.value;
        if(this.cityName === '')
        {
            this.loadingText = '';
        }
    }

    submitHandler(event){
        event.preventDefault()
        this.fetchData()
    }

    async fetchData(){
        this.loadingText = "Fetching weather details...";
        this.isError=false;
        console.log(this.cityName);

        getWeatherDetails({input:this.cityName}).then(result=>{
            this.weatherDetails(JSON.parse(result))
          }).catch((error)=>{
            console.error(error)
            this.response = null
            this.loadingText = "Something went wrong"
            this.isError = true
          })

        // this is a client side call to weather api: handled at component level which is not secured and suitable for bulk data
        // recommended to use server side call: Apex controller classes
        // website:: https://openweathermap.org/ 
        // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

        /********
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`
        const response = await fetch(URL);
        const result = await response.json();  
        ****************/
        // console.log("response:", response);
        // // console.log("res:", response.status);
        // console.log("result: ", result);

       /* if(result.cod === 200){
            this.loadingText = '';
            const city = result.name;
            const country = result.sys.country;
            const {description,id, icon} = result.weather[0];
            const {temp,feels_like,humidity} = result.main;

            // handle image display logic based on weather id
            // refer below site for more info
            // https://openweathermap.org/weather-conditions
            if(id === 800){
                this.icon = this.clearIcon
              } else if((id>=200 && id <=232) || (id>=600 && id <=622)){
                this.icon = this.stormIcon
              } else if(id>=701 && id <=781){
                this.icon = this.hazeIcon
              } else if(id>=801 && id <=804){
                this.icon = this.cloudIcon
              } else if((id>=500 && id <=531) || (id>=300 && id<= 321)){
                this.icon = this.rainIcon
              } else {}

            this.data = {
                city:city,
                location:`${city}, ${country}`,
                description:description,
                temperature:Math.floor(temp),
                feels_like:Math.floor(feels_like),
                humidity:`${humidity}%`,
                ic:`${icon}.png`
            }
        }
        else{
            this.loadingText = `${this.cityName} is not a valid city!!`;
            this.isError=true;
        }*/

    }

    weatherDetails(result){
        console.log("result: ", result);
        if(result.cod === 200){
            this.loadingText = '';
            const city = result.name;
            const country = result.sys.country;
            const {description,id, icon} = result.weather[0];
            const {temp,feels_like,humidity} = result.main;

            // handle image display logic based on weather id
            // refer below site for more info
            // https://openweathermap.org/weather-conditions
            if(id === 800){
                this.icon = this.clearIcon
              } else if((id>=200 && id <=232) || (id>=600 && id <=622)){
                this.icon = this.stormIcon
              } else if(id>=701 && id <=781){
                this.icon = this.hazeIcon
              } else if(id>=801 && id <=804){
                this.icon = this.cloudIcon
              } else if((id>=500 && id <=531) || (id>=300 && id<= 321)){
                this.icon = this.rainIcon
              } else {}

            this.data = {
                city:city,
                location:`${city}, ${country}`,
                description:description,
                temperature:Math.floor(temp),
                feels_like:Math.floor(feels_like),
                humidity:`${humidity}%`,
                ic:`${icon}.png`
            }
        }
        else{
            this.loadingText = `${this.cityName} is not a valid city!!`;
            this.isError=true;
        }

    }


    backHandler(){
        this.data = null 
        this.cityName = ''
        this.loadingText = ''
        this.isError = false 
        this.icon = ''
      }
}

