import { MainSearchContainer, RootLayout } from "multi-channel-core";
import { useRef, useState } from "react";
import { useTranslation } from 'multi-channel-core';
import { getDateDaysAgo, scrollToResults } from "../../utils/functions";
import SearchContent from "../../components/searchContent/searchContent";
import ResultsComponent from "../../components/resultsComponent/resultsComponent";

const initialSearchParams = {
    fromDate: new Date(getDateDaysAgo(7)),
    toDate: new Date(),
    textInHeader: "",
    textInBody: "",
    recipientType: "",
    messageType: ""
}

const MorningMessageMainPage = () => {
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useState(initialSearchParams);

    const handleSearch = () => {
        setShowResults(true);
        scrollToResults(resultsRef);
    };

    const handleClear = () => {
        setSearchParams(initialSearchParams);
    };

    return (
        <>
            <MainSearchContainer
                buttonsProps={{
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
                <div ref={resultsRef}>
                    <ResultsComponent searchFilterParams={searchParams} />
                </div>
            )}

        </>
    );
}

export default MorningMessageMainPage;
