// import { PDFAnnotationData } from "pdfjs-dist";

export interface SelectField {
  exportValue: string;
  displayValue: string;
}

export interface CustomGroupedRadioButton {
  fieldName?: string;
  /** label */
  fieldDesc?: string;
  fieldValue: boolean;
  id: string;
}

// TODO move to PDFJS.PDFAnnotationData
export interface FormFields /*extends PDFAnnotationData*/ {
  // Original
  borderStyle: any;
  id: string;
  modificationDate: null;
  annotationType: number;
  fieldName?: string;
  fieldType: "Tx" | "Btn" | "Ch";
  fieldValue: string;
  alternativeText: string;
  defaultAppearance: string;
  fieldFlags: number;
  readOnly: boolean;
  checkBox?: true;
  radioButton?: boolean;
  pushButton?: boolean;
  textAlignment?: number;
  maxLen?: number | null;
  multiLine?: boolean;
  comb: boolean;
  // select / dropdown
  options: SelectField[];

  // Custom
  parsedFieldType?:
    | "text"
    | "textarea"
    | "checkBox"
    | "checkBoxGroup"
    | "radioButtonGroup"
    | "radioButton"
    | "pushButton"
    | "select";
  parsedFieldValue?: boolean | string | number;
  parsedFieldName?: string;
  customId?: string;
  customOrderPosition?: number;
  customFieldDesc?: string;
  group: CustomGroupedRadioButton[];
}
