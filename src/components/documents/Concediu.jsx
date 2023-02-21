import React from 'react';
import { jsPDF } from 'jspdf';
import { PDFObject } from 'react-pdfobject';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import './Roboto';

function Concediu({ data, date }) {
    const [url, setUrl] = React.useState('');
    const doc = new jsPDF({ lineHeight: 1.5 });
    var centerText = doc.internal.pageSize.getWidth() / 2;
    doc.setFont('Roboto', 'normal');

    if (data) {
        let demisieBody = `
        Subsemnatul(a) ${data.name ? data.name : '_____________________'}, angajată a companiei ${
            data.company ? data.company : '_____________________'
        }, cu functia de ${
            data.function ? data.function : '_____________________'
        }, in Departamentul ${
            data.department ? data.department : '_____________________'
        }., vă rog să-mi aprobaţi cererea de concediu de odihnă începând cu data de ${
            date.startDate ? date.startDate : '_____________________'
        }, pentru o perioadă de ${data.period ? data.period : '_____________________'} zile.

        Solicit ca drepturile băneşti care mi se cuvin în contul concediului legal de odihnă să le primesc o dată cu încasarea salariului din luna ${
            data.month ? data.month : '_____________________'
        }.`;
        doc.splitTextToSize(demisieBody, 180);
        doc.text('DOMNULE DIRECTOR,', centerText, 80, { align: 'center' }).setFontSize('16');
        doc.setFontSize('14');
        doc.text(15, 90, doc.splitTextToSize(demisieBody, 180));
        doc.text(`Data ${date.startDate ? date.startDate : '_____________________'}`, 10, 180);
        doc.text('Semnătura _____________________', 120, 180);
    }

    // var url = doc.output('bloburi');
    React.useEffect(() => {
        setUrl(doc.output('bloburi'));
    }, [data, date]);

    const generatePDF = () => {
        doc.save(`Concediu(${data.name}).pdf`);
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

export default Concediu;
