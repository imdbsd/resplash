import React, {Component} from 'react';
import './index.css';
import {turnMonth, turnDays, turnDate, detectNight} from './clockUtils.js';

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
            isNight: false
        }        
        this.changeFormat = this.changeFormat.bind(this);    
        this.updateTheDisplay = this.updateTheDisplay.bind(this);
    }
    
    changeFormat(){        
        let newFormat = !this.state.isFullHours;

        this.setState({
            isFullHours: newFormat
        });             
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

    }

    render(){                
        return(
            <div className="main-clock__wrapper">
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
        )
    }
}