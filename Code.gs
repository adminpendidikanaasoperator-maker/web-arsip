function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var base64Data = data.base64;
    var filename = data.filename;
    var folderName = data.folder || "SIMARSIP_AAS";
    
    // 1. Dekode base64 menjadi blob
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, "application/pdf", filename);
    
    // 2. Cari atau buat folder di My Drive
    var folder;
    var folderIter = DriveApp.getFoldersByName(folderName);
    if (folderIter.hasNext()) {
      folder = folderIter.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // 3. Simpan file
    var file = folder.createFile(blob);
    
    // 4. Atur file agar BISA DIBUKA OLEH SIAPA SAJA (Public)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      fileUrl: file.getUrl(),
      folderUrl: folder.getUrl(),
      fileId: file.getId()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi ini diperlukan agar Web App merespons permintaan "pre-flight" dari browser
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
