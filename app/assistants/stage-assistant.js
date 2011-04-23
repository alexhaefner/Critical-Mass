var ultraSCORE, tempRound, tempScore;
var myApp = {};
myApp.score = {};
myApp.score.highScore = 0;
myApp.score.tempScore = null;
myApp.score.tempRound = null;
myApp.score.username = null;
function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
    myApp.prefsCookie = new Mojo.Model.Cookie("highScore");
    var args = myApp.prefsCookie.get();
	if (args) {
		myApp.score = args;
        ultraSCORE = myApp.score.highScore;
        tempRound = myApp.score.tempScore;
        tempScore = myApp.score.tempRound;
	} else {
        ultraSCORE = 0;
        tempRound = null;
        tempScore = null;
    }
    this.controller.pushScene({name: 'main', disableSceneScroller: true});
    this.controller.setWindowOrientation('left');
    this.controller.setWindowProperties('blockScreenTimeout');
};
