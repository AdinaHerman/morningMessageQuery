import { MainSearchContainer, RootLayout } from "multi-channel-core";
import { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import SearchContent from "../../components/searchContent/SearchContent";
import ResultsComponent from "../../components/resultsComponent/ResultsComponent";
// import './index.css'
// import './App.css';
import '../../multi-channel-core.css'
import '../../i18n/config';

function MorningMessageMainPage() {
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);
  const { t } = useTranslation();

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
    <RootLayout>
      <MainSearchContainer
        buttonsProps={{
          hasSearchButton: true,
          hasClearButton: true,
          onSearch: handleSearch,
          onClear: handleClear
        }}
        pageTitle={t('queryTitle')}
      >
        <SearchContent
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </MainSearchContainer>

      {showResults && (
        <div className="_resultsContainer" ref={resultsRef} >
          <ResultsComponent searchFilterParams={searchParams} />
        </div>
      )}

    </RootLayout>
  );
}

export default MorningMessageMainPage;
