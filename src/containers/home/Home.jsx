import React from 'react'
import Jumbotron from '../../components/jumbotron/Jumbotron'
import Posts from '../../components/posts/Posts'

const Home = () => {
  return (
    <>
        <Jumbotron />
        <Posts user='all' />
    </>
  )
}

export default Home