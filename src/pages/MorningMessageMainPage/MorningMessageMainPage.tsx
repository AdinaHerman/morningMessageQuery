import { MainSearchContainer, RootLayout } from "multi-channel-core";
import { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import SearchContent from "../../components/searchContent/searchContent";
import ResultsComponent from "../../components/resultsComponent/resultsComponent";
import { getDateDaysAgo } from "../../utils/functions";

function MorningMessageMainPage() {
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);
    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useState({
        fromDate: new Date(getDateDaysAgo(7)),
        toDate: new Date(),
        textInHeader: "",
        textInBody: "",
        recipientType: "",
        messageType: ""
    });

    const handleClear = () => {
        setSearchParams({
            fromDate: new Date(getDateDaysAgo(7)),
            toDate: new Date(),
            textInHeader: "",
            textInBody: "",
            recipientType: "",
            messageType: ""
        });
    };

    const handleSearch = () => {
        setShowResults(true);
        scrollToResults();

    };
    const scrollToResults = () => {
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
    }

    return (
        <RootLayout>
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
                <div ref={resultsRef} >
                    <ResultsComponent searchFilterParams={searchParams} />
                </div>
            )}

        </RootLayout>
    );
}

export default MorningMessageMainPage;
