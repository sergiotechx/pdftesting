
import Link from 'next/link';

import { PDFDocument } from 'pdf-lib'

import fs from 'fs/promises';


export default async function Home() {
  /*const modifiedPdfPath = './public/modified.pdf';
  try {
    await fs.unlink(modifiedPdfPath);
  } catch (error: any) {
    if (error.code !== 'ENOENT') { // ENOENT means file does not exist
      // rethrow the error if it's not related to file non-existence
    }
  }*/
  let modifiedPdfBytes: Uint8Array;
  const pdfData = await fs.readFile('./public/test.pdf');
  const pdfDoc = await PDFDocument.load(pdfData);
  // Obtener el formulario del PDF
  const form = pdfDoc.getForm();

  // Obtener el campo de texto con el nombre "$nombre"
  const nombreField = form.getTextField('name');
  const currentTime = new Date();
  let timeString = currentTime.toLocaleTimeString();


  // Actualizar el valor del campo a "Juan"
  nombreField.setText('One Punch Man: ' + timeString);
  modifiedPdfBytes = await pdfDoc.save();
  timeString = timeString.replaceAll(':', '-')
  timeString +='.pdf'
  

  fs.writeFile(`./public/${timeString}`, modifiedPdfBytes);
  console.log('primero acá')

  return (
    <>
      {console.log('segundo acá! ')}
      <Link href={timeString}>Blog Post</Link>
     
    </>



  );
}
