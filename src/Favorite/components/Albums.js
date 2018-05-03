import React, { Component } from 'react';
//import Song from './Songs/Song';
import './Albums.css';
import Album from './Albums/Album';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const TopKpopStar = [
    {artist:'BTS', artistId:'3Nrfpe0tUJi4K4DXYWgMUX'},
    {artist:'EXO', artistId:'3cjEqqelV9zb4BYE3qDQ4O'},
    {artist:'BigBang', artistId:'4Kxlr1PRlDKEB0ekOCyHgX'},
    {artist:'Blackpink', artistId:'41MozSoPIsD1dJM0CLPjZF'},

]

class Albums extends Component {
    constructor(){
        super();
        //this.getArtistAlbumInfo = this.getArtistAlbumInfo.bind(this);
        //this.call2 = this.call2.bind(this)
        this.getArtistId();
        this.state = {
            AlbumsQueue :[
              // { 
                // albumName:'',
                // albumImgUrl :'' ,
                // albumId:'',
                // albumQueue:[
                  //   {song : 'ss', songPreviewUrl: ''}
                  //  ]
             //  }
            ]
        }
        
    }
    
    AlbumSwitchHandler =(data)=>{
        console.log("album switch clicked! "+data)
    }
    //Get kpop playlist
    GetCategoryList = () =>{
       
        spotifyApi.getCategoryPlaylists('kpop')
          .then((data) => {
              console.log('this ' +this)
              console.log('getCategory List ', data);
           
              });
            
            var i = 0;
            const numbers = [0,1,2,3,4,5]
             numbers.map((number)=>{
                console.log('test for loop '+i)
                  spotifyApi.searchTracks(TopKpopStar[number])
                    .then((data,i) =>{
                        console.log('getTracks List '+ number, data);
             });

    })
}
    getArtistId = ()=>{
        var artistId;
        //this.call2("helle1")
        TopKpopStar.map((topKpopStar)=>{
            //console.log('Check this star :' ,topKpopStar)
            spotifyApi.searchArtists(topKpopStar.artist)
            .then((data)=> {
                console.log('Check this star :' ,)
            console.log('this ' +data.artists.items[0].id)
            console.log('artist: ', data.artists.items[0].name + ' artistId: '+data.artists.items[0].id);
            this.getArtistAlbumInfo(data.artists.items[0].id);
            //this.call2("helle2")
            //artistId = data.artists.items[0].id;
                })
        
        })
          
        
    }

    getArtistAlbumInfo = (artistId) =>{
        console.log("get album by artist id "+artistId)
        spotifyApi.getArtistAlbums(artistId)
        .then((data)=>{
            console.log("album info " + data.items[0].name + " " +data.items[0].images[0].url)
            let MyAlbumTmp = [];
            var newElem = 
                { albumImgUrl :data.items[0].images[0].url ,
                  albumName: data.items[0].name,
                  albumId: data.items[0].id
                }
               
                MyAlbumTmp = this.state.AlbumsQueue.concat(newElem);
                this.setState({
                    AlbumsQueue : MyAlbumTmp
                })
        });
    
    }
    componentWillMount(){
        console.log("componentWillMount");
    }
    getSongPreview = (preview_url) =>{
        
    }
    getAlbumInfo=(albumId)=>{
        spotifyApi.getArtistAlbums(albumId)
        .then(function(data){
            console.log("album img url ", data.items[0].images)
        });
    }

    call2  = (data) =>{
        console.log("calling 2 "+data);

    }

    call1  = () =>{
        console.log("calling 1");
        this.call2("hi");
        
    }

    

    updateQueueById = ()=>{
            this.state.AlbumsQueue.map((album, i)=>{
                
            })
    }

    render(){
        return (
            <div className='Albums'>
            <div style = {{textAlign:'left'}}>Your Latest Albums</div>
            <button onClick={this.GetCategoryList.bind(this)}>GetCategoryList</button>
            <button onClick={this.getArtistId.bind(this)}>GetArtistid</button>
            <button onClick={this.call1.bind(this)} >Test for calling function </button>
            <div>
                {this.state.AlbumsQueue.map((data, i)=>{
                    if(i<2){
                    return (
                    <Album 
                        albumImgUrl={data.albumImgUrl}
                        albumName = {data.albumName}
                        albumQueue={data.albumQueue}
                        albumId = {data.albumId}
                    />
                    )
                   }   
                })
            
                }
            </div>
            </div>
        );
    }
}

export default Albums;