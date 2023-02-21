import React from 'react';
import { jsPDF } from 'jspdf';
import { PDFObject } from 'react-pdfobject';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import './Roboto';

function Demisie({ data, date }) {
    const doc = new jsPDF({ lineHeight: 1.5 });
    var centerText = doc.internal.pageSize.getWidth() / 2;

    if (data) {
        let demisieBody = `
        Subsemnatul(a) ${data.name ? data.name : '_____________________'}, salariat la ${
            data.company ? data.company : '_____________________'
        }, în funcţia de ${
            data.position ? data.position : '_____________________'
        } vă rog să luaţi act de demisia mea, urmând să încetez activitatea la data de ${
            date.endDate ? date.endDate : '_____________________'
        }. 
        Perioada de timp dintre prezenta notificare şi data încetării activităţii reprezintă preavizul de ${
            data.gap ? data.gap : '___'
        } zile calendaristice prevăzut în contractul individual de muncă. În cazul în care doriţi să renunţaţi parţial sau total la preaviz vă rog să-mi comunicaţi.`;
        doc.splitTextToSize(demisieBody, 180);
        doc.text('DEMISIE', centerText, 80, { align: 'center' }).setFontSize('16');
        doc.setFont('Roboto', 'normal');

        doc.setFontSize('14');
        doc.text(15, 100, doc.splitTextToSize(demisieBody, 180));
        doc.text(`Data ${date.startDate ? date.startDate : '_____________________'}`, 10, 180);
        doc.text('Semnătura _____________________', 120, 180);
    }

    const url = doc.output('bloburi');
    const generatePDF = () => {
        doc.save(`Demisie(${data.name}).pdf`);
    };

    return (
        <>
            <div className="pdf">
                <PDFObject url={url} />
            </div>
            <button className="button-primary mt-5 font-semibold" onClick={generatePDF}>
                Descarcă PDF
                <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
        </>
    );
}

export default Demisie;
