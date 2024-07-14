import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  import { FaBookOpen } from "react-icons/fa";
import krishna from "../assets/rada.jpg";
//  import Navbar from "./Navbar"; // Uncomment if Navbar is used

const API_URL = "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/";
const API_KEY = "11fc24b610mshb590e5579cd11cdp10e6f4jsn28ebe3908595";
const API_HOST = "bhagavad-gita3.p.rapidapi.com";

function Home() {
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      const options = {
        method: "GET",
        url: API_URL,
        params: { skip: "0", limit: "18" },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        setChapters(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchChapters();
  }, []);

  return (
    <>
    <div className="text-red-500">
      <div className="bg-gray-900 min-h-screen p-8">
        {/* Navigation Bar */}
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center text-white">
            <div className="text-2xl font-bold">Bhagavad Gita</div>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-gray-400">
                Chapters
              </Link>
              <Link to="#" className="hover:text-gray-400">
                Quotes
              </Link>
              <Link to="#" className="hover:text-gray-400">
                About Gita
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[500px]"
          style={{ backgroundImage: `url(${krishna})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 text-white">
                Experience the Gita Anywhere, Anytime
              </h1>
              <Link
                to="/chapters"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Read now
              </Link>
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <h1 className="text-4xl font-bold text-white mb-8">Chapters</h1>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h2 className="text-orange-400 text-lg font-semibold mb-2">
                  Chapter {chapter.chapter_number}
                </h2>
                <h3 className="text-white text-2xl font-bold mb-4">
                  {chapter.name_translated}
                </h3>
                <p className="text-gray-400 mb-4">
                  {chapter.chapter_summary.length > 150
                    ? chapter.chapter_summary.substring(0, 150) + "..."
                    : chapter.chapter_summary}
                </p>
                <div className="flex items-center text-gray-500">
                  <FaBookOpen className="mr-2" />
                  <span>{chapter.verses_count} Verses</span>
                </div>
                <Link
                  to={`/chapter/${chapter.id}`}
                  className="text-blue-500 mt-4 inline-block"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Home;
