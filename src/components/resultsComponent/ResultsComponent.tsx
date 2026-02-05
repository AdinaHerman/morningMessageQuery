import { useEffect, useState } from 'react';
import { useTranslation } from 'multi-channel-core';
import { Toast } from '@igds/react/toast';
import { useApiRequest, Title } from 'multi-channel-core';
import mockData from '../../mocks/morning-messages.mock.json';
import type { SearchParamsType } from '../../types/apiTypes';
import ResultsTable from './resultsTable/resultsTable';
import style from './resultsComponent.module.scss';

const ResultsComponent = ({ searchFilterParams }: { searchFilterParams: SearchParamsType }) => {
    const [resultExist, setResultExist] = useState(false);
    const { t } = useTranslation();
    const { response: res } = useApiRequest({
        url: "/rest-api-to-get-response-page-data",
        method: "GET",
        data: { ...searchFilterParams }
    });

    useEffect(() => {
        if (res.status == 'success' && mockData.morningMessages.length > 0) {
            setResultExist(true);
        }
    }, [res.status]);

    return (
        <div>
            {resultExist && (
                <>
                    <Title title={t('searchResults')} subTitle={''} />
                    <ResultsTable results={mockData.morningMessages} />
                </>
            )}
            {!resultExist && (
                <Toast
                    className={style.toast}
                    type="inline"
                    variant="failure"
                >
                    <span>{t('noResultsMessage')}</span>
                </Toast>
            )}
        </div>
    );
}

export default ResultsComponent;
