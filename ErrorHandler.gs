/**
 * Registra errores que ocurran durante la ejecución.
 * @param {Error} error El objeto de error capturado.
 */
function logError(error) {
  // Registra el error en la consola de Logs de Google Apps Script
  console.error('Error: ' + error.message + ' (Archivo: ' + error.fileName + ', Línea: ' + error.lineNumber + ')');
  
  // Opcional: Añade aquí cualquier otra acción de registro, como escribir en una hoja de cálculo de Google
}

/**
 * Define cómo se manejan los errores.
 * @param {Error} error El objeto de error capturado.
 */
function handleError(error) {
  // Registra el error usando la función definida anteriormente
  logError(error);
  
  // Ejemplo de cómo enviar un correo electrónico de alerta al administrador del sistema o desarrollador
  var recipient = 'josecarlos.navarro@vermont-solutions.com'; // Reemplaza esto con tu dirección de correo electrónico real
  var subject = 'Error en el Script de Google Apps Script';
  var body = 'Se ha producido un error en tu script de Google Apps Script: ' + error.message + 
             ' (Archivo: ' + error.fileName + ', Línea: ' + error.lineNumber + ')';
  
  MailApp.sendEmail(recipient, subject, body);
  
  // Opcional: Implementa aquí cualquier otra lógica de manejo de errores que necesites
}
