import React, { useEffect, useState } from 'react';
import ListenOverlay from './ListenOverlay';

export default function NowPlaying({ game }) {

    const [currentTrack, setCurrentTrack] = useState('')
    const [currentTrackSpotify, setCurrentTrackSpotify] = useState()
    const [previousTrack, setPreviousTrack] = useState('')
    const [previousTrackSpotify, setPreviousTrackSpotify] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.sr.se/api/v2/playlists/rightnow?channelid=${game.id}&format=json`
                const response = await fetch(url)
                const trackData = await response.json()
                setCurrentTrack(trackData.playlist.song)
                setPreviousTrack(trackData.playlist.previoussong)
            } catch (error) {

                // console.error('Error fetching tracklist', error)
            }
        }
        // Call fetchData every 10 seconds
        const interval = setInterval(fetchData, 10000); 

        // Initial call to fetchData when the component mounts
        fetchData();
    

        return () => clearInterval(interval);
    }, [])

    useEffect (() => {
        if(currentTrack) {
            getTrack(currentTrack.title, currentTrack.artist).then(trackData => {
                if (trackData) {
                    setCurrentTrackSpotify(trackData)
                }
            })
        }
    }, [currentTrack])

    useEffect (() => {
        if(previousTrack) {
            getTrack(previousTrack.title, previousTrack.artist).then(trackData => {
                if (trackData) {
                    setPreviousTrackSpotify(trackData)
                }
            })
        }
    }, [previousTrack])

    function handleImageClick(event) {
        const liveUrl = game.liveaudio.url
        window.open(liveUrl, '_blank')
    }
    function handleCurrentClick(event) {
        if (currentTrackSpotify) {
            window.open(currentTrackSpotify.spotify_url, '_blank')
        }
        
    }
    function handlePreviousClick(event) {
        if (previousTrackSpotify) {
            window.open(previousTrackSpotify.spotify_url, '_blank')
        }
    }

    const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
    const SPOTIFY_CLIENT_ID = 'b09cadfabe924b74875e780ee4957cc6'; // Replace with your Spotify Client ID b09cadfabe924b74875e780ee4957cc6
    const SPOTIFY_CLIENT_SECRET = 'f007dc4a32d540bebd07c86a1632560f'; // Replace with your Spotify Client Secret f007dc4a32d540bebd07c86a1632560f
    let SPOTIFY_CLIENT_ACCESS_TOKEN = ''

    const getToken = async () => {
    try {
        const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
        },
        body: 'grant_type=client_credentials'
        });

        const authResponseData = await response.json();
        const SPOTIFY_CLIENT_ACCESS_TOKEN = authResponseData.access_token;

        // Use SPOTIFY_CLIENT_ACCESS_TOKEN for Spotify API requests
        return SPOTIFY_CLIENT_ACCESS_TOKEN;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
    };

    const fetchToken = async () => {
        try {
          const token = await getToken();
          if (token) {
            // Use the token for Spotify API requests
            SPOTIFY_CLIENT_ACCESS_TOKEN = token
          } else {
            console.log('Failed to fetch access token');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    async function getTrack(title, artist) {

        await fetchToken()
        
        const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
      
        const headers = {
          'Authorization': `Bearer ${SPOTIFY_CLIENT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        };
      
        // Encode spaces in the search query
        const encodedTitle = encodeURIComponent(title);
        const encodedArtist = encodeURIComponent(artist);
      
        const query = `${SPOTIFY_BASE_URL}/search?q=${encodedTitle}%20artist:${encodedArtist}&type=track`;
      
        try {
          const response = await fetch(query, { headers });
          const trackData = await response.json();
      
          // Get relevant track information from the response
          const trackJson = trackData.tracks.items[0];
          if (!trackJson) {
            return "Not found";
          }
      
          const titleFromJson = trackJson.name;
          const uriFromJson = trackJson.uri.split(':')[2];
          const urlFromJson = trackJson.external_urls.spotify;
          const imageFromJson = trackJson.album.images[0].url;
          let artistsFromJson = trackJson.artists[0].name;
      
          // If more than one artist, add them to the artists list
          for (let i = 1; i < trackJson.artists.length; i++) {
            artistsFromJson += `, ${trackJson.artists[i].name}`;
          }
      
          const trackDataResult = {
            artists: artistsFromJson,
            title: titleFromJson,
            spotify_uri: uriFromJson,
            spotify_url: urlFromJson,
            image: imageFromJson
          };
      
          return trackDataResult;
        } catch (error) {
          console.error('Error fetching track:', error);
          return "Error fetching track";
        }
      }
      
    return (
        <div className="now-playing-item">
          <div className='item-container'>
            <div className='image-container' onClick={handleImageClick}>
              <img
                className="item-img"
                src={game.image}
                alt={game.name}
                title={game.name}
              />
              <ListenOverlay game={game} />
            </div>
            <div className='text-container'>
                {currentTrack ? ( // Check if currentTrack exists
                <div>
                    <p>
                        Current track: <strong>{currentTrack.title}</strong> by <strong>{currentTrack.artist}</strong>
                    </p>
                    <button class='spotifyButton' onClick={handleCurrentClick}>
                        Play on Spotify
                    </button>
                </div>
                ) : (
                    <p>
                        No current track data available
                    </p>
                )}
                {previousTrack ? ( // Check if previousTrack exists
                <div>
                    <p>
                        Previous track: <strong>{previousTrack.title}</strong> by <strong>{previousTrack.artist}</strong>
                    </p>
                    <button class='spotifyButton' onClick={handlePreviousClick}>
                        Play on Spotify
                    </button>
                </div>
                ) : (
                    <p>No previous track data available</p>
                )}
            </div>
            <div className='spotify-image-container'>
                {currentTrack && currentTrackSpotify ? ( // Check if spotify data exists
                    
                    <img
                        className="item-img"
                        onClick={handleCurrentClick}
                        src={currentTrackSpotify.image}
                        alt={currentTrack.name}
                        title={currentTrack.name}
                    />
                ) : (<></>
                )}
                {previousTrack && previousTrackSpotify ? ( // Check if spotify data exists
                
                    <img
                        className="item-img"
                        onClick={handlePreviousClick}
                        src={previousTrackSpotify.image}
                        alt={previousTrack.name}
                        title={previousTrack.name}
                    />
                ) : (<></>
                )}
            </div>
          </div>
        </div>
      );
      
};