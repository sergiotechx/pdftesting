
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
  const currentTime = new Date();
  const timeString = currentTime.toLocaleTimeString();


  // Actualizar el valor del campo a "Juan"
  nombreField.setText('One Punch Man: ' + timeString);
  modifiedPdfBytes = await pdfDoc.save();

  const modifiedPdfPath = './public/modified.pdf';
  try {
    await fs.unlink(modifiedPdfPath);
  } catch (error: any) {
    if (error.code !== 'ENOENT') { // ENOENT means file does not exist
      // rethrow the error if it's not related to file non-existence
    }
  }

  fs.writeFile('./public/modified.pdf', modifiedPdfBytes);
  console.log('primero acá')

  return (
    <>
      {console.log('segundo acá! ')}
      <Link href="/modified.pdf">Blog Post</Link>
    </>



  );
}
