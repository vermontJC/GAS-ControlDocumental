// ConfigManager.gs

/**
 * Carga la configuración de las unidades compartidas desde Google Drive.
 * @return {Object} Objeto JSON con la configuración de las unidades compartidas.
 */
function loadSharedDrivesConfig() {
  var fileId = '1RaRjFb1qtKErPBSNoaSPmf3KJol-0456';//var fileId = 'YOUR_SHARED_DRIVES_CONFIG_FILE_ID_HERE'; // Reemplaza con el ID real de tu archivo de configuración
  return loadJsonFromDrive(fileId);
}

/**
 * Carga la plantilla de correo electrónico desde Google Drive.
 * @return {String} Contenido de la plantilla de correo electrónico.
 */
function loadEmailTemplate() {
  var fileId = '18ka0zguqwgrR7btBN_0cR8_lOihe0RB-'; //var fileId = 'YOUR_EMAIL_TEMPLATE_FILE_ID_HERE'; // Reemplaza con el ID real de tu archivo de plantilla
  return loadTextFromDrive(fileId);
}

/**
 * Carga la correlación entre etiquetas y valores desde Google Drive.
 * @return {Object} Objeto JSON con la correlación entre etiquetas y valores.
 */
function loadLabelCorrelations() {
  var fileId = '1L-qUgIbiwB49AOjspuHTDPY5aaITnTL0'; //var fileId = 'YOUR_LABEL_CORRELATIONS_FILE_ID_HERE'; // Reemplaza con el ID real de tu archivo de correlaciones
  return loadJsonFromDrive(fileId);
}

/**
 * Carga un archivo JSON desde Google Drive y lo parsea a un objeto.
 * @param {String} fileId ID del archivo en Google Drive.
 * @return {Object} Objeto JSON parseado.
 */
function loadJsonFromDrive(fileId) {
  var file = DriveApp.getFileById(fileId);
  var content = file.getBlob().getDataAsString();
  Logger.log(content); // Esto mostrará el contenido del archivo en los logs
  var json = JSON.parse(content);
  return json;
}


/**
 * Carga un archivo de texto (como una plantilla HTML) desde Google Drive.
 * @param {String} fileId ID del archivo en Google Drive.
 * @return {String} Contenido del archivo de texto.
 */
function loadTextFromDrive(fileId) {
  var file = DriveApp.getFileById(fileId);
  var content = file.getBlob().getDataAsString();
  return content;
}
