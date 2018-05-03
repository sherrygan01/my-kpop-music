import React, { Component } from 'react';
import Song from './Songs/Song';
import './Songs.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
let global_song;
let song;
let isTopSong =false;

class Songs extends Component {

    
    constructor(){
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        this.albumFilter = this.albumFilter.bind(this);
        this.getKpopSongs = this.getKpopSongs.bind(this);
        this.searchSongsId = this.searchSongsId.bind(this);
        this.updateSongsInfo =  this.updateSongsInfo.bind(this);
        
        if(token){
          spotifyApi.setAccessToken(token);
        }    
        this.state = {
                MyTopSong : [
                ],

                isTopSong: false
          }

        
          }

          componentWillMount () {
            console.log('component will mount')
            this.getArtistId('BTS')
          }
         
          albumFilter=(data)=>{
            console.log('fliter album by "kpop"', data);
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

        getArtistId =(artist)=>{
            spotifyApi.searchArtists(artist).
            then((response)=>{
                console.log('artist is '+response.artists.items[0].id)
                this.getArtistSong(response.artists.items[0].id)
            })

        }

        searchSongsId =()=>{
           
             var id;
             spotifyApi.searchTracks('Epilogue: Young Forever').
             then((response)=>{
                 console.log(response);
                 var newElem = {
                    name:'Young Forever',
                    img_url: response.tracks.items[0].album.images[0].url,
                    song_url:response.tracks.items[0].id,
                    song_author:'BTS',
                    preview_url: response.tracks.items[0].preview_url

                 }
                this.setState({
                    MyTopSong : this.state.MyTopSong.concat(newElem)
                },function () {
                    console.log('Search by "Epilogue: Young Forever"',this.state.MyTopSong[1].img_url );
                });
             })
               
               
            }
        addArtistSong = (id) =>{


        }

        getMyTopSongs = ()=>{
            spotifyApi.getMyTopTracks()
             .then((response)=>{
                let MyTopSongTmp = [];
                for(var i=0;i<6;i++){
                console.log('my top song ' + response.items[i].name)
                //songName = response.tracks[i].name
               
                var newElem = {
                    name:response.items[i].name,
                    img_url:response.items[i].album.images[0].url,
                    song_url:response.items[i].id,
                    song_author:response.items[i].artists[0].name,
                    preview_url: response.items[i].preview_url

                 }
                 MyTopSongTmp = MyTopSongTmp.concat(newElem);
                this.setState({
                    MyTopSong : MyTopSongTmp
                })
            }
             })
        }
        getArtistSong = (id) =>{
            var songName;
            console.log('in getArtistSong function '+id)
            let MyTopSongTmp = [];
            spotifyApi.getArtistTopTracks(id,'US')
             .then((response)=>{
                for(var i=0;i<6;i++){
                console.log(response.tracks[i].name)
                songName = response.tracks[i].name
                var newElem = {
                    name:response.tracks[i].name,
                    img_url: response.tracks[i].album.images[0].url,
                    song_url:response.tracks[i].id,
                    song_author:'BTS',
                    preview_url: response.tracks[i].preview_url

                 }
                 MyTopSongTmp = MyTopSongTmp.concat(newElem);
                this.setState({
                    MyTopSong :  MyTopSongTmp
                })
            }
             })

           
        }
        updateSongsInfo=()=>{
          this.searchSongsId();
          
          console.log('songId name' +  this.state.MyTopSong[0].name)
          //console.log('songId ' + this.state.MyTopSong[0].song_url)

        }
        getKpopSongs(){
            spotifyApi.searchAlbums('kpop')
                .then(function(data) {
                    console.log('Search by "kpop"', data);
                   
                }, function(err) {
                    console.error(err);
                });

            spotifyApi.getCategoryPlaylists('kpop')
                .then(function(data) {
                    ()=>this.albumFilter;
                    
                }, function(err) {
                    console.error(err);
                });
            
        }

        getTopSongInfo(songName){

            
        }
    changeSongHandler= ()=>{
        if(this.state.isTopSong){
            this.getArtistId('BTS');
            this.setState(
                {
                    isTopSong : false
                }
            )
            
        }else{
            this.getMyTopSongs();
            this.setState(
                {
                    isTopSong : true
                }
            )
        }
    }
   
    render(){
        return (
            <div className='Songs'>
            <div style = {{textAlign:'left'}}>{this.state.isTopSong?'Your Top Songs':'Your Favoirite Artist Song'}</div>
            
            <button onClick={this.changeSongHandler.bind(this)}> {this.state.isTopSong?'Click to get my favoirite Artist Song':'Click to get my top Song'} </button>
            <button onClick={()=>this.getArtistId('BTS')}>click to get artist top song</button>
            <div>{this.state.MyTopSong.map((song, i) => {
                return (
                    <Song 
                        songId = {song.song_url}
                        imgUrl = {song.img_url}
                        songName = {song.name}
                        author = {song.song_author}
                        preview = {song.preview_url}
                     />
                     )
                 })}
                </div>
            </div>
        );
    }
}

export default Songs;