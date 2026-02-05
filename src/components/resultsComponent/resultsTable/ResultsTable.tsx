import React, { useEffect, useState } from 'react';
import { useTranslation } from "multi-channel-core";
import { Icon, Button } from '@igds/react';
import { Table, TableCell, TableHeader, TableRow } from '@igds/react/table';
import { generatePDF, formatDate } from '../../../utils/functions';
import type { resultsType, rowType } from '../../../types/apiTypes';
import style from './resultsTable.module.scss';

interface ResultsTableProps {
  results: resultsType[];
}

const ResultsTable = ({ results }: ResultsTableProps) => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<rowType[]>([]);

  const columns = [
    { id: '1', name: '', slotted: true },
    { id: '2', name: t('messageId') },
    { id: '3', name: t('subject') },
    { id: '4', name: t('date') },
    { id: '5', name: t('category') }
  ];

  useEffect(() => {
    const mappedRows = results.map((msg, index) => ({
      id: `row-${index}`,
      messageId: msg.messageId,
      contentHtml: msg.contentHtml,
      cells: [
        { value: msg.messageId.toString() },
        { value: msg.subject },
        { value: formatDate(msg.messageDate) },
        { value: msg.categoryName }
      ]
    }));
    setRows(mappedRows);
  }, []);

  return (
    <div className={style.tableContainer}>
      <Table>
        <TableHeader columns={columns} />
        {rows.map((row, rowIndex) => (
          <TableRow
            key={row.id}
            cells={row.cells}
            expandable="false"
          >
            <TableCell className={style.iconCell}>
              <Button
                variant="link"
                onIgdsClick={() => generatePDF(
                  row.contentHtml,
                  `message-${row.messageId}.pdf`
                )}>
                <Icon name="file" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

export default ResultsTable;