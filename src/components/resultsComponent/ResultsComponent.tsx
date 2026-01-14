import Title from 'multi-channel-core/src/ui/common/title/Title';
import ResultsTable from '../resultsTable/ResultsTable';
import './ResultsComponent.scss';



function ResultsComponent() {

    return (
        <div>
            <Title title='תוצאות חיפוש' subTitle={''} />
            <ResultsTable />
        </div>
    );
}

export default ResultsComponent;
