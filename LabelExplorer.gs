/**
 * List Labels on a Drive Item
 *  *
 * @param {string} fileId The Drive File ID
 */
function listLabelsOnDriveItem(fileId) {
  try {
    var appliedLabels = Drive.Files.listLabels(fileId);
        console.log('%d label(s) are applied to this file', appliedLabels.items.length);

    appliedLabels.items.forEach((appliedLabel) => {
      // Resource name of the label at the applied revision.
      const labelName = 'labels/' + appliedLabel.id + '@' + appliedLabel.revisionId;

      console.log('Fetching Label: %s', labelName);
      const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});

      console.log('Label Title: %s', label.properties.title);
    });
    return appliedLabels;
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}


/**
 * List Labels on a Drive Item
 * Fetches a Drive Item and prints all applied values along with their to their
 * human-readable names.
 *
 * @param {string} fileId The Drive File ID
 */
function listLabelsOnDriveItemPrint(fileId) {
  try {
    const appliedLabels = Drive.Files.listLabels(fileId);

    console.log('%d label(s) are applied to this file', appliedLabels.items.length);

    appliedLabels.items.forEach((appliedLabel) => {
      // Resource name of the label at the applied revision.
      const labelName = 'labels/' + appliedLabel.id + '@' + appliedLabel.revisionId;

      console.log('Fetching Label: %s', labelName);
      const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});

      console.log('Label Title: %s', label.properties.title);


    Object.keys(appliedLabel.fields || {}).forEach((fieldId) => {
      const fieldValue = appliedLabel.fields[fieldId];
    // Asegúrate también de que label.fields está definido antes de intentar encontrar algo dentro de él.
      const field = label.fields ? label.fields.find((f) => f.id == fieldId) : undefined;
        console.log(`Field ID: ${field.id}, Display Name: ${field.properties.displayName}`);
        switch (fieldValue.valueType) {
          case 'text':
            console.log('Text: %s', fieldValue.text[0]);
            break;
          case 'integer':
            console.log('Integer: %d', fieldValue.integer[0]);
            break;
          case 'dateString':
            console.log('Date: %s', fieldValue.dateString[0]);
            break;
          case 'user':
            const user = fieldValue.user.map((user) => {
              return `${user.emailAddress}: ${user.displayName}`;
            }).join(', ');
            console.log(`User: ${user}`);
            break;
          case 'selection':
            const choices = fieldValue.selection.map((choiceId) => {
              return field.selectionOptions.choices.find((choice) => choice.id === choiceId);
            });
            const selection = choices.map((choice) => {
              return `${choice.id}: ${choice.properties.displayName}`;
            }).join(', ');
            console.log(`Selection: ${selection}`);
            break;
          default:
            console.log('Unknown: %s', fieldValue.valueType);
            console.log(fieldValue.value);
        }
      });
    });
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}

function listLabelsOnDriveItem(fileId, labelNameToFind) {
  try {
     console.log('**************Entrada***************');
    
    const appliedLabels = Drive.Files.listLabels(fileId);
    console.log('%d label(s) are applied to this file', appliedLabels.items.length);

    let labelValueFound; // Variable para almacenar el valor de la etiqueta encontrada

    appliedLabels.items.forEach((appliedLabel) => {
      // Nombre del recurso de la etiqueta en la revisión aplicada.
      const labelName = 'labels/' + appliedLabel.id + '@' + appliedLabel.revisionId;

      const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});
      // Comprueba si el título de la etiqueta coincide con el buscado.
      if (label.properties.title === labelNameToFind) {
        console.log('Label Title: %s', label.properties.title);

        Object.keys(appliedLabel.fields || {}).forEach((fieldId) => {
          const fieldValue = appliedLabel.fields[fieldId];
          const field = label.fields.find((f) => f.id == fieldId);

          // Asumiendo que estás interesado en el primer campo de la etiqueta para simplificar.
          if (fieldValue && fieldValue.valueType) {
            switch (fieldValue.valueType) {
          case 'text':
            console.log('Text: %s', fieldValue.text[0]);
            break;
          case 'integer':
            console.log('Integer: %d', fieldValue.integer[0]);
            break;
          case 'dateString':
            console.log('Date: %s', fieldValue.dateString[0]);
            break;
          case 'user':
            const user = fieldValue.user.map((user) => {
              return `${user.emailAddress}: ${user.displayName}`;
            }).join(', ');
            console.log(`User: ${user}`);
            break;
          case 'selection':
            const choices = fieldValue.selection.map((choiceId) => {
              return field.selectionOptions.choices.find((choice) => choice.id === choiceId);
            });
            const selection = choices.map((choice) => {
              return `${choice.id}: ${choice.properties.displayName}`;
            }).join(', ');
            console.log(`Selection: ${selection}`);
            break;
          default:
            console.log('Unknown: %s', fieldValue.valueType);
            console.log(fieldValue.value);
        }
          }
        });
      }
    });

    if (labelValueFound) {
      console.log(`Valor encontrado para '${labelNameToFind}': ${labelValueFound}`);
      return labelValueFound; // Devuelve el valor encontrado
    } else {
      console.log(`Etiqueta '${labelNameToFind}' no encontrada o sin valor.`);
      return null; // O maneja como prefieras si la etiqueta no se encuentra o no tiene valor
    }
  } catch (err) {
    console.error('Failed with error %s', err.message);
    return null; // Asegúrate de manejar errores adecuadamente
  }
}


