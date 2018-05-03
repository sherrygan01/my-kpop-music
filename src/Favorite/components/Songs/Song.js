import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './Song.css';

class Song extends Component {
    
    constructor(){
        super();
        this.state = {
            currentSong: '',
        };
    }
    playSound(url) {
        console.log("url "+url);
     //   currentSong = new Audio(url);
        var b = new Audio("https://p.scdn.co/mp3-preview/481b97048b27220146e90ef34747722cd270e25a?cid=808085f397e74108b7526833898fa757")
     //   currentSong.play();

        
        //var b = new Audio()
    }

    pauseSound(url){
        var a = new Audio(url);
        a.pause();
    }

    render(){
        return (
            <div className='Song'>
            <img src = {this.props.imgUrl} className='img'></img>
            {this.props.songName} by  {this.props.author}
            <button className = 'button' onClick={this.playSound.bind(this,this.props.preview)}>Play Preview</button>
            <button className = 'button' onClick={this.pauseSound.bind(this,this.props.preview)}>Pause</button>
            </div>
        );
    }

}

export default Song;