// Use the same live GTF form script as old-layout.
var versionUpdate = (new Date()).getTime();
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://api2.gtftech.com/scripts/queryform.min.ssl.js?v=' + versionUpdate;
document.body.appendChild(script);

$('#preferedtime').hide();

// Prevent default navigation from the new form containers. The original helper
// owns validation, tracking, submission and the thank-you redirect.
$('.enquiry-form').on('submit', function (event) {
  event.preventDefault();
});

$('#SubmitQuery').click(function () {
  var FormInfo = {
    'SenderControlID': 'qSenderName',
    'SenderControlMobileID': 'qMobileNo',
    'SenderControlEmailID': 'qEmailID',
    'SenderControlMsgID': 'qMessage'
  };
  SubmitQueryData(AgentInfo, FormInfo);
});

$('#SubmitQuery1').click(function () {
  var FormInfo = {
    'SenderControlID': 'qSenderName1',
    'SenderControlMobileID': 'qMobileNo1',
    'SenderControlEmailID': 'qEmailID1',
    'SenderControlMsgID': 'qMessage1'
  };
  SubmitQueryData(AgentInfo, FormInfo);
});

$('#SubmitQuerypopup').click(function () {
  var FormInfo = {
    'SenderControlID': 'qSenderNamepopup',
    'SenderControlMobileID': 'qMobileNopopup',
    'SenderControlEmailID': 'qEmailIDpopup',
    'SenderControlMsgID': 'qMessagepopup'
  };
  SubmitQueryData(AgentInfo, FormInfo);
});

$('#SubmitQuerypopup1').click(function () {
  var FormInfo = {
    'SenderControlID': 'qSenderNamepopup1',
    'SenderControlMobileID': 'qMobileNopopup1',
    'SenderControlEmailID': 'qEmailIDpopup1',
    'SenderControlMsgID': 'qMessagepopup1'
  };
  SubmitQueryData(AgentInfo, FormInfo);
});
