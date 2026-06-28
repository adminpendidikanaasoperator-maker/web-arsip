function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var base64Data = data.base64;
    var filename = data.filename;
    var folderName = data.folder || "SIMARSIP_AAS";
    
    // 1. Dekode base64 menjadi blob
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, data.mimeType || "application/pdf", filename);
    
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
    
    // 4. Atur file agar BISA DIBUKA OLEH SIAPA SAJA (Public) tanpa login
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // 5. Buat shareable link format standar (tidak perlu login)
    var fileId = file.getId();
    var shareableUrl = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      fileUrl: shareableUrl,
      folderUrl: folder.getUrl(),
      fileId: fileId
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
