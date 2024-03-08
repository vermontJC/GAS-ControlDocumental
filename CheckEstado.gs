/**
 * Evalúa si la última modificación del archivo cumple con el periodo de actualización especificado por la etiqueta "Estado Actualización".
 *
 * @param {string} fileId El ID del archivo en Google Drive.
 */
function evaluateFileUpdateStatus(fileId) {
  // Obtiene la fecha de la última modificación del archivo
  var lastModifiedDate = getLastModifiedDate(fileId);
  var lastModified = new Date(lastModifiedDate);
  
  // Obtiene la fecha actual
  var currentDate = new Date();
  
  // Calcula la diferencia en días
  var diffDays = (currentDate - lastModified) / (1000 * 60 * 60 * 24);

  // Obtiene el valor de la etiqueta "Estado Actualización"
  var labelsValues = listLabelsOnDriveItemAux(fileId, "Estado Actualizacion");


  if (labelsValues) {
    for (const [key, value] of Object.entries(labelsValues)) {
      if(key=='Revision'){
            var updatePeriod = value ;
      }
    }
  } else {
    console.log('No se encontraron resultados.');
  }

  // Calcula si la diferencia es mayor al valor de actualización
  if (updatePeriod && isUpdatePeriodExceeded(diffDays, updatePeriod)) {
    var fileData = getFileNameAndPath(fileId);
      // Imprime el nombre del archivo y su ruta en el log.
    console.log('Nombre del archivo: ' + fileData.name);
    console.log('Ruta completa: ' + fileData.path);
    console.log("Diferencia de dias "+diffDays+" Periodo "+updatePeriod);
    console.log("OK");
  } else {
    var fileData = getFileNameAndPath(fileId);
      // Imprime el nombre del archivo y su ruta en el log.
    console.log('Nombre del archivo: ' + fileData.name);
    console.log('Ruta completa: ' + fileData.path);
    console.log("Diferencia de dias "+diffDays+" Periodo "+updatePeriod);
    console.log("Fail");
  }
}

/**
 * Determina si la diferencia de días excede el periodo de actualización especificado.
 *
 * @param {number} diffDays Diferencia en días entre la fecha actual y la última modificación.
 * @param {string} updatePeriod Periodo de actualización (ej. "Anual", "Mensual").
 * @return {boolean} Verdadero si el periodo de actualización es excedido, falso de otra manera.
 */
function isUpdatePeriodExceeded(diffDays, updatePeriod) {
  // Mapeo de periodos de actualización a días
  const periodToDays = {
    "5 años": 365 * 5,
    "2 años": 365 * 2,
    "Anual": 365,
    "Semestral": 365 / 2,
    "Trimestral": 365 / 4,
    "Mensual": 30 // Asumiendo aproximadamente 30 días por mes
  };

  // Obtiene el número de días correspondiente al periodo de actualización
  var periodDays = periodToDays[updatePeriod];

  // Retorna verdadero si la diferencia de días es mayor al periodo de actualización
  return diffDays > periodDays;
}

/**
 * Devuelve la fecha de la última modificación de un archivo en Google Drive.
 *
 * @param {string} fileId El ID del archivo en Google Drive.
 * @return {Date} La fecha de la última modificación del archivo.
 */
function getLastModifiedDate(fileId) {
  var file = DriveApp.getFileById(fileId);
  var lastUpdated = file.getLastUpdated();
  return lastUpdated;
}
