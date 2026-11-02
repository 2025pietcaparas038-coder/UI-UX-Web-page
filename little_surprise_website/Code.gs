/**
 * Google Apps Script response collector for the friendship quiz.
 * Deploy as a Web app: Execute as Me; access Anyone.
 * The first response creates a Google Sheet; the script emails the owner.
 */
function doPost(e) {
  try {
    var raw = e && e.parameter && e.parameter.payload;
    if (!raw) return ContentService.createTextOutput('Missing payload');
    var data = JSON.parse(raw);
    var props = PropertiesService.getScriptProperties();
    var sheetId = props.getProperty('RESPONSE_SHEET_ID');
    var ss;
    if (sheetId) {
      ss = SpreadsheetApp.openById(sheetId);
    } else {
      ss = SpreadsheetApp.create('Chudel & Bandar — Friendship Quiz Responses');
      props.setProperty('RESPONSE_SHEET_ID', ss.getId());
      var first = ss.getSheets()[0];
      first.setName('Responses');
      first.appendRow(['Submitted at', 'Question', 'Selected option', 'Option letter']);
    }
    var sheet = ss.getSheetByName('Responses') || ss.getSheets()[0];
    var submittedAt = data.submittedAt || new Date().toISOString();
    (data.answers || []).forEach(function(a) {
      sheet.appendRow([submittedAt, a.question || '', a.choice || '', a.option || '']);
    });
    var recipient = 'princekagrawal07@gmail.com';
    if (recipient) {
      var lines = (data.answers || []).map(function(a) {
        return (a.option ? a.option + '. ' : '') + (a.question || '') + '\n→ ' + (a.choice || 'No answer');
      });
      MailApp.sendEmail(recipient, 'New friendship quiz answers received 🎉',
        'Someone completed the Chudel & Bandar friendship quiz.\n\n' + lines.join('\n\n') +
        '\n\nResponses spreadsheet: ' + ss.getUrl());
    }
    return ContentService.createTextOutput('OK');
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput('Error: ' + err.message);
  }
}
