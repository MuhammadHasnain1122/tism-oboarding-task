

export const FieldTypeEnum = {
    DATEPICKER: "DATEPICKER",
    SELECT: "SELECT",
    GROUP: "GROUP",
    CHECKBOX: "CHECKBOX",
    RADIO_GROUP: "RADIO_GROUP",
    INPUT: "INPUT",
    TEXTAREA: "TEXTAREA",
    TIMEPICKER: "TIMEPICKER",
    PANEL: 'panel',
  };
  

 export function assignValues(model: any, initial: any) {
    model.filter((fm: any) => fm.type !== FieldTypeEnum.GROUP)
      .forEach((field: any) => {
        if (initial) {
          field.value = initial[field.id];
        }
      });
    return model;
  }

