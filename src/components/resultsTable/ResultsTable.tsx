import { Icon } from '@igds/react/icon';
import { Table, TableHeader, TableRow } from '@igds/react/table';
import React, { useEffect, useState } from 'react';
import { t } from "i18next";
import html2pdf from 'html2pdf.js';
import './ResultsTable.scss';

function ResultsTable() {
  const [rows, setRows] = useState([]);

  const columns = [
    { id: '1', name: '' },
    { id: '2', name: t('messageId') },
    { id: '3', name: t('subject') },
    { id: '4', name: t('date') },
    { id: '5', name: t('category') }
  ];

  useEffect(() => {
    fetch('/mocks/morning-messages.mock.json')
      .then(res => res.json())
      .then(data => {
        const mappedRows = data.morningMessages.map((msg, index) => ({
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
      });
  }, []);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // פונקציה ליצירת PDF
  const generatePDF = (htmlContent, fileName = 'message.pdf') => {
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
    <div className="table-container">
      <Table>
        <TableHeader columns={columns} />

        {rows.map((row, rowIndex) => (
          <React.Fragment key={row.id}>
            {/* תא האייקון */}
            <div slot={`row=${rowIndex}:cell=0`} className="table-icon-cell">
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

            {/* שורת הטבלה */}
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
