import React ,{Component} from 'react';
import {RandomQuote} from './quotes.js'
import './index.css';

export default class Quotes extends Component{
    constructor(){
        super();
        this.state = {
            quoteText: "Keep Doing Good Things",
            quoteAuthor: "imdbsd",            
        };
        this.changeQuote = this.changeQuote.bind(this);
    }

    changeQuote(){
        let quote = RandomQuote();
        this.setState({
            quoteText: quote.quoteText,
            quoteAuthor: quote.quoteAuthor === "" ? "Anonymous" : quote.quoteAuthor            
        });
    }

    componentDidMount(){        
        this.changeQuote();
    }
    render(){
        return(
            <div className="quote__wrapper">
                <p className="quote__quote-text" onClick={this.changeQuote}>"{this.state.quoteText}"</p>
                <span className="quote__author" onClick={this.changeQuote}>{this.state.quoteAuthor}</span  >
            </div>
        )
    }
}