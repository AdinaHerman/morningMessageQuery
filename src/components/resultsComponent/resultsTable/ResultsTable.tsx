import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import html2pdf from 'html2pdf.js';
import { Icon } from '@igds/react/icon';
import { Table, TableHeader, TableRow } from '@igds/react/table';
import type { resultsType, rowType } from '../../../types/apiTypes';
import style from './ResultsTable.module.scss';


const ResultsTable = ({ results }: { results: resultsType[] }) => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<rowType[]>([]);

  const columns = [
    { id: '1', name: '' },
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
          { value: '' },
          { value: msg.messageId.toString() },
          { value: msg.subject },
          { value: formatDate(msg.messageDate) },
          { value: msg.categoryName }
        ]
      }));

      setRows(mappedRows);

  }, []);

  

  const formatDate = (dateStr:string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const generatePDF = (htmlContent: string, fileName = 'message.pdf') => {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    document.body.appendChild(element);

    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).outputPdf('dataurlnewwindow').then(() => {
      document.body.removeChild(element);
    });
  };

  return (
    <div className={style.tableContainer}>
      <Table>
        <TableHeader columns={columns} />

        {rows.map((row, rowIndex) => (
          <React.Fragment key={row.id}>
            <div slot={`row=${rowIndex}:cell=0`} className={style.iconCell}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  generatePDF(row.contentHtml, `message-${row.messageId}.pdf`);
                }}
              >
                <Icon name="file" size="large" color="#0c3058" />
              </a>
            </div>
            <TableRow
              cells={row.cells}
              expandable="false"
            />
          </React.Fragment>
        ))}
      </Table>
    </div>
  );
}

export default ResultsTable;
