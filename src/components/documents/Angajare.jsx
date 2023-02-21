import React from 'react';
import { jsPDF } from 'jspdf';
import { PDFObject } from 'react-pdfobject';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import './Roboto';

function Angajare({ data, date }) {
    const doc = new jsPDF({ lineHeight: 1.5 });
    var centerText = doc.internal.pageSize.getWidth() / 2;
    doc.setFont('Roboto', 'normal');

    if (data) {
        let demisieBody = `
        Subsemnatul(a) ${data.name ? data.name : '_____________________'}, domiciliat(ă) în ${
            data.city ? data.city : '_____________________'
        } str.${data.street ? data.street : '_____________________'}, ap.${
            data.apartment ? data.apartment : '______'
        }, telefon ${data.phone ? data.phone : '_____________________'}, 
        Rog să-mi aprobaţi angajarea în funcţie de ${
            data.function ? data.function : '_____________________'
        }, secția ${data.section ? data.section : '_____________________'}, începînd cu data ${
            date.endDate ? date.endDate : '_____________________'
        }.`;
        doc.splitTextToSize(demisieBody, 180);
        doc.text('CERERE DE ANGAJARE', centerText, 80, { align: 'center' }).setFontSize('16');
        doc.setFontSize('14');
        doc.text(15, 100, doc.splitTextToSize(demisieBody, 180));
        doc.text(`Data ${date.startDate ? date.startDate : '_____________________'}`, 10, 180);
        doc.text('Semnătura _____________________', 120, 180);
    }

    const url = doc.output('bloburi');
    const generatePDF = () => {
        doc.save(`Angajare(${data.name}).pdf`);
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

export default Angajare;
