import React, { useState, useEffect } from "react";
import Draggable from "react-draggable"; // Thư viện cho phép kéo thả
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useSpring, animated } from "react-spring";
import Snowfall from "react-snowfall"; 
import "../styles/Footer.css";

const Footer = () => {
  const [showAd, setShowAd] = useState(false);
  const [randomVideo, setRandomVideo] = useState("");

  const videoList = [
    "https://www.youtube.com/embed/7oVbS8zQxQ0",
    "https://www.youtube.com/embed/XU4oplOtoQo",
    "https://www.youtube.com/embed/fVYmwHdEFcU",
    "https://www.youtube.com/embed/Mx8EkGAfsg0",
    "https://www.youtube.com/embed/8l4crgVt36Y",
    "https://www.youtube.com/embed/QJ8E9R70csY",
    "https://www.youtube.com/embed/wJO_vIDZn-I",
    "https://www.youtube.com/embed/6COmYeLsz4c",
    "https://www.youtube.com/embed/qSu6i2iFMO0",
    "https://www.youtube.com/embed/lQBmZBJCYcY",
    "https://www.youtube.com/embed/hDZ7y8RP5HE",
  ];

  useEffect(() => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * videoList.length);
      setRandomVideo(videoList[randomIndex]);
      setShowAd(true);
    }, 5000);
  }, []);

  const moveIcon = useSpring({
    loop: true,
    to: { transform: "translateY(-5px)" },
    from: { transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <footer className="bg-black text-white py-8 relative">
      <Snowfall />

      {showAd && (
        <Draggable>
          <div className="fixed bottom-10 left-10 bg-black p-2 rounded-lg shadow-lg z-50 cursor-move">
            <button
              onClick={() => setShowAd(false)}
              className="absolute top-1 right-1 text-red-600 hover:text-white transition-colors duration-300"
              aria-label="Close ad"
            >
              <IoIosClose size={24} />
            </button>
            <iframe
              width="240"
              height="135"
              src={`${randomVideo}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </Draggable>
      )}

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="/about"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="About us"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="Privacy policy"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="Terms of use"
                >
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="/contact"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="Contact us"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="Support"
                >
                  Hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <animated.a
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-white transform transition duration-300 hover:scale-110 hover:rotate-12 hover:text-red-600"
                style={moveIcon}
                aria-label="Follow us on Facebook"
              >
                <FaFacebook size={30} />
              </animated.a>
              <animated.a
                href="https://www.twitter.com"
                className="text-gray-400 hover:text-white transform transition duration-300 hover:scale-110 hover:rotate-12 hover:text-red-600"
                style={moveIcon}
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={30} />
              </animated.a>
              <animated.a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-white transform transition duration-300 hover:scale-110 hover:rotate-12 hover:text-red-600"
                style={moveIcon}
                aria-label="Follow us on Instagram"
              >
                <FaInstagram size={30} />
              </animated.a>
              <animated.a
                href="https://www.youtube.com"
                className="text-gray-400 hover:text-white transform transition duration-300 hover:scale-110 hover:rotate-12 hover:text-red-600"
                style={moveIcon}
                aria-label="Follow us on YouTube"
              >
                <FaYoutube size={30} />
              </animated.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Videos</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="/videos"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="Intro video"
                >
                  Video giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="/trending-videos"
                  className="text-white no-underline hover:text-red-500 hover:underline transition-all duration-300 transform hover:scale-105"
                  aria-label="Trending videos"
                >
                  Video nổi bật
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mb-6"></div>

        <div className="text-center text-gray-400 text-xs">
          <p>&copy; 2024 Busi Ci-Nê.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
