import SearchContent from "./components/searchContent/SearchContent";
import { MainSearchContainer } from "multi-channel-core/src";
import {useRef, useState } from "react";
import ResultsComponent from "./components/resultsComponent/ResultsComponent";
import './index.css'
import './App.css';
import './i18n/config';

function App() {
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const [searchParams, setSearchParams] = useState({
    fromDate: new Date(Date.now() - 7 * 86400000),
    toDate: new Date(),
    textInHeader: "",
    textInBody: "",
    recipientType: "",
    messageType: ""
  });

  const handleClear = () => {
    setSearchParams({
      fromDate: new Date(Date.now() - 7 * 86400000),
      toDate: new Date(),
      textInHeader: "",
      textInBody: "",
      recipientType: "",
      messageType: ""
    });
  };

  const handleSearch = () => {
    setShowResults(true);
    setTimeout(() => {
      if (resultsRef.current) {
        const yOffset = -80; 
        const element = resultsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  };


  return (
    <>
      <MainSearchContainer
        hasClearButton
        onClear={handleClear}
        hasSearchButton
        onSearch={handleSearch}
        pageTitle={"שאילתת הודעות בוקר"}
      >
        <SearchContent
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </MainSearchContainer>

      {showResults && (
        <div ref={resultsRef} >
          <ResultsComponent />
        </div>
      )}
    </>
  );
}

export default App;
