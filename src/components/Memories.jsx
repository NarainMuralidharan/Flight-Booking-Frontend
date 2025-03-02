import memoOne from "../assets/images/memo-1.png";
import memoTwo from "../assets/images/memo-2.png";
import memoThree from "../assets/images/memo-3.png";

const Memories = () => {
  return (
    <section className="bg-gradient-to-b from-slate-300 to-slate-500 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Create Unforgettable Travel Memories
        </h2>
        <p className="text-xl text-center text-gray-900 mb-10 max-w-2xl mx-auto">
          Capture moments from your travels and relive them forever with our personalized experiences
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={memoOne}
              alt="Explore Best Destinations"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Explore Best Destinations</h4>
            <p className="text-black">
              Discover the world's most stunning locations and create lasting memories with every journey
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={memoTwo}
              alt="Immerse in Local Cultures"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Immerse in Local Cultures</h4>
            <p className="text-black">
              Experience rich traditions, authentic cuisine, and unique customs in every destination
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={memoThree}
              alt="Exciting Adventures Await"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Exciting Adventures Await</h4>
            <p className="text-black">
              From hiking trails to deep sea diving, embark on thrilling adventures for an unforgettable trip
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memories;
