import { useState } from "react";
import logo from "../assets/logocat.png";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

export default function NavPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [scroll, setScroll] = useState(true);
  document.addEventListener("wheel", (e) => {
    // console.log(e.deltaY);
    // 마우스 휠 내릴 때
    // 네비게이션을 감추기 위해 scroll에 false
    if (e.deltaY > 0) {
      setScroll(false);
    }
    // 마우스 휠 올릴 때
    // 네비게이션을 보이기 위해 scroll에 true
    else if (e.deltaY < 0) {
      setScroll(true);
    }
  });
  return (
    <div
      className={`sticky top-0 ${
        scroll ? "translate-y-0" : "-translate-y-[60px]"
      } duration-500 w-full h-[60px] bg-[#032541] flex justify-center z-20`}
    >
      {/* 중앙정렬된 네비게이션 컨테이너 */}
      <div className="max-w-[1300px] w-full h-full flex justify-between px-8">
        {/* 1.왼쪽 : 로고 + 메뉴 */}
        <div className="h-full flex space-x-8">
          {/* 로고 */}
          <div className="w-[50px] h-full flex items-center">
            <Link to="/">
              <img className="w-[40px]" src={logo} alt="main_logo" />
            </Link>
          </div>
          {/* 메뉴 영역 */}
          <div className="h-full flex items-center space-x-6 text-white font-bold">
            <Link to="/movies">
              <p>Movie</p>
            </Link>
            <Link to="/tv">
              <p>TV Shows</p>
            </Link>
            <p>People</p>
            <p>More</p>
          </div>
        </div>
        {/* 2.오른쪽 : 아이콘 영역 */}
        <div className="h-full flex space-x-6 items-center text-white">
          {/* 플러스 버튼 */}
          <div className="">
            <FaPlus />
          </div>
          {/* 언어 선택 */}
          <div className="border border-white p-1 text-xs font-bold hover:bg-white hover:text-[#032541]">
            EN
          </div>
          <div onClick={toggleColorMode} className="text-white cursor-pointer">
            {colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
          </div>
          <div className="w-8 h-8 bg-red-600 rounded-full flex justify-center items-center font-bold">
            C
          </div>
          <div className="text-[#01B4E4]">
            <FaSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
