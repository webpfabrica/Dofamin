function doPost(e) {
    var sheet = SpreadsheetApp.openById("13CJSMcJ5GdCU6YGVBv7LWm9qkO5c8RDliQ9WL--e37E").getSheetByName("Відгуки");
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([new Date(), data.name, data.rating, data.review]);
    
    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
  }
  
  function doGet(e) {
    var sheet = SpreadsheetApp.openById("13CJSMcJ5GdCU6YGVBv7LWm9qkO5c8RDliQ9WL--e37E").getSheetByName("Відгуки");
    var data = sheet.getDataRange().getValues();
    
    var reviews = data.slice(1).map(row => ({
      date: row[0],
      name: row[1],
      rating: row[2],
      review: row[3]
    }));
    
    return ContentService.createTextOutput(JSON.stringify(reviews)).setMimeType(ContentService.MimeType.JSON);
  }
  