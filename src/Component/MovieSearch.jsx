import { useContext } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "../context/MovieDetailContext";
import { useNavigate } from "react-router-dom";

const MovieSearch = ({ data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogoClick = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <div className="my-10 px-6 lg:px-10 max-w-full">
      <h2 className="text-2xl font-semibold uppercase mb-6 text-white">
        Kết quả tìm kiếm
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative group bg-cover bg-no-repeat bg-center w-full h-[350px] sm:h-[400px] md:h-[450px] rounded-lg overflow-hidden transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${item.poster_path})`,
            }}
            onClick={() => handleVideoTrailer(item.id)}
          >
            {/* Dark overlay */}
            <div className="bg-black/60 w-full h-full absolute top-0 left-0 z-10 transition-all group-hover:bg-black/80"></div>

            {/* Movie Title */}
            <div className="relative z-20 p-4 flex flex-col items-center justify-end h-full text-center">
              <h3 className="text-lg text-white font-bold uppercase tracking-wide mb-2">
                {item.name || item.title || item.original_title}
              </h3>
              <p className="text-sm text-white opacity-80">{item.release_date}</p>
            </div>

            {/* Hover Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-black/40 transition-all duration-300 ease-in-out z-0"></div>
          </div>
        ))}
      </div>

      {/* Logo, click vào đây sẽ về trang chủ */}
      <div
        className="cursor-pointer mt-6 text-center text-3xl text-white font-bold hover:text-yellow-500"
        onClick={handleLogoClick}
      >
        BUSI Ci-Nê
      </div>
    </div>
  );
};

MovieSearch.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovieSearch;
