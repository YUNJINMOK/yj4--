import { useState } from "react";
import NavPage from "./components/NavPage";
import SearchPage from "./components/SearchPage";
import TrendingPage from "./components/TrendingPage";

function App() {
  const [scroll, setScroll] = useState(true);
  document.addEventListener("wheel", (e) => {
    console.log(e.deltaY);
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
    <div>
      {/*네비게이션 */}
      <NavPage scroll={scroll} />
      {/* 검색영역 */}
      <SearchPage />
      {/* Trending */}
      <TrendingPage />
    </div>
  );
}

export default App;
