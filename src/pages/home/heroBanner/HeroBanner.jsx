import {useState, useEffect} from 'react';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './style.scss';
const HeroBanner = () => {
const [background, setBackground] = useState("");
const [query, setQuery] = useState("");
const {data, loading} = useFetch('/movie/upcoming');

useEffect(() => {
   const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
   setBackground(bg);
}, [data])

const navigate = useNavigate();
const {url} = useSelector((state) => state.home);
const queryHandler = (event) => {
  if(event.key === 'Enter' && query.length > 0){
     navigate(`/search/${query}`);
  }
}

  return (
    <div className='heroBanner'>
    {!loading && <div className="backdrop-img">
      <Img src={background}/>
    </div>}
    <div className="opacity-layer"></div>
    <ContentWrapper>
      <div className="heroBannerContent">
        <span className="title">Welcome.</span>
        <span className="subTitle">Millions of movies, TV Shows and people to discover. 
        Explore Now.</span>
        <div className="searchInput">
          <input type='text' placeholder='Search for a movie or tv show ....' onKeyUp={queryHandler} onChange={(event) => {setQuery(event.target.value)}}/>
          <button>Search</button>
        </div>
      </div>
    </ContentWrapper>
    </div>
  )
}

export default HeroBanner