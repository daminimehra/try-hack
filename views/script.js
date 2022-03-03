const QSection = document.getElementById("QSection");
const status = document.getElementById("status");
const navbuttons = document.getElementById("navbuttons");
const prevBut = document.getElementById("prev");
const nextBut = document.getElementById("next");
const email_address = document.getElementById("email_address");
const CommentName = document.getElementById("CommentName");
const CommentEmail = document.getElementById("CommentEmail");
const CommentFeel = document.getElementById("CommentFeel");
const Comment = document.getElementById("Comment");
const CommentStatus = document.getElementById("CommentStatus");
const remark = document.querySelector("#remark");

var questions = [];
var Qno = 0;
var marks = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var QuestionData = [];

function init() {
  prevBut.style.display = "none";
  nextBut.style.display = "none";
  fetch("/getQuestions")
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i < data.question.length; i++) {
        QuestionData[i] = data.question[i].name;
        var newQ =
          '<div class="question ml-sm-5 pl-sm-5 pt-2"><div class="py-2 h5"><b>' +
          data.question[i].Q +
          '</b></div><div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">';
        for (j = 0; j < data.question[i].options.length; j++) {
          newQ +=
            ' <label class="options">' +
            data.question[i].options[j] +
            ' <input type="radio" value="' +
            data.question[i].values[j] +
            '" name="' +
            data.question[i].name +
            '"> <span class="checkmark"></span> </label>';
        }
        newQ += "</div>";
        questions[i] = newQ;
      }
    });
}

function showQuestion() {
  nextBut.style.display = "inline-block";
  if (Qno == 0) {
    prevBut.style.display = "none";
  } else {
    prevBut.style.display = "inline-block";
  }
  QSection.innerHTML = questions[Qno];
}

function previous() {
  if (Qno > 0) {
    Qno--;
    showQuestion();
  }
}
function next() {
  var ele = document.getElementsByName(QuestionData[Qno]);
  var selected = false;
  var Qmark = 0;
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      selected = true;
      Qmark = ele[i].value;
    }
  }
  if (!selected) {
    status.innerHTML =
      "please select answer from the following option with best of your knowledge";
    status.style.color = "Red";
    status.style.textAlign = "center";
  }
  if (Qno < questions.length - 1 && selected) {
    marks[Qno] = parseInt(Qmark);
    Qno++;
    status.innerHTML = "";
    showQuestion();
  } else if (Qno == questions.length - 1) {
    marks[Qno] = parseInt(Qmark);
    var totalMarks = 0;
    for (i = 0; i < marks.length; i++) {
      totalMarks += marks[i];
    }

    prevBut.style.display = "none";
    nextBut.style.display = "none";

    var url = totalMarks;
    fetch(url).then((data) => {
      QSection.style.textAlign = "center";
      QSection.style.color = "#366858";
      QSection.style.fontSize = "20px";
      QSection.style.font = "Poppins";
      QSection.style.display = "grid";
      QSection.style.gridtemplatecolumns = "auto";

      var showData =
        "<h3 'style:font: bold'>Your Mental Health score was : " +
        (100 - ((totalMarks / 24) * 100).toFixed(2)) +
        "/100" +
        " " +
        "(Score needs to be as high as possible)</h3>";
      showData +=
        "</br><p style = 'background-color:#fff'; 'width:100%'; 'color:White';>If score is more than 70 : These ups & downs are normal<br>Suggestions: eat foods like Avocados, Yogurt, Chicken, Cheese, Broccoli. <br> Do Yoga Shavasana (Corpse Pose): Lie down on your back and close your eyes. Relax your body and mind. and think happy peaceful thoughts.</p>";

      showData +=
        "</br><p  style = 'background-color:#fff';>If score is more than 35 : Moderate depression.<br> Suggestions: eat foods like Spinach, Whole Grains, Milk, Brown rice, Nuts. <br> Do Yoga Sethubandhasana (Bridge Pose): Do it on regular basis, Hold this arching posture for 20-30 secs and slowly bring your body up into a standing pose</p>";
      showData +=
        "</br><p  style = 'background-color:#fff' ;  'font-weigth:30px' ; 'color: white' >If score is less than 35 : Extreme depression. <br> Suggestions: eat foods Salmon, Chicken, Dark Green leafy vegetables, Avocados, Spinach. <br> Do Yoga Balasana (Baby Pose): Do it on regular basis, be in this position for 25-30 seconds. Take few seconds of break and again repeat 3-4 times.</p>";
      showData += QSection.innerHTML = showData;
    });
  }
}

function quiz() {
  status.innerHTML = "";
  showQuestion();
}

function sendComment() {
  var url =
    "/setComment?CommentName=" +
    CommentName.value +
    "&CommentEmail=" +
    CommentEmail.value +
    "&CommentFeel=" +
    CommentFeel.value +
    "&Comment=" +
    Comment.value;
  CommentName.value = "";
  CommentEmail.value = "";
  CommentFeel.value = "";
  Comment.value = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        CommentStatus.innerHTML = " Your Response Recorded :)";
      } else {
        CommentStatus.innerHTML = "Error Occured";
      }
    });
}
