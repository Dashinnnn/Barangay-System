import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export class PdfService {

    async generateBarangayClearance(data: {
        resident: any;
        purpose: string;
        requestId: string;
        issuedBy: string;
        barangayName?: string;
    }) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4
        const { width, height } = page.getSize();
        
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        let y = height - 80;

        // Header
        page.drawText('REPUBLIC OF THE PHILIPPINES', { x: 150, y, size: 11, font: boldFont });
        y -= 25;
        page.drawText(`BARANGAY ${data.barangayName || 'YOUR BARANGAY'}`, { x: 170, y, size: 14, font: boldFont });
        y -= 40;

        page.drawText('OFFICE OF THE PUNONG BARANGAY', { x: 160, y, size: 12, font });
        y -= 50;

        page.drawText('BARANGAY CLEARANCE', { x: 180, y, size: 22, font: boldFont });
        y -= 60;

        // Body
        page.drawText(`Control No: ${data.requestId}`, { x: 400, y: height - 140, size: 11, font });

        page.drawText('This is to certify that:', { x: 50, y, size: 12, font });
        y -= 35;

        const fullName = `${data.resident.firstName} ${data.resident.middleName || ''} ${data.resident.lastName}`.trim().toUpperCase();
        page.drawText(fullName, { x: 50, y, size: 14, font: boldFont });
        y -= 30;

        page.drawText(`of Purok ${data.resident.purok?.name || '—'}, Barangay ${data.barangayName || '—'}`, { x: 50, y, size: 12, font });
        y -= 40;

        page.drawText('is of legal age and has no pending case or derogatory record in this barangay as of this date.', { x: 50, y, size: 12, font, maxWidth: 480 });
        y -= 50;

        page.drawText(`Purpose: ${data.purpose}`, { x: 50, y, size: 12, font, maxWidth: 480 });
        y -= 60;

        page.drawText('This certification is issued upon request for whatever legal purpose it may serve.', { x: 50, y, size: 11, font });

        // Footer
        y = 120;
        page.drawText(`Issued on: ${new Date().toLocaleDateString('en-PH')}`, { x: 50, y, size: 11, font });
        y -= 30;
        page.drawText(`Issued by: ${data.issuedBy}`, { x: 50, y, size: 11, font });
        y -= 25;
        page.drawText('Punong Barangay / Authorized Representative', { x: 50, y, size: 11, font });

        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
}

export const pdfService = new PdfService();