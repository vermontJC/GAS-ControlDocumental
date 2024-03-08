/**
 * Prepara el cuerpo del correo electrónico según la estructura definida.
 * @param {Object} emailData Datos a incluir en el correo electrónico.
 * @return {String} El cuerpo del correo electrónico formateado.
 */
function composeEmail(emailData) {
  // Aquí puedes personalizar la estructura del correo electrónico.
  // Por ejemplo, si emailData tiene propiedades como 'name' y 'message':
  var emailBody = `
    <h1>Hola, ${emailData.name}</h1>
    <p>${emailData.message}</p>
    <p>Saludos cordiales,</p>
    <p>Tu equipo</p>
  `;
  return emailBody;
}

/**
 * Envía un correo electrónico al destinatario especificado.
 * @param {String} recipient El destinatario del correo electrónico.
 * @param {String} subject El asunto del correo electrónico.
 * @param {String} body El cuerpo del correo electrónico, en formato HTML.
 */
function sendEmail(recipient, subject, body) {
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: body
  });
}
