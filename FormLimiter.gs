function mainFunction() {

  var maxResponses = 20;
  var recipients = ['hello@google.com','hi@gmail.com']


  Logger.log('Creating form trigger...')

  createFormTrigger();

  Logger.log('Starting response limit check.')

  responseLimit(maxResponses, recipients);
}

function responseLimit(limitCount, recipientList) {
 
 Logger.log('Comparing responseLimit ' + limitCount)
 
var form = FormApp.getActiveForm();
var responses = form.getResponses();
 
 Logger.log('Form ' + form.getTitle() + ' has ' + responses.length + ' responses and the limit is currently ' + limitCount)
 
if(responses.length >= limitCount) {
  
  
  if(form.isAcceptingResponses()) {
    var lockMessage = 'Form ' + form.getTitle() + ' registration is now closed because the response limit of ' + limitCount + ' has been reached.'
    var lockSubject = form.getTitle() + ' response limit reached'
    
    Logger.log(lockMessage)
    
    for each(var recipient in recipientList) {
      MailApp.sendEmail(recipient, lockSubject, lockMessage)
    }
    form.setAcceptingResponses(false);
  }
  else {
    Logger.log('Form ' + form.getTitle() + ' is no longer accepting responses.  Nothing required.')
  }
}
}

function createFormTrigger() {
 
 var currentForm = FormApp.getActiveForm();
 
 var existingTrigger = ScriptApp.getUserTriggers(currentForm);
   
 if(existingTrigger.length === 0) {
   Logger.log('No triggers found on the form: ' + currentForm.getTitle() + '.  So we are creating a trigger for it...')
   
     ScriptApp.newTrigger('mainFunction')
     .forForm(currentForm)
     .onFormSubmit()
     .create(); 
 }
}
