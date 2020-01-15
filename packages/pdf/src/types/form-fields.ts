import { PDFAnnotationData } from 'pdfjs-dist';

// TODO move to PDFJS.PDFAnnotationData
export interface FormFields extends PDFAnnotationData {
  // Original
  borderStyle: any;
  id: string;
  modificationDate: null;
  annotationType: number;
  fieldName: string;
  fieldType: 'Tx' | 'Btn';
  fieldValue: string;
  alternativeText: string;
  defaultAppearance: string;
  fieldFlags: number;
  readOnly: boolean;
  checkBox?: true
  radioButton?: boolean
  pushButton?: boolean
  textAlignment?: number;
  maxLen?: number | null;
  multiLine?: boolean;
  comb: boolean;

  // Custom
  parsedFieldType?: 'text' | 'textarea' | 'checkBox' | 'radioButton' | 'pushButton';
  parsedFieldValue?: boolean | string | number;

}
