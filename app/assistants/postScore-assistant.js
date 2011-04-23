var instructions, responseText, textBox, devid;
function PostScoreAssistant() {
}
PostScoreAssistant.prototype.myCallBack = function(event) {
    devid=event['com.palm.properties.nduid'];

};
PostScoreAssistant.prototype.showResponse = function(response) {
    responseText.textContent = response.responseText;
};
PostScoreAssistant.prototype.setup = function() {
    Mojo.Controller.stageController.setWindowOrientation('up');
    this.controller.enableFullScreenMode( true );
    instructions=$('instructions');
    responseText = $('responseText');
    textBox = $("username");
    dispName = $("dispName");
    this.controller.serviceRequest('palm://com.palm.preferences/systemProperties', {
        method:"Get",
        parameters:{"key": "com.palm.properties.nduid" },
        onSuccess: this.myCallBack.bind(this)
    });
    this.controller.setupWidget("username",
        this.attributes = {
            hintText: "Username",
            multiline: false,
            enterSubmits: false,
            focus: true,
            maxLength: 15
         },
         this.model = {
             value: "",
             disabled: false
         }
    ); 
    if(myApp.score.username) {
        textBox.addClassName('hidden');
        dispName.removeClassName('hidden');
        dispName.textContent = myApp.score.username + " is your stored username.  Pressing submit will submit your best score to the leadeboard";
        instructions.textContent = "";
    } else {
        dispName.addClassName('hidden');
    }
    this.handlePush.bind(this);
    Mojo.Event.listen(this.controller.get("submit"),Mojo.Event.tap, this.handlePush);
};

PostScoreAssistant.prototype.handlePush = function(event) {
    if(!myApp.score.username) {
        var response =textBox.mojo.getValue();
        if(response) {
            var name;
            //sanitize
            name = response.replace(/\s/g, "");
            name = name.replace(/<.*?>/g, "");
            name = name.replace(/[!-/]/g, "");
            name = name.replace(/[:-@]/g,"");
            name = name.replace(/[[-\140]/g,"");
            name = name.replace(/[{-~]/g,"");
            responseText.textContent = name;
            myApp.score.username = name;
            myApp.prefsCookie.put(myApp.score);
            PostScoreAssistant.prototype.AjaxRequest();
        } else if (!myApp.store.username) {
            responseText.textContent = "Please enter a username";
        }
    } else {
        PostScoreAssistant.prototype.AjaxRequest();
        dispName.textContent = myApp.score.username + " is your stored username.  Pressing submit will submit your best score to the leadeboard";
    }
};

PostScoreAssistant.prototype.AjaxRequest = function(event) {
    var score =  myApp.score.highScore;
    var name = myApp.score.username;
    var devicetype;
    if(Mojo.Environment.DeviceInfo.touchableRows < 8) {
        devicetype = 'pixi';
    } else {
        devicetype = 'pre';
    }
    new Ajax.Request("http://www.alexhaefner.com/sushi/posthandler.php", 
					{ 
					method: 'post', 
					postBody: 'name='+name+'&devid='+devid+'&score='+score+'&key=ZgRTv1oV3C'+'&devtype='+devicetype,
                    onCreate: this.showWaiting.bind(this),
                    onFailure: this.failure.bind(this),
					onComplete: this.showResponse.bind(this) 
                    });
};
PostScoreAssistant.prototype.showWaiting = function() {
    responseText.textContent = "one moment...";
};
PostScoreAssistant.prototype.failure = function() {
    responseText.textContent = "Your request failed, please try again later.  If it continues to fail, please contact me, feedback@alexhaefner.com.";
};
PostScoreAssistant.prototype.activate = function(event) {
};

PostScoreAssistant.prototype.deactivate = function(event) {
};

PostScoreAssistant.prototype.cleanup = function(event) {
    Mojo.Controller.stageController.setWindowOrientation('left');
	Mojo.Event.stopListening(this.controller.get("submit"),Mojo.Event.tap, this.handlePush);
};

