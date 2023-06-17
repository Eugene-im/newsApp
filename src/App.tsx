import "./App.css";
import { NewsBlock } from "./components/NewsBlock";
import SkeletonLoading from "./components/SkeletonLoading";

function App() {
  return (
    <div className="App">
      <header className="App-header">Just NEWS</header>
      <main>
        <SkeletonLoading/>
        <NewsBlock/>
      </main>
      <footer>© 2021</footer>
    </div>
  );
}

export default App;
