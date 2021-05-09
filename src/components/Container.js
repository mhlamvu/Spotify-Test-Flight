import React, {useState, useEffect} from 'react'
import {useDebounce} from 'use-debounce'
import Spotify from 'spotify-web-api-js'

import {Search} from './Search'

const spotify = new Spotify()

// const redirect_uri = 'http://localhost:3000'
const client_id = '5fe01282e94241328a84e7c5cc169164'
const spotify_auth = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123`

export const SearchTopTracks = ({resultId}) => {
  const [topTracks, setTopTracks] = useState([])

  useEffect(() => {

    let didCancel = false

    const getArtistTopTracks = async () => {
      const {tracks} = await spotify.getArtistTopTracks(resultId, 'UK')

      if(!didCancel) { setTopTracks(tracks) }
    }

    getArtistTopTracks()
    return () => {
      didCancel = true
    }
  }, [resultId])

  return (
    <>
      <h2>Top Tracks</h2>
      <ul>
        {topTracks.map(track => {
          <li key={track.id}>
            <b>Track:</b> <span>{track.name}</span> - <b>Album:</b>{'  '}<span>{track.album.name}</span>
          </li>
        })}
      </ul>
    </>
  )
}

export const Container = () => {

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [token, setToken] = useState()
  const [debounceQuery] = useDebounce(query, 100)

  useEffect(() => {
    const abortController = new AbortController()

    const init = async () => {
      const res = await fetch(spotify_auth)

      const { access_token: authAccessToken } = await res.json()
      spotify.setAcessToken(authAccessToken)

      if (!abortController.signal.aborted) {
        setToken(authAccessToken)
      }
    }

    init()

    return () => {
      abortController.abort()
    }
  }, [])


  useEffect(() => {
    let didCancel = false

    const searchForArtists = async () => {
      const { artists: {items}} = await spotify.searchArtist(debounceQuery)

      if(!didCancel) {
        setResults(items)
      }
    }

    if(token) {
      searchForArtists()
    }

    return () => {
      didCancel = true
    }
  }, [token, debounceQuery])

  return (
    <Search>
      <Search.Input
        placeholder='Search for artist'
        onChange={({taget: {value}}) => value && setQuery(value)}
      >

        {results.length > 0 ? (
          results.map(item => (
            <Search.Result key={item.id}>
              <Search.Body>
                <p>{item.name}</p>
                <p>
                  Followers: <span>{item.followers.total.toLocalString()}</span>
                </p>
              </Search.Body>

              <Search.Meta>
                {({resultId}) => <SearchTopTracks resultId={resultId}/>}
              </Search.Meta>

            </Search.Result>
          ))
        ) : (
          <p>We couldn't fine any matches</p>
        )}

      </Search.Input>
    </Search>
  )
}
