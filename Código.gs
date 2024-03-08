/**
 * Función principal que orquesta la ejecución del script.
 */
function main() {
  try {
    // Llamada a la funcion que indica todas las unidades compartidas
    var sharedDrives = getSharedDrivesList();
  
    //Elegimos que unidad del array seleccionamos
    var filesDrives = sharedDrives[0].id;
    
    //Exploramos el contenida de esa unidad
    var filesRecursiveDrives = exploreDrive(filesDrives);
   
    //Buscamos el valor de una etiqueta.
  evaluateFileUpdateStatus  = evaluateFileUpdateStatus(filesRecursiveDrives[0].id);

  
  var labelNameToFind = 'Departamento'; // Sustituye por el nombre real de la etiqueta que estás buscando

  var result = listLabelsOnDriveItemAux(filesRecursiveDrives[0].id, labelNameToFind);
    

    // Supongamos que deseas explorar la primera unidad compartida (si existe) y enviar un resumen por correo
/** 
    if (sharedDrives.length > 0) {
      var driveId = sharedDrives[0].id;
      var files = exploreDrive(driveId);
      var emailData = {
        name: "Administrador",
        message: "Se encontraron " + files.length + " archivos en la unidad compartida."
      };
      var emailBody = composeEmail(emailData);
      var recipient = "josecarlos.navarro@vermont-solutions.com"; // Cambia esto por el correo real del destinatario
      var subject = "Resumen de Archivos de Unidad Compartida";

      //sendEmail(recipient, subject, emailBody);
    } else {
      Logger.log("No se encontraron unidades compartidas.");
    }*/
  } catch (error) {
    // Manejo de errores
    handleError(error);
  }
}