function listLabelsOnDriveItem(fileId, labelNameToFind) {
  try {
  
    const appliedLabels = Drive.Files.listLabels(fileId);

    // Variable para almacenar los valores encontrados de los campos deseados.
    let valuesFound = []; 

    appliedLabels.items.forEach((appliedLabel) => {
      // Nombre del recurso de la etiqueta en la revisión aplicada.
      const labelName = 'labels/' + appliedLabel.id + '@' + appliedLabel.revisionId;

      const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});

      // Comprueba si el título de la etiqueta coincide con el buscado.
      if (label.properties.title === labelNameToFind) {
        Object.keys(appliedLabel.fields || {}).forEach((fieldId) => {
          const fieldValue = appliedLabel.fields[fieldId];
          const field = label.fields ? label.fields.find((f) => f.id == fieldId) : undefined;

          if (field && fieldValue && fieldValue.valueType === 'selection') {
            // Para campos de selección, extrae las selecciones aplicadas
            const choices = fieldValue.selection.map((choiceId) => {
              return field.selectionOptions.choices.find((choice) => choice.id === choiceId);
            }).filter(choice => choice); // Filtra para asegurarse de que exista la elección

            const selection = choices.map((choice) => {
              return `${choice.id}: ${choice.properties.displayName}`;
            }).join(', ');

            // Agrega el valor de la selección encontrada a la lista de valores encontrados.
            if (selection) valuesFound.push(selection);
          }
        });
      }
    });

    if (valuesFound.length > 0) {
      // Imprime y devuelve los valores encontrados
      valuesFound.forEach(value => console.log(`Valor encontrado: ${value}`));
      return valuesFound.join(', '); // Devuelve los valores encontrados como una cadena
    } else {
      return null; // O maneja como prefieras si la etiqueta no se encuentra o no tiene valores de selección
    }
  } catch (err) {
    console.error('Failed with error %s', err.message);
    return null; // Asegúrate de manejar errores adecuadamente
  }
}





function listLabelsOnDriveItemAux(fileId, labelNameToFind) {
  try {
    const appliedLabels = Drive.Files.listLabels(fileId);

    let valuesFound = {}; // Objeto para almacenar los valores encontrados de los campos deseados.

    appliedLabels.items.forEach((appliedLabel) => {
      const labelName = 'labels/' + appliedLabel.id + '@' + appliedLabel.revisionId;
      const label = DriveLabels.Labels.get(labelName, {view: 'LABEL_VIEW_FULL'});

      if (label.properties.title === labelNameToFind) {

        Object.keys(appliedLabel.fields || {}).forEach((fieldId) => {
          const fieldValue = appliedLabel.fields[fieldId];
          
          const field = label.fields ? label.fields.find((f) => f.id == fieldId) : undefined;

          if (field && fieldValue && fieldValue.valueType === 'selection') {
            const choices = fieldValue.selection.map((choiceId) => {
              return field.selectionOptions.choices.find((choice) => choice.id === choiceId);
            }).filter(choice => choice);

            choices.forEach((choice) => {
              // Aquí es donde se realiza el cambio principal
              // Almacenamos el displayName del campo como clave y el displayName del choice como valor
              valuesFound[field.properties.displayName] = choice.properties.displayName;
            });
          }
        });
      }
    });

    if (Object.keys(valuesFound).length > 0) {
      return valuesFound;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Failed with error %s', err.message);
    return null;
  }
}





