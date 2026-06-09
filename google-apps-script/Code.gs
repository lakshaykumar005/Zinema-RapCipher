/**
 * RAP CIPHER — registration → Google Sheet (+ WAV clip → Google Drive)
 *
 * One-time setup: see ../SHEETS_SETUP.md
 * Paste this whole file into the Apps Script editor of your Google Sheet
 * (Extensions → Apps Script), set SHARED_SECRET below, then deploy as a Web App.
 */

// Shared secret — already matches SHEETS_SHARED_SECRET in your .env.local.
// (You don't need to change it; it just stops randoms from posting to your sheet.)
var SHARED_SECRET = "4U3GElRRIlNQNmqrv_0nKtlklICabPMc";

var SHEET_NAME = "Registrations";
var CLIPS_FOLDER = "Rap Cipher Clips";

var HEADERS = [
  "Received At", "ID", "Stage Name", "Full Name", "Email", "Phone",
  "Instagram", "Area", "Lane", "Experience", "Languages", "Music Links",
  "Bio", "Heard From", "Consent", "Clip (Drive link)"
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && body.secret !== SHARED_SECRET) {
      return json({ ok: false, error: "Unauthorized" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    // Save the WAV clip to a Drive folder (best-effort).
    var clipUrl = "";
    try {
      if (body.clipBase64) {
        var folder = getFolder_(CLIPS_FOLDER);
        var bytes = Utilities.base64Decode(body.clipBase64);
        var blob = Utilities.newBlob(bytes, body.clipType || "audio/wav", body.clipName || (body.id + ".wav"));
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        clipUrl = file.getUrl();
      }
    } catch (fileErr) {
      clipUrl = "UPLOAD_FAILED: " + fileErr;
    }

    var values = [[
      body.receivedAt || new Date().toISOString(),
      body.id || "",
      body.artistName || "",
      body.fullName || "",
      body.email || "",
      body.phone || "",
      body.instagram || "",
      body.area || "",
      body.role || "",
      body.experience || "",
      body.languages || "",
      body.links || "",
      body.bio || "",
      body.heard || "",
      body.consent || "",
      clipUrl
    ]];

    // Write into the next empty row as PLAIN TEXT so values like "+91 90000..."
    // aren't mistaken for formulas (which caused #ERROR!).
    var row = sheet.getLastRow() + 1;
    var range = sheet.getRange(row, 1, 1, values[0].length);
    range.setNumberFormat("@");
    range.setValues(values);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Lets you confirm the deployment is live by visiting the Web App URL in a browser.
function doGet() {
  return json({ ok: true, service: "rap-cipher-registrations" });
}

function getFolder_(name) {
  var it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
