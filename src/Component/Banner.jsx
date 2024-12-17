import { Link } from "react-router-dom";
import { FaTree, FaSnowflake, FaGift } from "react-icons/fa"; // Biểu tượng Giáng Sinh
import Snowfall from "react-snowfall"; // Hiệu ứng tuyết rơi
import { useSpring, animated } from "react-spring"; // Hiệu ứng mượt mà
import IntroVideo from "../assets/intro.mp4"; // Video nền

const Banner = () => {
  // Hiệu ứng xoay toàn bộ 360° cho cây thông
  const treeAnimation = useSpring({
    loop: true,
    to: { transform: "rotate(360deg)" },
    from: { transform: "rotate(0deg)" },
    config: { duration: 2000 }, // Thời gian hoàn thành 1 vòng (2 giây)
  });

  // Hiệu ứng xoay toàn bộ 360° cho bông tuyết
  const snowflakeAnimation = useSpring({
    loop: true,
    to: { transform: "rotate(-360deg)" }, // Xoay ngược chiều
    from: { transform: "rotate(0deg)" },
    config: { duration: 2000 }, // Thời gian hoàn thành 1 vòng (2 giây)
  });

  return (
    <div className="md:h-[700px] h-[1000px] w-full bg-black relative mt-[75px]">
      {/* Hiệu ứng Tuyết Rơi */}
      <Snowfall />

      {/* Video nền */}
      <video
        src={IntroVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Nội dung */}
      <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full">
        <div className="md:w-[50%] w-full">
          <div className="flex flex-col space-y-6 items-start p-10">
            {/* Nút kêu gọi hành động */}
            <Link
              to="/signup"
              className="no-underline py-2 px-6 text-xl font-bold bg-gradient-to-r from-red-600 to-red-300 text-white hover:bg-gradient-to-r hover:from-red-300 hover:to-red-600 transition-all duration-300"
            >
              Xem Ngay
            </Link>

            {/* Nội dung chủ đề Giáng Sinh */}
            <p className="text-white text-lg">
              Khám phá thế giới phim nổi bật và hấp dẫn ngay bây giờ!{" "}
              <FaGift className="inline-block text-2xl text-red-600" />
            </p>

            {/* Biểu tượng Giáng Sinh với hiệu ứng xoay */}
            <div className="flex items-center space-x-4 mt-4">
              <animated.div style={treeAnimation}>
                <FaTree className="text-green-600 text-4xl" />
              </animated.div>
              <animated.div style={snowflakeAnimation}>
                <FaSnowflake className="text-white text-4xl" />
              </animated.div>
            </div>

            {/* Các nút điều hướng */}
            <div className="flex items-center space-x-5">
              <Link
                to="/about"
                className="no-underline py-2 px-3 bg-black text-white border border-white font-bold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Chi tiết
              </Link>
              <Link
                to="/signup"
                className="no-underline py-2 px-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Xem Phim
              </Link>
            </div>
          </div>
        </div>

        {/* Không có nội dung thêm ở cột bên phải */}
        <div className="md:w-[50%] w-full flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default Banner;
