/* global chrome */
import React, {Component} from 'react';
import './index.css';
import {turnMonth, turnDays, turnDate, detectNight} from './clockUtils.js';
import GearIcon from './icons/gear-icon.png';
import axios from 'axios';
import {GetWeatherIco} from './icons/weatherIcon.js';
export default class MainClock extends Component{
    constructor(){
        super();
        this.state = {
            hours : 0,            
            minutes: 0,
            seconds: 0,
            day: 0,            
            date: 1,            
            month: 0,            
            year: 1995,
            display: {
                hours: 0,
                day: '',
                date: '',
                month: ''                
            },
            isFullHours: true,
            isNight: false,
            showClockForm: false,
            position: "Greenwich",
            weather: {
                isLoaded: false,
                isFound: false,
                location: "",
                mainWeather: "",
                descWeather: "",
                iconWeather: "",
                temp: 0,
                humidity: 0
            }
        }        
        this.changeFormat = this.changeFormat.bind(this);    
        this.updateTheDisplay = this.updateTheDisplay.bind(this);
        this.openClockForm  = this.openClockForm.bind(this);
        this.updateClockConfig = this.updateClockConfig.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }
    
    changeFormat(){        
        let newFormat = !this.state.isFullHours;

        this.setState({
            isFullHours: newFormat
        });             
        if(chrome.storage !== undefined){
            let resplashUserTime = {
                isFullHours: newFormat
            }
            chrome.storage.sync.set({'resplashUserTime': resplashUserTime}, function() {
                console.log("userTime updated");
            });
        }
        this.updateTheDisplay(newFormat);
    }

