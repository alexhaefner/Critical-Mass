function AboutAssistant() {
}

AboutAssistant.prototype.setup = function() {
    var goBack = $('goBack');
    var theLink = $('theLink');
	this.goBack = this.goBack.bindAsEventListener(this);
    this.popHandle = this.controller.listen(goBack, Mojo.Event.tap, this.goBack);
    this.openUrl = this.openUrl.bindAsEventListener(this);
    this.event = this.controller.listen(theLink, Mojo.Event.tap, this.openUrl);
};
AboutAssistant.prototype.goBack = function(event) {
    Mojo.Controller.stageController.popScene();
};
AboutAssistant.prototype.activate = function(event) {
};

AboutAssistant.prototype.deactivate = function(event) {
};

AboutAssistant.prototype.cleanup = function(event) {
    this.popHandle = this.controller.stopListening(goBack, Mojo.Event.tap, this.goBack);
    this.eventHandle = this.controller.stoplistening(theLink, Mojo.Event.tap, this.openUrl);
};
AboutAssistant.prototype.openUrl = function() {
    this.controller.serviceRequest("palm://com.palm.applicationManager", {
        method: "open",
        parameters:  {
            id: 'com.palm.app.browser',
            params: {
            target: "http://www.alexhaefner.com"
            }
        }
    });
 };