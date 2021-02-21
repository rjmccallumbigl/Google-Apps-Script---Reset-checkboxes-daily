//https://www.reddit.com/r/sheets/comments/i9vrim/daily_resetting_check_boxes_over_multiple_sheets/

/**
* Create the trigger to automatically run script.
*
*/

function createTrigger() {

  // Deletes all triggers in the current project so we don't repeat trigger
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  //    Create trigger to run at midnight (UTC), if different time zone replace string with one here: http://joda-time.sourceforge.net/timezones.html
  ScriptApp.newTrigger('primaryFunction').timeBased().atHour(12).everyDays(1).inTimezone("Etc/UTC").create();
}

//******************************************************************************************************************************************************************

/**
* Run the function for each sheet.
*
*/

function primaryFunction() {

  //  Declare variables
  var spreadsheet1ID = "1LPuH8SZtz2BsUJNyCe1gPBhiESiHf8Ab1vUcAZ6j24c";  //  Modify accordingly to get your sheet's file ID
  var spreadsheet2ID = "1dUNjorIbFzWR6AG5CB7To9tS7wtB_lp294sQHO5mwhY";  //  Modify accordingly to get your sheet's file ID
  var sheet1Range = "A1";                                               //  Modify accordingly to get your checked range
  var sheet2Range = "A1:B2";                                            //  Modify accordingly to get your checked range
  var mainSheet1 = "Sheet1";                                             //  Modify accordingly to match your sheet name
  var mainSheet2 = "Sheet1";                                             //  Modify accordingly to match your sheet name

  //  Run function
  resetCheckedCells(spreadsheet1ID, sheet1Range, mainSheet1);                   
  resetCheckedCells(spreadsheet2ID, sheet2Range, mainSheet2);                
}

//******************************************************************************************************************************************************************

/**
* Reset checked cells based on the sheet passed to the function.
*
* @param {String} sheetID The Google Drive/Sheet ID of the file, derived from the URL.
* @param {String} a1Notation The range of checked cells that need to be set to false in A1 notation.
* @param {String} mainSheet The name of the main sheet on your spreadsheet(s).
*
*/

function resetCheckedCells(sheetID, a1Notation, mainSheet) {

  //  Declare variables
  var driveFile = DriveApp.getFileById(sheetID);
  var spreadsheet = SpreadsheetApp.open(driveFile);  
  var mainSheet = spreadsheet.getSheetByName(mainSheet); 
  var uncheckRange = mainSheet.getRange(a1Notation);         
  var uncheckRangeValues = uncheckRange.getDisplayValues();

  //  Set checked values to false
  for (var x = 0; x < uncheckRangeValues.length; x++){
    for (var y = 0; y < uncheckRangeValues[0].length; y++){
      uncheckRangeValues[x][y] = "False";
    }
  }

  //  Update sheet
  uncheckRange.setValues(uncheckRangeValues);

}
