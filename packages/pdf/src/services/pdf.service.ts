// see https://github.com/freewind-demos/typescript--pdf-js--webwork-embed-all-in-single-html-demo/blob/master/entry.ts
import  * as PDFJS from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';

import { FormFields } from '../types';


export class PdfService {
  protected pdfJs = PDFJS;
  constructor(workerSrc?: string) {
    if (workerSrc) {
      PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
    }
  }

  // see https://github.com/mozilla/pdf.js/blob/master/examples/acroforms/acroforms.js
  public async getPdfAnnotations(url: string) {
    const pdfDocumentProxy = await (PDFJS.getDocument(url).promise);

    console.log('numPages', pdfDocumentProxy.numPages);

    const pdfPageProxies: PDFJS.PDFPageProxy[] = [];
    let pdfAnnotations: FormFields[] = [];

    for (var i = 1; i <= pdfDocumentProxy.numPages; i++) {
      const pdfPageProxy = await pdfDocumentProxy.getPage(i);
      pdfPageProxies.push(pdfPageProxy);
    }

    for (var i = 0; i < pdfPageProxies.length; i++) {
      const pdfAnnotationsbyPage = await pdfPageProxies[i].getAnnotations() as unknown as FormFields[];
      console.debug('pdfAnnotationsbyPage ' + i, pdfAnnotationsbyPage);
      pdfAnnotations = [ ...pdfAnnotations, ...pdfAnnotationsbyPage];
    }

    console.debug('all formFields', pdfAnnotations);

    pdfAnnotations = this.transformPdfAnnotations(pdfAnnotations);

    return pdfAnnotations;

  }

  protected transformPdfAnnotations(formFields: FormFields[]) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i] = this.transformPdfAnnotation(formFields[i]);
    }
    return formFields;
  }

  protected transformPdfAnnotation(formField: FormFields) {
    switch (formField.fieldType) {
      case 'Tx':
        formField.parsedFieldType = formField.multiLine ? 'textarea' : 'text';
        formField.parsedFieldValue = formField.fieldValue;
        break;
      case 'Btn':
        if (formField.checkBox) {
          formField.parsedFieldType = 'checkBox'
          formField.parsedFieldValue = formField.fieldValue === 'On';
        } else if (formField.radioButton) {
          formField.parsedFieldType = 'radioButton'
        } else if (formField.pushButton) {
          formField.parsedFieldType = 'pushButton'
        }
        break;
      default:
        console.debug(`Unknown fieldType: "${formField.fieldType}"`, formField);
        formField.parsedFieldValue = formField.fieldType;
        break;
    }
    return formField;
  }

  // public getFormFields() {
  //   getDocument
  // }
}
