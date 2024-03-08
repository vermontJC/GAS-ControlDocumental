function testLoadSharedDrivesConfig() {
  const config = loadSharedDrivesConfig();
  // Asegúrate de que config no es null o undefined
  if (!config) {
    throw new Error('loadSharedDrivesConfig returned null or undefined.');
  }
  // Aquí puedes agregar más aserciones, como verificar la estructura del objeto
}

function testLoadEmailTemplate() {
  const template = loadEmailTemplate();
  if (typeof template !== 'string' || template.length === 0) {
    throw new Error('loadEmailTemplate did not return a valid string.');
  }
  // Podrías buscar cadenas específicas dentro de tu template para asegurarte de que carga correctamente
}

function testLoadLabelCorrelations() {
  const correlations = loadLabelCorrelations();
  if (!Array.isArray(correlations)) {
    throw new Error('loadLabelCorrelations did not return an array.');
  }
  // Verifica que los elementos del array tengan la estructura esperada
}

function runAllTests() {
  testLoadSharedDrivesConfig();
  testLoadEmailTemplate();
  testLoadLabelCorrelations();
  Logger.log('All tests passed!');
}
/**
 * Test para la función composeEmail.
 */
function testComposeEmail() {
  // Datos de prueba
  var emailData = {
    name: "Nombre de Prueba",
    message: "Este es un mensaje de prueba."
  };

  // Ejecutar composeEmail con los datos de prueba
  var result = composeEmail(emailData);

  // Verificar que el resultado contiene los datos esperados
  var expectedName = "Nombre de Prueba";
  var expectedMessage = "Este es un mensaje de prueba.";

  if (!result.includes(expectedName) || !result.includes(expectedMessage)) {
    throw new Error("La función composeEmail no generó el resultado esperado.");
  } else {
    Logger.log("La prueba de composeEmail se completó con éxito.");
  }
}

function sendTestEmail() {
  var emailData = {
    name: "Nombre de Prueba",
    message: "Este es un mensaje de prueba enviado desde Google Apps Script."
  };

  var recipient = "josecarlos.navarro@vermont-solutions.com"; // Aquí es donde defines el correo del destinatario
  var subject = "Correo de Prueba";
  var body = composeEmail(emailData);

  sendEmail(recipient, subject, body);
}

function testHandleError() {
  var fakeError = {
    message: "Mensaje de prueba para handleError",
    fileName: "ErrorHandler.gs",
    lineNumber: 42
  };
  
  // Llama a handleError con el error de prueba
  handleError(fakeError);
  
  // Instrucciones para la verificación manual
  Logger.log("Verifica manualmente que se envió un correo electrónico de error y que el error se registró correctamente.");
}
function testLogError() {
  var fakeError = {
    message: "Mensaje de prueba",
    fileName: "ErrorHandler.gs",
    lineNumber: 42
  };
  
  // Simula el llamado a logError (no puedes capturar console.error directamente)
  logError(fakeError);
  
  // Aquí deberías verificar manualmente el log para asegurarte de que el error se registró como esperabas.
  Logger.log("Verifica manualmente que el error se registró correctamente en los logs de Apps Script.");
}
/**
 * *****************************************************************
 * Test DriverExplorer
 * *****************************************************************
 */

/**
 * Test para verificar que getSharedDrivesList() retorna una lista no vacía.
 */
function testGetSharedDrivesList() {
  var drives = getSharedDrivesList();
  if (drives.length === 0) {
    throw new Error('No se encontraron unidades compartidas.');
  }
  Logger.log('Test getSharedDrivesList() pasó correctamente.');
}

/**
 * Test para exploreDrive(driveId) utilizando el ID de tu unidad compartida de prueba.
 */
function testExploreDrive() {
  var driveId = '0AP4YpbWdwwu1Uk9PVA'; // Reemplaza esto con el ID real de tu unidad compartida de prueba
  var files = exploreDrive(driveId);
  if (files.length === 0) {
    throw new Error('exploreDrive() no retornó archivos, se esperaban algunos.');
  }
  Logger.log('Test exploreDrive() pasó correctamente.');
}

/**
 * Test para getFileLabels(fileId) y modifyFileLabels(fileId, newLabels).
 */
function testModifyAndGetFileLabels() {
  var fileId = '1J4qC_LI2O8sf-7MFmGKwzrx3sXKH85fgkReFVFQBRGI'; // Reemplaza esto con el ID real de un archivo en tu unidad compartida de prueba
  var newLabels = { testLabel: 'testValue' };
  modifyFileLabels(fileId, newLabels);
  var labels = getFileLabels(fileId);
  if (!labels.hasOwnProperty('testLabel') || labels.testLabel !== 'testValue') {
    throw new Error('Las etiquetas del archivo no se modificaron o recuperaron correctamente.');
  }
  Logger.log('Test testModifyAndGetFileLabels() pasó correctamente.');
}

/**
 * Ejecuta todos los tests.
 */
function runDriveExplorerTests() {
  try {
    testGetSharedDrivesList();
    testExploreDrive();
    //testModifyAndGetFileLabels();
    Logger.log('Todos los tests pasaron correctamente.');
  } catch (e) {
    Logger.log('Error en el test: ' + e.message);
  }
}


  
  
