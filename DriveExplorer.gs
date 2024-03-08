/**
 * Obtiene la lista de unidades compartidas disponibles.
 * @return {Array} Lista de las unidades compartidas.
 */
function getSharedDrivesList() {
  var drives = Drive.Drives.list(); // Usa el servicio avanzado de Drive
  var driveList = [];
  if (drives.items) {
    drives.items.forEach(function(drive) {
      driveList.push({id: drive.id, name: drive.name});
    });
  }
  return driveList;
}

/**
 * Explora recursivamente los archivos de una unidad compartida específica.
 * @param {String} driveId ID de la unidad compartida a explorar.
 * @param {String} folderId ID de la carpeta para empezar la exploración. Opcional.
 * @return {Array} Lista de archivos en la unidad compartida.
 */
function exploreDrive(driveId, folderId = null) {
  var query = `'${folderId || driveId}' in parents and trashed=false`;
  var files = Drive.Files.list({q: query, supportsAllDrives: true, includeItemsFromAllDrives: true});
  var fileList = [];
  if (files.items) {
    files.items.forEach(function(file) {
      fileList.push({id: file.id, name: file.title, mimeType: file.mimeType});
      // Si es una carpeta, explora su contenido de forma recursiva
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        fileList = fileList.concat(exploreDrive(driveId, file.id));
      }
    });
  }
  return fileList;
}

/**
 * Obtiene las etiquetas (metadatos) de un archivo específico.
 * @param {String} fileId ID del archivo del que obtener las etiquetas.
 * @return {Object} Etiquetas del archivo.
 */
function getFileLabels(fileId) {
  var file = Drive.Files.get(fileId, {fields: 'properties'});
  return file.properties || {};
}

/**
 * Modifica las etiquetas (metadatos) de un archivo.
 * @param {String} fileId ID del archivo a modificar.
 * @param {Object} newLabels Nuevas etiquetas para el archivo.
 */
function modifyFileLabels(fileId, newLabels) {
  var resource = {properties: newLabels};
  Drive.Files.patch(resource, fileId);
}

/**
 * Obtiene el nombre y la ruta de un archivo en Google Drive dado su ID.
 *
 * @param {string} fileId El ID del archivo en Google Drive.
 * @return {object} Un objeto conteniendo el nombre del archivo y su ruta.
 */
function getFileNameAndPath(fileId) {
  // Obtiene el archivo por su ID
  var file = DriveApp.getFileById(fileId);
  var fileName = file.getName();
  
  // Obtiene las carpetas padres del archivo
  var folders = file.getParents();
  var path = [];
  while (folders.hasNext()) {
    var folder = folders.next();
    path.unshift(folder.getName()); // Añade el nombre de la carpeta al inicio del array para construir la ruta
    folders = folder.getParents(); // Actualiza 'folders' para iterar sobre los padres del padre actual
  }
  
  // Construye la ruta como una cadena de texto
  var fullPath = path.join('/') + '/' + fileName;
  
  // Retorna el nombre del archivo y la ruta
  return {
    name: fileName,
    path: fullPath
  };
}
