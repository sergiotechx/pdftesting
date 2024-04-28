'use client'
import download from 'downloadjs'
import React from 'react'
interface Props {
  modifiedPdfBytes: Uint8Array
}

const Local = ({ modifiedPdfBytes }: Props) => {
  const test = () => {
 
    const modifiedPdfBuffer: Buffer = Buffer.from(modifiedPdfBytes);
    const stringbase64 = modifiedPdfBuffer.toString('base64');
    const blobPDF = base64toBlob(stringbase64, 'application/pdf');
    download(new Blob([blobPDF]), 'filename.pdf', 'application/pdf');
  }

  function base64toBlob(base64Data:string, contentType = '') {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
  
    for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex += 1) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
  
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; i += 1, offset += 1) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
  
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }
  return (
    <div>
      <button onClick={() => test()}>click</button>
    </div>
  )
}

export default Local