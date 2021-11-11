import React from "react"
import { NextPage } from "next"
import HeaderSlider from "components/Header/HeaderSlider/HeaderSlider"
import NewsFeed from "components/News/NewsFeed/NewsFeed"

const Index: NextPage = () => {
  return (
    <>
      <HeaderSlider />
      <NewsFeed />
    </>
  )
}

export default Index
