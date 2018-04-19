/* global chrome */
import React, {Component} from 'react';
import './index.css';
import AddIcon from './add-icon.png';
import TrashIcon from './trash-icon.png';

export default class Bookmark extends Component{
    constructor(){
        super();
        this.state = {
            bookmarks: [
                // {
                //     url: 'https://facebook.com',
                //     siteName: 'facebook.com'
                // },
                // {
                //     url: 'https://twitter.com',
                //     siteName: 'twitter.com'
                // },
                // {
                //     url: 'https://youtube.com',
                //     siteName: 'youtube.com'
                // },
                // {
                //     url: 'https://facebook.com',
                //     siteName: 'facebook.com'
                // }                                                             
            ],
            newSiteUrl: "",
            newSiteName: "",
            openForm: false,
            error: {
                url: "",
                siteName: ""
            },
            available: true
        }
        this.remove = this.remove.bind(this);
        this.handleNewSiteName = this.handleNewSiteName.bind(this);
        this.handleNewSiteUrl = this.handleNewSiteUrl.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.openForm = this.openForm.bind(this);
        this.submitBookmark = this.submitBookmark.bind(this);        
    }
    remove(index){                
        let bookmarks = this.state.bookmarks;        
        index = bookmarks.length - 1 - index;
        if(index === 0){
            bookmarks.shift();
        }        
        else if(index === bookmarks.length - 1){
            bookmarks.pop();
        }
        else{
            let frontArray = bookmarks.slice(0,index);
            let backArray = bookmarks.slice(index + 1);
            bookmarks = frontArray.concat(backArray);
        }
        if(bookmarks.length >= 6){
            this.setState({
                available: false
            })
        } 
        else{
            this.setState({
                available: true
            })
        }
        this.setState({
            bookmarks: bookmarks
        })        
        if(chrome.storage !== undefined){
            chrome.storage.sync.set({'resplashBookmarks': bookmarks}, function() {
                console.log("bookmarks updated");
            });
        }
    }
    handleNewSiteName(event){
        this.setState({
            newSiteName: event.target.value
        });        
    }

    handleNewSiteUrl(event){
        this.setState({
            newSiteUrl: event.target.value
        });
    }
    openForm(){
        this.setState({
            openForm: true
        })
    }
    closeForm(){
        this.setState({
            openForm: false,
            newSiteName: "",
            newSiteUrl: "",
            error:{
                url: "",
                siteName: ""
            }
        })
    }
    submitBookmark(event){
        event.preventDefault();
        if(this.state.bookmarks.length < 6){            
            let validate = false;
            let newBookmarks = this.state.bookmarks;            
            const theHttp = this.state.newSiteUrl.split(":")[0];
            let errUrl = this.state.error.url;
            let errSiteName = this.state.error.siteName;
            if(this.state.newSiteName.trim() !== "" ){
                if(theHttp.trim() !== ""){
                    if(theHttp === "https" || theHttp === "http"){
                        const theDomain = this.state.newSiteUrl.split("/")[2];
                        if(theDomain.indexOf(".") !== -1){
                            validate = true;
                        }
                        else{
                            errUrl = "please input the valid url";
                        }
                    }            
                    else{
                        errUrl = "please input the valid url";
                    }
                }                                
                else{
                    errUrl = "url cannot be empty";
                }
            }     
            else{
                errSiteName = "sitename cannot be empty";
            }       
            if(validate){
                newBookmarks.push({
                    url: this.state.newSiteUrl,
                    siteName: this.state.newSiteName
                });
                this.setState({
                    bookmarks: newBookmarks,
                    error: {
                        url: "",
                        siteName: ""
                    }
                })  
                if(newBookmarks.length >= 6){
                    this.setState({
                        available: false
                    })
                } 
                else{
                    this.setState({
                        available: true
                    })
                }
                if(chrome.storage !== undefined){
                    chrome.storage.sync.set({'resplashBookmarks': newBookmarks}, function() {
                        console.log("bookmarks updated");
                    });
                }
                this.closeForm();                     
            }
            else{
                this.setState({
                    error: {
                        url: errUrl,
                        siteName: errSiteName
                    }
                })
            }
        }
    }
    
    componentDidMount(){
        if(chrome.storage !== undefined){            
            let getFromStorage = () => {
                return new Promise((resolve, reject) => {
                    chrome.storage.sync.get(['resplashBookmarks'], function(result) {
                        console.log(result);
                        resolve(result);
                        // console.log('Value currently is ' + result.key);
                    });
                })
            }            
            getFromStorage()
            .then(result => {
                this.setState({
                    bookmarks: result.resplashBookmarks
                })
                if(result.resplashBookmarks.length >= 6){
                    this.setState({
                        available: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    render(){
        return(
            <div className="bookmark__wrapper">
                <div className={`bookmark__mark-wrapper add-section__wrapper ${this.state.available? 'available':'full'}`}>               
                    <div className="bookmark__absolut-mark">
                        <i className="bookmark__add-icon">
                            <img src={AddIcon} onClick={this.openForm} alt="open form ico"/>
                        </i>
                    </div> 
                    <div className={`bookmark__adding-form ${this.state.openForm ? "open" : ""}`}>
                        <p>Add new bookmark</p>
                        <form onSubmit={this.submitBookmark}>
                            <div className="bookmark__input-wrapper">
                                <input className="bookmark__input" type="text" name="url" placeholder="input the url..." value={this.state.newSiteUrl} onChange={this.handleNewSiteUrl} required/>
                                <span className="bookmark__error-msg">{this.state.error.url}</span>
                            </div>
                            <div className="bookmark__input-wrapper">
                                <input className="bookmark__input" type="text" name="site-name" placeholder="input the sitename..." value={this.state.newSiteName} onChange={this.handleNewSiteName} required/>
                                <span className="bookmark__error-msg">{this.state.error.siteName}</span>
                            </div>                                           
                            <button className="bookmark__btn" type="submit">add</button>     
                            <button className="bookmark__btn" onClick={this.closeForm}>cancel</button>       
                        </form>
                    </div>
                </div>  
                <div>
                </div>
               {
                    this.state.bookmarks.slice(0).reverse().map((bookmark, index) => {
                        return(
                            <div className="bookmark__mark-wrapper" key={index} id={`bookmark-${index}`}>               
                                <div className="bookmark__absolut-mark">
                                    <a href={bookmark.url} target="_blank">
                                        {
                                            bookmark.siteName.length > 14 ? 
                                            `${bookmark.siteName.substring(0,11)}...`:
                                            bookmark.siteName
                                        }
                                        <br/>
                                        <span>
                                            {
                                                bookmark.url.split("://")[1].length > 21 ? 
                                                `${bookmark.url.split("://")[1].substring(0,18)}...` : 
                                                bookmark.url.split("://")[1]
                                            }
                                        </span>
                                    </a>                        
                                    <i className="bookmark__delete-mark" onClick={() => this.remove(index)}>
                                        <img src={TrashIcon} alt="delete bookmark ico"/>
                                    </i>
                                </div>                    
                            </div>           
                        )
                    })
                }                                              
            </div>
        )
    }
}