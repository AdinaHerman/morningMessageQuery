import html2pdf from 'html2pdf.js';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getDateDaysAgo = (days: number) => {
  return new Date(Date.now() - days * DAY_IN_MS);
};

export const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const scrollToResults = (ref) => {
  setTimeout(() => {
    if (ref.current) {
      const yOffset = -80;
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, 100);
}

export const generatePDF = (htmlContent: string, fileName: string) => {
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