import React, { Component } from 'react';
import Songs from './components/Songs';
import Albums from './components/Albums';
import Artists from './components/Artists';
import './Favorite.css';
class Favorite extends Component {



    render(){
        return (
            <div className ='Favorite'>
            <div className='FavoriteTitle'>Favorite Component</div>
            <Songs />
            <Albums />
            <Artists />
            </div>
        );
    }
}

export default Favorite;