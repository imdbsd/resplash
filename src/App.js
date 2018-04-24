import React, {Component} from 'react';
import MainClock from './components/MainClock';
import Quote from './components/Quote';
import Bookmark from './components/Bookmark';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      condition: 'nature',
      bgImage: ""
    }
  }
  componentDidMount(){    
    const today = new Date();
    const hours = today.getHours();    

    const setCondition = (hours) => {   
      console.log(hours)   
      return new Promise((resolve, reject) => {
        console.log(hours)
        let condition = "nature";
        if(hours >= 7 && hours <= 10){
          condition = "morning breakfast";
          resolve(condition);
        }
        else if((hours > 10 && hours < 12) || (hours > 13 && hours < 15)){
          condition = "Study Hard, Work Hard, city";
          resolve(condition);
        }
        else if(hours >= 12 && hours <= 13){
          condition = "lunch, coffee, rainy";
          resolve(condition);
        }
        else if(hours >= 15 && hours <= 17){
          console.log("masuk")
          condition = "coffee break, child, relax, sunset";          
          resolve(condition);
        }    
        else if(hours > 17 && hours < 19){
          condition = "trafic jam, street, night city, rainy";
          resolve(condition);
        }
        else if(hours >= 19 & hours <= 21){
          condition = "dinner, romantic dinner, restaurant, family dinner";
          resolve(condition);
        }
        else if(hours > 21 && hours < 24){
          condition = "nature night, city night";
          resolve(condition);
        }
        else if(hours >= 0 && hours < 6){
          condition = "midnight city, midnight forest";
          resolve(condition);
        }    
        else if(hours >= 6 && hours < 7){
          condition = "morning city, morning nature, joging";
          resolve(condition);
        }
      })
    };
    setCondition(hours)
    .then(condition => {
      console.log(condition)
      this.setState({
        condition: condition
      });
      let bgImage = new Image();
      bgImage.src = `https://source.unsplash.com/1600x900/?${condition}`;
      bgImage.onload = () => {
        this.setState({
          bgImage: bgImage.src
        },
      () => {
        document.getElementById("app-wrapper__bg-image-wrapper").classList.add("loaded")
      })
        console.log(this.state)      
      }
    })        
  }      
  render(){
    return(
      <div className="app-wrapper quotes" style={{
        background: `
        linear-gradient(to right, rgba(36, 36, 62, 0.5), rgba(48, 43, 99, 0.5), rgba(15, 12, 41, 0.5)) 0% 0% / cover rgb(36, 36, 62)`
      }}>       
        <div className="app-wrapper__bg-image-wrapper" id="app-wrapper__bg-image-wrapper" style={{
          background: `
          linear-gradient(to right, rgba(36, 36, 62, 0.5), rgba(48, 43, 99, 0.5), rgba(15, 12, 41, 0.5)), 
          url(${this.state.bgImage}) 0% 0%`                      
        }}></div>               
        <Quote />
        <MainClock />
        <Bookmark />
        <span className="app-wrapper__creator">
          Resplash by <a href="https://twitter.com/Budisuryadarma" title="imdbsd">imdbsd</a> | Image from <a href="https://unsplash.com/" title="unsplash.com">unsplash</a>
        </span>        
      </div>
    )
  }
}