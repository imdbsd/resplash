import React, {Component} from 'react';
import './index.css';
import AddIcon from './add-icon.png';
import TrashIcon from './trash-icon.png';

export default class Bookmark extends Component{
    constructor(){
        super();
        this.state = {
            bookmarks: [
                {
                    url: 'https://facebook.com',
                    siteName: 'facebook.com'
                },
                {
                    url: 'https://twitter.com',
                    siteName: 'twitter.com'
                },
                {
                    url: 'https://youtube.com',
                    siteName: 'youtube.com'
                },
                {
                    url: 'https://facebook.com',
                    siteName: 'facebook.com'
                },
                // {
                //     url: 'https://twitter.com',
                //     siteName: 'twitter.com'
                // },
                // {
                //     url: 'https://youtube.com',
                //     siteName: 'youtube.com'
                // }                                                               
            ],
            newSiteUrl: "",
            newSiteName: "",
            openForm: false
        }
        this.remove = this.remove.bind(this);
        this.handleNewSiteName = this.handleNewSiteName.bind(this);
        this.handleNewSiteUrl = this.handleNewSiteUrl.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.openForm = this.openForm.bind(this);
        this.submitBookmark = this.submitBookmark.bind(this);
    }
    remove(index){        
        console.log(this.state.bookmarks[index])        
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
        this.setState({
            bookmarks: bookmarks
        })
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
            openForm: false
        })
    }
    submitBookmark(event){
        event.preventDefault();
        if(this.state.bookmarks.length < 6){
            let newBookmarks = this.state.bookmarks;
            newBookmarks.push({
                url: this.state.newSiteUrl,
                siteName: this.state.newSiteName
            });
            this.setState({
                bookmark: newBookmarks,
                newSiteName: "",
                newSiteUrl: ""
            })            
            
        }
    }
    render(){
        return(
            <div className="bookmark__wrapper">
                <div className="bookmark__mark-wrapper add-section__wrapper">               
                    <div className="bookmark__absolut-mark">
                        <i className="bookmark__add-icon">
                            <img src={AddIcon} onClick={this.openForm}/>
                        </i>
                    </div> 
                    <div className={`bookmark__adding-form ${this.state.openForm ? "open" : ""}`}>
                        <p>Add new bookmark</p>
                        <form onSubmit={this.submitBookmark}>
                            <div className="bookmark__input-wrapper">
                                <input className="bookmark__input" type="text" name="url" placeholder="input the url..." value={this.state.newSiteUrl} onChange={this.handleNewSiteUrl}/>
                            </div>
                            <div className="bookmark__input-wrapper">
                                <input className="bookmark__input" type="text" name="site-name" placeholder="input the sitename..." value={this.state.newSiteName} onChange={this.handleNewSiteName}/>
                            </div>                                           
                            <button className="bookmark__btn" type="submit" onClick={this.closeForm}>add</button>     
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
                                        {bookmark.siteName}<br/>
                                        <span>{bookmark.url}</span>
                                    </a>                        
                                    <i className="bookmark__delete-mark" onClick={() => this.remove(index)}>
                                        <img src={TrashIcon} />
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