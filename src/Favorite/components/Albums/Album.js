import React,{Component} from 'react';
import './Album.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
class Album extends Component {
    constructor(){
        super();
        this.state = {
          albumTracks: [          
        ]
    }

    //this.getAlbumTracks();
   
        
    }

    componentWillMount(){
        spotifyApi.getAlbumTracks(this.props.albumId)
        .then((data)=>{
            var albumTracksTmp = [];
            data.items.map((track)=>{
                console.log('track ',track)
                //var tmp = track[0].name
                albumTracksTmp.push( {name:track.name, preview_url:track.preview_url})
                this.setState({
                    albumTracks : albumTracksTmp
                })
            })
            
            })
    }
    AlbumSwitchHandler =(data)=>{
        console.log("album switch clicked! "+data)
    }
    checkQueue = ()=>{
        console.log('album id'+this.props.albumId);
        console.log('album name'+this.props.albumName);
    }
    playSound(url) {
        var a = new Audio(url);
        a.play();
    }

   
    render(){
        return (
            <div className = 'Album'>

                    <div> <img src={this.props.albumImgUrl} className = 'img'/></div>
                    
                    <div> Album : {this.props.albumName}</div>
                     <div> </div>
                    <div className='Playlist'> Album playlist: </div>
                    <div className = 'Track'>
                  
                    {
                        /*
                    this.props.albumQueue.map((track,i)=>{
                        return (
                            <div> song 1 </div>
                        )
                    })*/
                    this.state.albumTracks.map((track)=>{
                        return(
                            <div>
                            <div className ='Track'> track: {track.name}
                                    <button className = 'Trackbutton' onClick={this.playSound.bind(this,track.preview_url)}>Play Preview</button>
                            </div>
                            
                            </div>
                        )
                    })
                    }
                    </div>
          
            </div>
        )
    }
}

export default Album;