import React, { useEffect, useState } from 'react'
import Header from '@/app/components/header'
import dynamic from "next/dynamic";
import MovieCarousel from './movieCarousel';
import { Box } from '@mui/material'
import { useTablet } from '@/app/hooks/mediaHooks';
import { fetchMovies } from '@/app/services/feedService';
import ThumbnailMedia from './thumbnailMedia';

function Feed() {
  const tabsData = [{ title: "Home" }, { title: "TV Shows" }, { title: "Movies" }, { title: "Originals" }, { title: "Recently Added" }, { title: "My List" }]
  const isTablet = useTablet()
  const [movies, setMovies] = useState([])
  const [isScrolled, setScrolled] = useState(false)

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const res = await fetchMovies();
        res.movies_data && setMovies(res.movies_data)
      }
      catch {
      }
    }
    movies?.length === 0 && fetchMoviesData();

    const handleScroll = () => {
      setScrolled(window.scrollY <= 10 ? false : true)
    }
    window.addEventListener('scroll', handleScroll)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box px={isTablet ? 2 : 9} >
      <Header tabsData={tabsData} transparent={isScrolled ? false : true} />
      <ThumbnailMedia />
      {movies && movies?.length > 0 && movies.map((movie, i) => {
        return movie?.categoryTitle && <MovieCarousel key={i} categoryTitle={movie.categoryTitle} thumbnails={movie?.movies} currentCarouselIndex={i} />
      })}
    </Box>
  )
}
export default dynamic(() => Promise.resolve(Feed), { ssr: false });
