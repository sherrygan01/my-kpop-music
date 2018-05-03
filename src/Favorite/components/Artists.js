import React, { Component } from 'react';
//import Song from './Songs/Song';
import SpotifyWebApi from 'spotify-web-api-js';
import './Artists.css';
const spotifyApi = new SpotifyWebApi();

class Artists extends Component {
    constructor(){
        super();
        this.state = {
            artist_imgs :[
       
            ]
        }

        this.getArtistInfo();
    }
    getArtistInfo = ()=>{
       spotifyApi.getArtist('3Nrfpe0tUJi4K4DXYWgMUX')
       .then((data)=>{
           console.log("this artist ", data)
           
            data.images.map((image)=>{
                var artist_imgs_tmp = this.state.artist_imgs.concat({url: image.url})
                this.setState({
                    artist_imgs : artist_imgs_tmp
                })
            })
       })
       
    }

    render(){
        return (
            <div>
            <div>Artists Component</div>
            <div className='Artists'> 
            {
                //
                this.state.artist_imgs.map((img, i)=>{
                    if(i == 1){
                   return (
                      <img src={img.url} className = 'imgArtist'/>
                  )
                }
               })
            }
            </div>
            <div > Artist Info </div>
            </div>
        );
    }
}

export default Artists;