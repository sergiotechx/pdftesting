
import Link from 'next/link';

import { PDFDocument } from 'pdf-lib'

import fs from 'fs/promises';


export default async function Home() {
  let modifiedPdfBytes: Uint8Array;
  const pdfData = await fs.readFile('./public/test.pdf');
  const pdfDoc = await PDFDocument.load(pdfData);
  // Obtener el formulario del PDF
  const form = pdfDoc.getForm();

  // Obtener el campo de texto con el nombre "$nombre"
  const nombreField = form.getTextField('name');

  // Actualizar el valor del campo a "Juan"
  nombreField.setText('One Punch Man');
  modifiedPdfBytes = await pdfDoc.save();
  fs.writeFile('./public/modified.pdf', modifiedPdfBytes);


  return (
    <Link href="/modified.pdf">Blog Post</Link>



  );
}
