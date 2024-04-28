
import Link from 'next/link';

import { PDFDocument } from 'pdf-lib'

import fs from 'fs/promises';
import Local from './local';


export default async function Home() {
 
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
  
 
  
  console.log('primero acá')

  return (
    <>
      {console.log('segundo acá! ')}
     <Local modifiedPdfBytes={modifiedPdfBytes}/>
     
    </>



  );
}
