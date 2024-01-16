import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <div className="w-full h-[300px] bg-gray-900 flex justify-center py-16">
      {/* 1 */}
      <div className="w-[200px] flex flex-col">
        <Link to="/">
          <img className="h-[30px] object-cover" src={Logo} alt="main logo" />
        </Link>
      </div>
      {/* 2 */}
      <div className="w-[160px] text-white flex flex-col">
        <h3 className="uppercase font-semibold">the basic</h3>
        <p>Lorem, ipsum.</p>
        <p>Lorem, ipsum.</p>
        <p>Lorem.</p>
        <p>Lorem.</p>
      </div>
      {/* 3 */}
      <div className="w-[160px] text-white flex flex-col">
        <h3 className="uppercase font-semibold">get involved</h3>
        <p>Lorem, ipsum.</p>
        <p>Lorem, ipsum.</p>
        <p>Lorem.</p>
        <p>Lorem.</p>
      </div>
      {/* 4 */}
      <div className="w-[160px] text-white flex flex-col">
        <h3 className="uppercase font-semibold">community</h3>
        <p>Lorem, ipsum.</p>
        <p>Lorem, ipsum.</p>
        <p>Lorem.</p>
        <p>Lorem.</p>
      </div>
      {/* 5 */}
      <div className="w-[160px] text-white flex flex-col">
        <h3 className="uppercase font-semibold">legal</h3>
        <p>Lorem, ipsum.</p>
        <p>Lorem, ipsum.</p>
        <p>Lorem.</p>
        <p>Lorem.</p>
      </div>
    </div>
  );
}
