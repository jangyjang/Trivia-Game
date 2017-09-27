$("document").ready(function(){

//global var
var questionCount = 0; //index of current question
var answerCorrectly =0;
var answerIncorrectly= 0;
var unanswered = 0;
var numofSecond = 15;
var totalQuestion = gameQuestions.length;
var counter = 0;
var questionObj ={};
var questionIndex=[];
var restartButton = [];


//set up start page
$(".btn").hide();
$("#timer").hide();
$("#startgame").text("Start Game").css("border","solid", "black", "1px").css("cursor", "pointer");
$("#restart").hide();

//set up  what happens when start button is clicked
$("#startgame").on("click", function(){
	$(".btn").show();
	$("#timer").show();
	$("#startgame").hide();
	loadQuestion(questionCount);
});



//this function:
//1) loads each of the question each time it's fired
//2) question count ++
//3) displays question and choices in html
//4) setinterval for timer and clear timer when a choice isnt clicked
function loadQuestion (questionIndex){
	questionObj = gameQuestions[questionIndex];
	questionCount++;
	console.log("question no. " + questionCount)
	$("#questionNum").text("Question " + questionCount+ "/10");
	$("#restart").hide();
	$("#question").text(questionObj.question).css("border","none").css("cursor","initial")
	$("#one").text(questionObj.choice1);
	$("#two").text(questionObj.choice2);
	$("#three").text(questionObj.choice3);
	$("#four").text(questionObj.choice4);
	console.log(questionObj.question)
	console.log(questionObj.correctAns)

	//this function sets interval for timer
	function countDown(){
		counter = setInterval(secondDecrement, 1000)
	}
	countDown()

	//this function reduces number of the second shown on #timer with if statement to clear interval
	function secondDecrement (){
	numofSecond--;
	$("#timer").text("Time Remaining: " + numofSecond + " seconds");

		if ((numofSecond < 1) && (questionCount < totalQuestion)){
			unanswered++;
			console.log('unanswer ' + unanswered);
			clearInterval(counter);
			$("#question").text("Time's up! The answer is " + gameQuestions[questionIndex].correctAns + ".");
			$("#placeholder1").show().html('<img id="win" src="assets/images/catbread.gif"/>').css("text-align","center");
			$("#row5").hide();
			$("#row6").hide();
			setTimeout(loadnextQuestion, 2000);
		}

		if ((numofSecond < 1) && (questionCount === totalQuestion)) {
			unanswered++;
			console.log('unanswer ' + unanswered);
			clearInterval(counter);
			$("#question").text("Time's up! The answer is " + gameQuestions[questionIndex].correctAns + ".");
			$("#placeholder1").show().html('<img id="win" src="assets/images/catbread.gif"/>').css("text-align","center");
			$("#row5").hide();
			$("#row6").hide();
			setTimeout(summary, 2000);
		}

	}

}//end of loadQuestion

//this function 
//1) fires when on of the choices is clicked.
//2) clears the interval sets by countDown function
//3) it calculate and loads the result of user's choice against questions.js
$(".btn-primary").on("click", checkResult);
function checkResult (){
	var selectedChoice = $(this).text();
	questionIndex = questionCount -1;
	clearInterval (counter);
	console.log ("selected choice " + selectedChoice)

	//right guess and not yet last question, thus call loadnextQuestion function afterwards
	if ((gameQuestions[questionIndex].correctAns === selectedChoice) && (questionCount < totalQuestion)){
		answerCorrectly++;
		console.log("correct " + answerCorrectly);
		$("#question").text("Well done!");
		$("#placeholder1").show().html('<img id="win" src="assets/images/dog.gif"/>').css("text-align","center");
		$("#row5").hide();
		$("#row6").hide();
		setTimeout(loadnextQuestion, 2000);
	}

	//right guess and is last question, thus call summary function afterwards
	if ((gameQuestions[questionIndex].correctAns === selectedChoice) && (questionCount === totalQuestion)){
		answerCorrectly++;
		console.log("correct " + answerCorrectly);
		$("#question").text("Well done!");
		$("#placeholder1").show().html('<img id="win" src="assets/images/dog.gif"/>').css("text-align","center");
		$("#row5").hide();
		$("#row6").hide();
		setTimeout(summary, 2000);
	}

	//wrong guess and not yet last question, thus call loadnextQuestion function
	if ((gameQuestions[questionIndex].correctAns != selectedChoice) && (questionCount < totalQuestion)){
		answerIncorrectly++;
		console.log("incorrect " + answerIncorrectly);
		$("#question").text("Oh no! The answer is " + gameQuestions[questionIndex].correctAns + ".");
		$("#placeholder1").show().html('<img id="win" src="assets/images/Dr.-Who.gif"/>').css("text-align","center");
		$("#row5").hide();
		$("#row6").hide();
		setTimeout(loadnextQuestion, 2000);
	}

	//wrong guess and is last question, thus call summary function afterwards
	if ((gameQuestions[questionIndex].correctAns != selectedChoice) && (questionCount === totalQuestion)){
		answerIncorrectly++;
		console.log("incorrect " + answerIncorrectly);
		$("#question").text("Oh no! The answer is " + gameQuestions[questionIndex].correctAns + ".");
		$("#placeholder1").show().html('<img id="win" src="assets/images/Dr.-Who.gif"/>').css("text-align","center");
		$("#row5").hide();
		$("#row6").hide();
		setTimeout(summary, 2000);
	}		
}//end of checkResult

//this function fires after user's choice has been checked agaist question.js and questionCount<totalQuestion
function loadnextQuestion (){
	loadQuestion(questionCount);
	numofSecond = 15;
	$("#placeholder1").hide();
	$("#row5").show();
	$("#row6").show();
}


//this is the summary function that will be called when questionCount = totalQuestion
function summary (){
	$("#question").text("Here is your summary:").css("border-bottom","2px solid black").css("margin-top", "50px")
	$("#timer").hide();
	$("#questionNum").hide();
	$("#placeholder1").show().html("<h3>You answered " + answerCorrectly + " questions right.");
	$("#placeholder2").show().html("<h3>You answered " + answerIncorrectly + " questions wrong.");
	$("#placeholder3").show().html("<h3>You didn't answer " + unanswered + " questions");
	$("#restart").show();
}

//this is the restart function that reset some values and re-fire loadQuestions function
$("#restart").on("click",restart);
function restart(){
	$("#placeholder1").hide();
	$("#placeholder2").hide();
	$("#placeholder3").hide();
	$("#row5").show();
	$("#row6").show();
	$("#timer").show();
	$("#questionNum").show();
	questionCount = 0;
	answerCorrectly =0;
	answerIncorrectly= 0;
	unanswered = 0;
	numofSecond = 15;
	loadQuestion(questionCount);
}



});//end of document read





