import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Favorite from './Favorite/Favorite';
import Options from './Option/Option';
import Trending from './Trending/Trending';
import Artists from './Favorite/components/Artists';

const spotifyApi = new SpotifyWebApi();
class App extends Component {
  //Create a constructor, 
  //and in it save the return value of this function into a variable called params
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }    
    this.state = {
      loggedIn: token ? true: false,
      nowPlaying: {
        name:'Not Checked',
        albumArt: ''
      }
      }
    }
     
  
  //function returns an object with the parameters as properties
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
      }
      return hashParams;
    }
  
    getNowPlaying(){
      var artistId = 'none';

      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumArt: response.item.album.images[0].url
              }
          });
        })

        //console.log(spotifyApi.getUserPlaylists().items);
        // note that we don't pass a user id
        
        spotifyApi.getUserPlaylists()  
          .then(function(data) {
             console.log('User playlists', data);
              }, function(err) {
            console.error(err);
        });
        
       // spotifyApi.setPromiseImplementation(Q);
        spotifyApi.searchArtists('BTS')
          .then(function(data) {
            artistId = data.artists.items[0].id;
            console.log ('artistId '+artistId);
            console.log('Search artists by "Love"', data.artists.items[0].id);
            spotifyApi.getArtistAlbums(artistId, function(err, data) {
              if (err) console.error(err);
              else console.log('Artist albums', data);
            });
              }, function(err) {
          console.error(err);
          });
         
          console.log ('artistId2 '+artistId.id);
          
          
    }
  render() {
    return (
      <div className="App">
       <a href='http://localhost:8888'> Login to Spotify</a>
       <div className = 'Welcome'> Welcome to your Spotify world </div>
        <Favorite />
        <Options />
              </div>
    );
  }
}

export default App;