    updateTheDisplay(isFullHours = this.state.isFullHours, hours = this.state.hours, day = this.state.day, date = this.state.date, month = this.state.month){        
        let dpHours = hours;
        if(!isFullHours){
            if(hours > 12){
                dpHours = hours - 12;
            }
            else if(hours === 0){ //midnight
                dpHours = 12;
            }                        
        }
        this.setState({
            display: {
                hours: dpHours,
                day: turnDays(day),
                date: turnDate(date),
                month: turnMonth(month)
            }
        })
    }       
    componentDidMount(){       
        if(chrome.storage !== undefined){            
            let getFromStorage = () => {
                return new Promise((resolve, reject) => {
                    chrome.storage.sync.get(['resplashUserTime'], function(result) {
                        console.log(result);
                        resolve(result);                        
                    });
                })
            }            
            getFromStorage()
            .then(result => {
                if(result !== undefined){
                    this.setState({
                        isFullHours: result.resplashUserTime.isFullHours
                    })                    
                }                
            })
            .catch(err => {
                console.log(err);
            })           
        }

        //set the clock
        let currentDate = new Date();
        this.setState({
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            seconds: currentDate.getSeconds(),
            day: currentDate.getDay(),
            date: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            isNight: detectNight(currentDate.getHours())
        })     
        //update the display
        this.updateTheDisplay(
            this.state.isFullHours,
            currentDate.getHours(),
            currentDate.getDay(),
            currentDate.getDate(),
            currentDate.getMonth()
        );
        //update the clock
        setInterval(() => {
            currentDate = new Date();            
            this.setState({
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                seconds: currentDate.getSeconds(),
                day: currentDate.getDay(),
                date: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                isNight: detectNight(currentDate.getHours())
            });            
            this.updateTheDisplay(
                this.state.isFullHours,
                currentDate.getHours(),
                currentDate.getDay(),
                currentDate.getDate(),
                currentDate.getMonth()
            );       
        }, 1000); 
        
        //getting weather
        if(chrome.storage !== undefined){
            let getWeatherStorage = () => {
                return new Promise((resolve, reject) => {
                    chrome.storage.sync.get(['resplashWeather'], function(result) {
                        console.log(result);
                        resolve(result);                        
                    });
                })
            }            
            getWeatherStorage()
            .then(result => {
                this.setState({
                    position: result.resplashWeather
                })         
                if(result.resplashWeather !== ""){
                    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${result.resplashWeather}&units=metric&appid=9d24d0a1f7423e2c24555db496555442&units=metric`)            
                    .then(result => {
                        this.setState({
                            weather: {
                                isLoaded: true,
                                isFound: true,
                                location: result.data.name,
                                mainWeather: result.data.weather[0].main,
                                descWeather: result.data.weather[0].description,
                                iconWeather: result.data.weather[0].icon,
                                temp: result.data.main.temp,
                                humidity: result.data.main.humidity
                            },
                            position: result.data.name
                        })
                    })
                    .catch(err => {
                        this.setState({
                            weather: {
                                isLoaded: true,
                                isFound: false,
                                location: "",
                                mainWeather: "",
                                descWeather: "",
                                iconWeather: "",
                                temp: 0,
                                humidity: 0
                            },                  
                            position: "",                                              
                        })
                    })
                }       
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            if(this.state.position !== ""){
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.position}&units=metric&appid=9d24d0a1f7423e2c24555db496555442&units=metric`)            
                .then(result => {
                    this.setState({
                        weather: {
                            isLoaded: true,
                            isFound: true,
                            location: result.data.name,
                            mainWeather: result.data.weather[0].main,
                            descWeather: result.data.weather[0].description,
                            iconWeather: result.data.weather[0].icon,
                            temp: result.data.main.temp,
                            humidity: result.data.main.humidity
                        },
                        position: result.data.name
                    })
                })
                .catch(err => {
                    this.setState({
                        weather: {
                            isLoaded: true,
                            isFound: false,
                            location: "",
                            mainWeather: "",
                            descWeather: "",
                            iconWeather: "",
                            temp: 0,
                            humidity: 0
                        },                  
                        position: "",                                              
                    })
                })
            }
        }        
    }
    openClockForm(){
        this.setState({
            showClockForm: true
        })
    }

    closeForm(){
        this.setState({
            showClockForm: false,
            position: this.state.weather.location
        })
    }

    updateClockConfig(event){
        event.preventDefault()
        if(this.state.position !== this.state.weather.location){
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.position}&units=metric&appid=9d24d0a1f7423e2c24555db496555442&units=metric`)            
            .then(result => {
                if(result.data.cod === 200){
                    this.setState({
                        weather: {
                            isLoaded: true,
                            isFound: true,
                            location: result.data.name,
                            mainWeather: result.data.weather[0].main,
                            descWeather: result.data.weather[0].description,
                            iconWeather: result.data.weather[0].icon,
                            temp: result.data.main.temp,
                            humidity: result.data.main.humidity
                        },                  
                        position: result.data.name,                          
                        showClockForm: false
                    })
                    if(chrome.storage !== undefined){
                        chrome.storage.sync.set({'resplashWeather': result.data.name}, function() {
                            console.log("current weather updated");
                        });
                    }
                }
            })
            .catch(err => {
                this.setState({
                    weather: {
                        isLoaded: true,
                        isFound: false,
                        location: "",
                        mainWeather: "",
                        descWeather: "",
                        iconWeather: "",
                        temp: 0,
                        humidity: 0
                    },                  
                    position: "",                          
                    showClockForm: false
                })
            })
        }        
    }

    updatePosition(event){
        this.setState({
            position: event.target.value
        })
    }

    render(){                
        return(
            <div className="main-clock__wrapper">
                <i className="main-clock__setting-ico" onClick={this.openClockForm}><img src={GearIcon} alt="setting icon"/></i>
                <div className={`main-clock__clock-form-wrapper ${this.state.showClockForm?"open":""}`}>   
                    <p>Clock Settings: </p>
                    <form onSubmit={this.updateClockConfig}>
                        <div className="main-clock__form-input-wrapper">
                            <label>Location for weather: </label>
                            <input type="text" name="weather-location" placeholder="input location for weather..." value={this.state.position} onChange={this.updatePosition}/>
                        </div>
                        <div className="main-clock__form-submit-btn-wrapper">
                            <button type="submit" className="main-clock__submit-form-btn">change</button>
                            <button className="main-clock__submit-form-btn" onClick={this.closeForm}>cancel</button>
                        </div>
                    </form>             
                </div>
                <div className="main-clock__calendar-wrapper">
                    <div className="main-clock__time-wrapper" onClick={this.changeFormat}>
                        <span className="main-clock__time hours">
                            {`${this.state.display.hours}`.length < 2? `0${this.state.display.hours}`:this.state.display.hours}
                        </span>
                        <span className="main-clock__second-anim">:</span>
                        <span className="main-clock__time minutes">
                            {`${this.state.minutes}`.length < 2? `0${this.state.minutes}`:this.state.minutes}
                        </span>      
                        <span className={`main-clock__detect ${!this.state.isFullHours ? 'show' : ""}`}>
                            {this.state.isNight? "P.M." : "A.M."}
                        </span>
                    </div> 
                    <div className="main-clock__date-wrapper">
                        <span className="main-clock__day">
                            {this.state.display.day}
                        </span>
                        <span className="main-clock__month">
                            {this.state.display.month}
                        </span>
                        <span className="main-clock__date" dangerouslySetInnerHTML={{__html: this.state.display.date}}>       
                        </span>
                        <span className="main-clock__year">
                            , {this.state.year}
                        </span>
                    </div>
                </div>
                <div className="main-clock__main-weather-wrapper">
                    <div className="main-clock__weather-wrapper">
                        <p>
                            {
                                this.state.weather.isLoaded ? 
                                    this.state.weather.isFound ? 
                                        `Current weather at ${this.state.weather.location}`
                                    : "City not found"
                                : "No Internet Connection"                                
                            }
                        </p>
                        <div className="main-clock__weather-display">
                            <img src={GetWeatherIco(this.state.weather.iconWeather)} alt="weather icons"/>
                            <p>
                            <span>{this.state.weather.temp} <sup>o</sup>C</span><br/>
                            <span>
                            {
                                this.state.weather.isFound?
                                    `${this.state.weather.mainWeather} (${this.state.weather.descWeather})`
                                : "undefined"                                
                            }
                            </span><br/>
                            <span>humidity: {this.state.weather.humidity}%</span>
                            </p>
                        </div>                        
                    </div>   
                    <p className="main-clock__weather-copyright">Powered by <a href="https://openweathermap.org" title="openweather.org">openweather</a></p>                 
                </div>
            </div>
        )
    }
}