import React, {Component} from 'react';
import './index.css';
import {turnMonth, turnDays, turnDate, detectNight} from './clockUtils.js';

const todays = new Date();

export default class MainClock extends Component{
    constructor(){
        super();
        this.state = {
            hours : 0,
            displayHours : 0,
            minutes: 0,
            seconds: 0,
            day: 0,
            displayDay: '',
            date: 1,
            displayDate: '',
            month: 0,
            displayMonth: '',
            year: 1995,
            isFullHours: true,
            isNight: false
        }        
        this.changeFormat = this.changeFormat.bind(this);
        this.updateDisplayHours = this.updateDisplayHours.bind(this);
        this.updateCalendar = this.updateCalendar.bind(this);
        //update the day
    }
    
    changeFormat(){        
        let newFormat = !this.state.isFullHours;

        this.setState({
            isFullHours: newFormat
        });     

        this.updateDisplayHours(newFormat);
    }

    updateDisplayHours(isTwelve){
        if(!isTwelve){ //is 12 hours
            if(this.state.hours > 12){
                this.setState({
                    displayHours: this.state.hours - 12
                })
            }
            else if(this.state.hours === 0){
                this.setState({
                    displayHours: 12
                })               
            }
            else{                            
                this.setState({
                    displayHours: this.state.hours
                })
            }
        }
        else{
            this.setState({
                displayHours: this.state.hours
            })
        }
    }

    updateCalendar(){
        //update the day
        if(this.state.day + 1 > 6){
            this.setState({
                day: 0,
                displayDay: turnDays(0)
            })
        }
        else{
            this.setState({
                day: this.state.day + 1,
                displayDay: turnDays(this.state.day + 1)
            })
        }

        if(this.state.month === 1){ // is february
            // is leap year?
            let isLeap = false;
            if(this.state.year % 4 === 0){
                if(this.state.year % 100 === 0){
                    if(this.state.year % 400 === 0)
                        isLeap = true;                    
                    else
                        isLeap = false;
                }
                else
                    isLeap = true;
            }
            
            if(isLeap){
                if(this.state.date + 1 > 29){
                    this.setState({
                        date: 0
                    })
                }
                else{
                    this.setState({
                        date: this.state.date + 1
                    })
                }
            }
            else{
                if(this.state.date + 1 > 28){
                    this.setState({
                        date: 0
                    })
                }
                else{
                    this.setState({
                        date: this.state.date + 1
                    })
                }
            }
        }
        else{
            
        }
    }
    
    componentDidMount(){        
        //set the clock
        this.setState({
            hours: todays.getHours(),
            displayHours: todays.getHours(),
            minutes: todays.getMinutes(),
            seconds: todays.getSeconds(),
            day: todays.getDay(),
            displayDay: turnDays(todays.getDay()),
            date: todays.getDate(),
            displayDate: turnDate(todays.getDate()),
            month: todays.getMonth(),
            displayMonth: turnMonth(todays.getMonth()),
            year: todays.getFullYear(),
            // isNight: false
            isNight: detectNight(todays.getHours())
        });
        //update the clock
        setInterval(() => {
            if(this.state.seconds + 1 === 60){ //seconds
                this.setState({
                    seconds: this.state.seconds + 1 - 60
                })
                if(this.state.minutes + 1 === 60){ //minutes
                    this.setState({
                        minutes : this.state.minutes + 1 - 60
                    })                    
                    if(this.state.hours + 1 === 24){ //hours
                        //new days
                        this.updateCalendar();
                        //update the day
                        this.setState({
                            hours: 0
                        })
                    }
                    else{
                        this.setState({
                            hours: this.state.hours + 1
                        })
                    }  
                    
                    if(this.state.hours + 1 > 12){ //isNight true
                        this.setState({


                            isNight: true
                        })
                    }
                    else{
                        this.setState({
                            isNight: false
                        })
                    }

                    // update display hours
                    this.updateDisplayHours(this.state.isFullHours);
                }
                else{
                    this.setState({
                        minutes: this.state.minutes + 1
                    })
                }
            }
            else{
                this.setState({
                    seconds: this.state.seconds + 1
                })
            }
        }, 1000);
    }

    render(){                
        return(
            <div className="main-clock__wrapper">
                <div className="main-clock__time-wrapper" onClick={this.changeFormat}>
                    <span className="main-clock__time hours">
                        {`${this.state.displayHours}`.length < 2? `0${this.state.displayHours}`:this.state.displayHours}
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
                        {this.state.displayDay}
                    </span>
                    <span className="main-clock__month">
                        {this.state.displayMonth}
                    </span>
                    <span className="main-clock__date" dangerouslySetInnerHTML={{__html: this.state.displayDate}}>       
                    </span>
                    <span className="main-clock__year">
                        , {this.state.year}
                    </span>
                </div>
            </div>
        )
    }
}