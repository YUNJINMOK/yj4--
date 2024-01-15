import NavPage from "./components/NavPage";
import SearchPage from "./components/SearchPage";
import TrendingPage from "./components/TrendingPage";

function App() {
  return (
    <div>
      {/* 네비게이션 */}
      <NavPage />
      {/* 검색영역 */}
      <SearchPage />
      {/* Trending */}
      <TrendingPage />
    </div>
  );
}

export default App;
