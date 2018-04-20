import React, {Component} from 'react';
import MainClock from './components/MainClock';
import Quote from './components/Quote';
import Bookmark from './components/Bookmark';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      condition: 'nature'
    }
  }
  componentDidMount(){    
    const today = new Date();
    const hours = today.getHours();    
    let condition = 'nature';
    if(hours >= 7 && hours <= 10){
      condition = "morning breakfast";
    }
    else if((hours > 10 && hours < 12) || (hours > 13 && hours < 15)){
      condition = "Study Hard, Work Hard, city";
    }
    else if(hours >= 12 && hours <= 13){
      condition = "lunch, coffee, rainy";
    }
    else if(hours > 15 && hours <= 17){
      condition = "coffee break, child, relax, sunset";
    }    
    else if(hours > 17 && hours < 19){
      condition = "trafic jam, street, night city, rainy";
    }
    else if(hours >= 19 & hours <= 21){
      condition = "dinner, romantic dinner, restaurant, family dinner";
    }
    else if(hours > 21 && hours < 24){
      condition = "nature night, city night";
    }
    else if(hours >= 0 && hours < 6){
      condition = "midnight city, midnight forest";
    }    
    else if(hours >= 6 && hours < 7){
      condition = "morning city, morning nature, joging"
    }
    this.setState({
      condition: condition
    })
    
  }
  render(){
    return(
      <div className="app-wrapper quotes" style={{
        background: `
        linear-gradient(to right, rgba(36, 36, 62, 0.5), rgba(48, 43, 99, 0.5), rgba(15, 12, 41, 0.5)), 
        url('https://source.unsplash.com/1600x900/?${this.state.condition}') 0% 0% / cover rgb(36, 36, 62)`
      }}>                
        <Quote />
        <MainClock />
        <Bookmark />
        <span className="app-wrapper__creator">
          Resplash by <a href="https://twitter.com/Budisuryadarma">imdbsd</a>
        </span>
      </div>
    )
  }
}