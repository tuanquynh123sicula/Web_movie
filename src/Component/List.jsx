import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";
import { FaTree, FaSnowflake, FaPlay } from "react-icons/fa";
import Snowfall from "react-snowfall";
import AOS from "aos";
import "aos/dist/aos.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const List = ({ title, data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedMovies");
    if (storedLikes) {
      setLikedMovies(JSON.parse(storedLikes));
    }

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="my-10 px-10 max-w-full relative">
      <Snowfall /> {/* Hiệu ứng tuyết rơi */}

      {/* Title */}
      <div className="flex items-center mb-4">
        <div className="w-1 h-8 bg-red-600 mr-4"></div>
        <h2 className="text-xl uppercase text-white font-bold">{title}</h2>
      </div>

      {/* Carousel */}
      <Carousel responsive={responsive} draggable={false}>
        {data?.map((movie) => (
          <div
            key={movie.id}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative group border border-transparent rounded-md hover:scale-105 hover:border-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})`,
            }}
            onClick={() => handleVideoTrailer(movie.id)}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            {/* Highlight text */}
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-br-lg">
              Nổi bật
            </div>

            {/* Christmas Icons */}
            <div className="absolute bottom-2 left-2 text-white text-2xl group-hover:text-green-500 transition-colors duration-300">
              <FaTree />
            </div>
            <div className="absolute bottom-2 right-2 text-white text-2xl group-hover:text-blue-500 transition-colors duration-300">
              <FaSnowflake />
            </div>

            {/* Hover Effect - Play Icon */}
            <div className="bg-black/60 opacity-0 group-hover:opacity-100 absolute inset-0 transition-opacity duration-300 z-10 flex items-center justify-center">
              <FaPlay
                className="text-white text-4xl opacity-80 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-300 ease-in-out"
              />
            </div>

            {/* Dark Overlay */}
            <div className="bg-black/60 opacity-0 group-hover:opacity-90 absolute inset-0 transition-opacity duration-500 z-0"></div>

            {/* Zoom Background on Hover */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})`,
              }}
            ></div>

            {/* Movie Title */}
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md text-center text-white uppercase font-semibold transition-all duration-500 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0 ease-in-out">
                {movie.name || movie.title || movie.original_title || "Unknown Title"}
              </h3>
              <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {movie.release_date || "Release date unavailable"}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default List;
