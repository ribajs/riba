// see https://github.com/freewind-demos/typescript--pdf-js--webwork-embed-all-in-single-html-demo/blob/master/entry.ts
import  * as PDFJS from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';

import { FormFields, FormGroup } from '../types';


export class PdfService {
  protected pdfJs = PDFJS;
  constructor(workerSrc?: string) {
    if (workerSrc) {
      PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
    }
  }

  // see https://github.com/mozilla/pdf.js/blob/master/examples/acroforms/acroforms.js
  public async getPdfAnnotations(url: string, group: boolean = true): Promise<FormGroup[]> {
    const pdfDocumentProxy = await (PDFJS.getDocument(url).promise);

    const pdfPageProxies: PDFJS.PDFPageProxy[] = [];
    let pdfAnnotations: FormFields[] = [];

    for (var i = 1; i <= pdfDocumentProxy.numPages; i++) {
      const pdfPageProxy = await pdfDocumentProxy.getPage(i);
      pdfPageProxies.push(pdfPageProxy);
    }

    for (var i = 0; i < pdfPageProxies.length; i++) {
      const pdfAnnotationsbyPage = await pdfPageProxies[i].getAnnotations() as unknown as FormFields[];
      pdfAnnotations = [ ...pdfAnnotations, ...pdfAnnotationsbyPage];
    }

    pdfAnnotations = this.transformPdfAnnotations(pdfAnnotations);


    let formGroups = [{
      group: pdfAnnotations,
    }];

    if (group) {
      formGroups = this.groupByFieldNames(pdfAnnotations);
    }

    console.debug('formGroups', formGroups);
    formGroups = this.groupRadioButtons(formGroups);

    return formGroups;

  }

  protected groupRadioButtons(formGroups: FormGroup[]): FormGroup[] {

    for (let i = 0; i < formGroups.length; i++) {
      const formGroup = formGroups[i];
      for (let k = formGroup.group.length - 2; k >= 0; k--) {
        const currentFormFields = formGroup.group[k];
        const lastFormFields = formGroup.group[k + 1];
        if (currentFormFields.parsedFieldType === 'radioButton' || currentFormFields.parsedFieldType === 'checkBox' && currentFormFields.parsedFieldName === lastFormFields.parsedFieldName) {
          if (!lastFormFields.group) {
            lastFormFields.group = [];
            lastFormFields.group.push({
              fieldName: lastFormFields.parsedFieldName,
              fieldDesc: lastFormFields.customFieldDesc,
              fieldValue: true,
              id: lastFormFields.customId || lastFormFields.id,
            });
            // lastFormFields.parsedFieldType = lastFormFields.parsedFieldType === 'radioButton' ? 'radioButtonGroup' : 'checkBoxGroup';
            lastFormFields.parsedFieldType = 'radioButtonGroup';
          }
          lastFormFields.group.push({
            fieldName: currentFormFields.parsedFieldName,
            fieldDesc: currentFormFields.customFieldDesc,
            fieldValue: false,
            id: currentFormFields.customId || currentFormFields.id,
          });
          console.debug('grouped radio button ' + k, currentFormFields);
          console.debug('lastFormFields', lastFormFields);
          // Remove current item
          formGroup.group.splice(k, 1);
        }
      }
    }

    return formGroups;
  }

  protected transformPdfAnnotations(formFields: FormFields[]) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i] = this.transformPdfAnnotation(formFields[i], i);
    }
    return formFields;
  }

  protected splitFieldName(formField: FormFields) {
    const fieldName = formField.parsedFieldName || formField.fieldName;
    let customOrderPosition: number | undefined = undefined;
    let groupNames: string[] = [];
    if(fieldName) {

      // split name on '][' or '[' or ']'
      groupNames = fieldName.split(/\]\[|\[|\]/g);

      // Remove empty group names
      for (let i = 0; i < groupNames.length; i++) {
        const groupName = groupNames[i];
        // Is order property?
        if (!isNaN(Number(groupName))) {
          customOrderPosition = Number(groupName);
          groupNames.splice(i);
          break;
        }
        if (!groupName || groupName === '') {
          groupNames.splice(i);
          break;
        }
      }
      return {
        groupNames,
        customOrderPosition,
      }
    }
    return {
      groupNames,
      customOrderPosition,
    };
  }

  /**
   * If the fieldName is [title][desciption][newFieldName] all fields with the same title will be grouped
   * You can also add an order position like this [title][desciption][newFieldName][10] and all fields with an order position will be sorted insite the group
   * @param formFields
   */
  protected groupByFieldNames(formFields: FormFields[]): FormGroup[] {

    const formGroups: FormGroup[] = [];

    // Group
    for (var i = 0; i < formFields.length; i++) {
      if (formFields[i]) {

        const currentForm = formFields[i];
        const {groupNames, customOrderPosition} = this.splitFieldName(currentForm);
        currentForm.customOrderPosition = customOrderPosition;
        const lastGroup = formGroups.length ? formGroups[formGroups.length -1] : undefined;

        const newGroup: FormGroup = {
          group: [currentForm]
        }

        if (groupNames) {
          switch (groupNames.length) {
            case 3:
              newGroup.name = groupNames[0];
              currentForm.parsedFieldName = groupNames[1];
              currentForm.customFieldDesc = groupNames[2];
              break;
            case 2:
              newGroup.name = groupNames[0];
              currentForm.parsedFieldName = groupNames[1];
              break;
            case 1:
              currentForm.parsedFieldName = groupNames[0];
              break;
            case 0:
              break;
            default:
              currentForm.parsedFieldName = groupNames[0];
              console.warn('Number of group names not supported: ', groupNames)
              break;
          }
        }

        // Push to exisiting group if name is the same
        if (newGroup.name && lastGroup && newGroup.name === lastGroup.name) {
          const lastForm = lastGroup.group[lastGroup.group.length -1];
          currentForm.customOrderPosition = typeof(currentForm.customOrderPosition) === 'number' ? currentForm.customOrderPosition : lastForm.customOrderPosition;
          if (lastForm && typeof(lastForm.customOrderPosition) === 'number' && typeof(currentForm.customOrderPosition) === 'number' && lastForm.customOrderPosition > currentForm.customOrderPosition) {
            lastGroup.group.unshift(currentForm);
          } else {
            lastGroup.group.push(currentForm);
          }
        } else {
          // New group
          formGroups.push(newGroup);
        }

      }
    }

    // Sort
    for (let i = 0; i < formGroups.length; i++) {
      const formGroup = formGroups[i];
      formGroup.group.sort((a, b) => {
        if (!a.customOrderPosition) {
          return -1;
        }
        if (!b.customOrderPosition) {
          return 1;
        }
        return a.customOrderPosition - b.customOrderPosition;
      });
    }

    return formGroups;
  }

  protected transformPdfAnnotation(formField: FormFields, index: number) {
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
        } else {
          console.warn(`Unknown Btn with index "${index}":`, formField);
        }
        break;
        case 'Ch':
          formField.parsedFieldType = 'select';
          break;
      default:
        console.warn(`Unknown fieldType with index "${index}": "${formField.fieldType}"`, formField);
        formField.parsedFieldValue = formField.fieldType;
        break;
    }

    if (typeof(formField.fieldName) === 'string') {
      // HEx to UTF-8
      formField.parsedFieldName = decodeURI(formField.fieldName.replace(/#/g, '%')) || formField.fieldName;
    }

    formField.customId = `${formField.id}_${formField.fieldName}`;
    return formField;
  }

  // public getFormFields() {
  //   getDocument
  // }
}
