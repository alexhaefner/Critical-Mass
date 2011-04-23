/*Copyright (c) 2010 Alex Haefner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


/* ??? UNDERSTAND THE GAME ??? 
This game has rounds.  Every round n circles are generated according to the gameParameters object.

These circles are animated ff times per second depending on the interval (if the round > 10, fps = 20, otherwise fps = 25);

This happens during EVERY FRAME: 
:Every frame, after animation, those circles that are "exploded" and not 
:destroyed, are added to an object (activeStore).

:Then, the not exploded circles check their position against the exploded 
:ones (stored in activeStore), and if they have collided, the circles 
:becomes exploded (calcCollision).

:The game calculates to see if no more explosions are occuring 
:(frameManager).

*/


var interval = 40;
var circleTouch;
var ctx;
var c = new Array();
var i = -1;
var n, noFrames;
var roundManager;
var started = 0;
var round = 1;
var mm = 0;
var canvasWidth;
var overlay, play, info, title, subtitle, roundStart, frameManager, score, tempScore, startButton, scoreManager, scoreDiv, overlay, roundScoreDiv, highScore, hichScore, ballCount, roundResume, flurry, postscore, howtoplay, scores; // rectangleOverlay;
var ll = 0;
var render;
var activeStore = {"store": [
    {}
    ]
};
var ballscoreno = 0;
var p = MainAssistant.prototype;
var oldScore, highScoreManager;
var mainMenu,newGame,leaderboard,postHighScore;

var gameParameters = {"round": [
        {"radius": 9, "newRadius": 35, "ballTotal": 5, "noNeeded": 1},
        {"radius": 9, "newRadius": 33, "ballTotal": 5, "noNeeded": 2},
        {"radius": 9, "newRadius": 33, "ballTotal": 7, "noNeeded": 2},
        {"radius": 8, "newRadius": 30, "ballTotal": 10, "noNeeded": 3},
        {"radius": 8, "newRadius": 30, "ballTotal": 12, "noNeeded": 5},
        {"radius": 8, "newRadius": 30, "ballTotal": 15, "noNeeded": 6},
        {"radius": 8, "newRadius": 30, "ballTotal": 18, "noNeeded": 8},
        {"radius": 7, "newRadius": 29, "ballTotal": 20, "noNeeded": 9},
        {"radius": 7, "newRadius": 29, "ballTotal": 22, "noNeeded": 11},
        {"radius": 6, "newRadius": 27, "ballTotal": 24, "noNeeded": 12},
        {"radius": 6, "newRadius": 25, "ballTotal": 27, "noNeeded": 14},
        {"radius": 6, "newRadius": 25, "ballTotal": 30, "noNeeded": 16},
        {"radius": 6, "newRadius": 25, "ballTotal": 35, "noNeeded": 18},
        {"radius": 6, "newRadius": 25, "ballTotal": 40, "noNeeded": 30},
        {"radius": 6, "newRadius": 25, "ballTotal": 45, "noNeeded": 35},
        {"radius": 6, "newRadius": 25, "ballTotal": 48, "noNeeded": 37},
        {"radius": 5, "newRadius": 25, "ballTotal": 50, "noNeeded": 39},
        {"radius": 5, "newRadius": 25, "ballTotal": 55, "noNeeded": 45},
        {"radius": 5, "newRadius": 20, "ballTotal": 60, "noNeeded": 53},
        {"radius": 5, "newRadius": 20, "ballTotal": 60, "noNeeded": 56}
        ]
};
var scoring = {"ballNum": [
        {"ballScore": 100},
        {"ballScore": 200},
        {"ballScore": 400},
        {"ballScore": 800},
        {"ballScore": 1600},
        {"ballScore": 2400},
        {"ballScore": 3200},
        {"ballScore": 4800},
        {"ballScore": 6400},
        {"ballScore": 9600},
        {"ballScore": 12800},
        {"ballScore": 25600},
        {"ballScore": 51200},
        {"ballScore": 124000}
        ]
};

function MainAssistant() {
}
MainAssistant.prototype.scores = function() {
    this.score = [];
    this.registered = [];
    this.score[0] = $('score1');
    this.score[1] = $('score2');
    this.score[2] = $('score3');
    this.score[3] = $('score4');
    this.score[4] = $('score5');
    this.score[5] = $('score6');
    this.score[6] = $('score7');
    this.score[7] = $('score8');
    this.score[8] = $('score9');
    this.score[9] = $('score10');
    this.score[10] = $('score11');
    this.score[11] = $('score12');
    this.score[12] = $('score13');
    this.score[13] = $('score14');
    this.score[14] = $('score15');
    this.score[15] = $('score16');
    this.score[16] = $('score17');
    this.score[17] = $('score18');
    this.score[18] = $('score19');
    this.score[19] = $('score20');
    this.score[20] = $('score21');
    this.score[21] = $('score22');
    this.score[22] = $('score23');
    this.score[23] = $('score24');
    this.score[24] = $('score25');
    this.score[25] = $('score26');
    this.score[26] = $('score27');
    this.score[27] = $('score28');
    this.score[28] = $('score29');
    this.score[29] = $('score30');
    this.registered[0] = 0;
    this.registered[1] = 0;
    this.registered[2] = 0;
    this.registered[3] = 0;
    this.registered[4] = 0;
    this.registered[5] = 0;
    this.registered[6] = 0;
    this.registered[7] = 0;
    this.registered[8] = 0;
    this.registered[9] = 0;
    this.registered[10] = 0;
    this.registered[11] = 0;
    this.registered[12] = 0;
    this.registered[13] = 0;
    this.registered[14] = 0;
    this.registered[15] = 0;
    this.registered[16] = 0;
    this.registered[17] = 0;
    this.registered[18] = 0;
    this.registered[19] = 0;
    this.registered[20] = 0;
    this.registered[21] = 0;
    this.registered[22] = 0;
    this.registered[23] = 0;
    this.registered[24] = 0;
    this.registered[25] = 0;
    this.registered[26] = 0;
    this.registered[27] = 0;
    this.registered[28] = 0;
    this.registered[29] = 0;
    this.pushScore = function(x,y,collisionorder) {
        this.score[ballscoreno].style.top = y + "px";
        this.score[ballscoreno].style.left = x + "px";
        this.registered[ballscoreno]++;
        if(collisionorder <= 13) {
            this.score[ballscoreno].textContent = "+"+ scoring.ballNum[collisionorder].ballScore;
        } else {
            this.score[ballscoreno].textContent = "+248000";
        }
        ballscoreno >= 29 ? ballscoreno = 0 : ballscoreno++;
    };
    this.update = function(stuff) {
        if(this.registered[stuff] <= 1) {
            this.score[stuff].style.top = -100 + "px";
            this.score[stuff].style.left = 0 + "px";
            //this.assigned[stuff] = false;
        }
        this.registered[stuff]--;
    };
};
MainAssistant.prototype.roundManager = function() {
    /* manages the round active status (which controls when the application .stopTimer, .startTimer event proceeds), manages restarting the round if the user loses the round, and manages the score */ 
    this.roundActive = 0;
    this.cExploded = 0;
    this.roundActive = 0;
    this.update = function() { 
        if(this.cExploded < gameParameters.round[mm].noNeeded && mm == 19) {
            showRoundFail(this.cExploded);
            scoreManager.tempScore = 0;
            i = -1;
        } else if(mm < 19 && this.cExploded < gameParameters.round[mm].noNeeded) {
            showRoundFail(this.cExploded);
            scoreManager.tempScore = 0;
            i = -1;
        } else if(this.cExploded >= gameParameters.round[mm].noNeeded && mm == 19) {
            mm = 0;
            i = -1;
            highScore = scoreManager.score + scoreManager.tempScore;
            scoreManager.tempScore = 0;
            showCongratulations();
        } else {
            mm = mm + 1;
            i = -1;
            scoreManager.score = scoreManager.score + scoreManager.tempScore;
            scoreManager.tempScore = 0;
            showRoundSplash();
        }
    };
};
MainAssistant.prototype.scoreManager = function(collisionOrder) {
    /* tiny score object, mostly used for UI generation of score */
    this.score = 0;
    this.tempScore = 0;
    this.updateTempScore = function(collisionOrder) {
        if(collisionOrder <= 13) {
            this.tempScore = this.tempScore + scoring.ballNum[collisionOrder].ballScore;
        } else {
            this.tempScore = this.tempScore + 248000;
        }
    };
    this.updateScore = function() {
        this.score = this.score + this.tempScore;
        this.tempScore = 0;
    };
    this.redrawTempScore = function() {
        scoreDiv.textContent = scoreManager.tempScore;
    };
    this.drawGameScore = function() {
        gameScore.textContent = 'score: ' + scoreManager.score;
    };
    this.hideTempScore = function() {
        scoreDiv.textContent = "";
    };
    this.hideGameScore = function() {
        gameScore.textContent = "";
    };
    this.drawBallCount = function() {
        ballCount.textContent = "balls: " + roundManager.cExploded;
    };
    this.hideBallCount = function() {
        ballCount.textContent = "";
    };

};
MainAssistant.prototype.circle = function(x,y,rad,vx,vy, string) {
    /* circle obj generates every circle that is displayed to the user, including circletouch.  It has an animate() method that controls the radius, and velocity if the ball has collided */
    this.scoreLink = null;
    this.xPos = x;
    this.yPos = y;
    this.xVel = vx;
    this.yVel = vy;
    this.radius = rad;
    this.frames = 0;
    this.fade = 0;
    this.stopAnimate = 0;
    this.i = i + 1;
    this.collisionOrder = 0;
    this.color = 'rgba('+string+')';
    i = i + 1;
    this.newRadius = this.radius;
    this.animate = function() {
        if(this.stopAnimate == 0) {
            this.radius < this.newRadius ? this.radius = this.radius + ((gameParameters.round[mm].newRadius/10) * (25 / noFrames)) : 0;
            this.radius > this.newRadius ? this.radius = this.radius - ((gameParameters.round[mm].newRadius/10) * (25 / noFrames)) : 0;
            this.radius < 0 ? this.radius = 0 : 0;
            if(this.fade == 1 && noFrames == 25) {
                this.frames = this.frames + 1;
                this.velZero();
                if(this.frames > 70) {
                    this.stopAnimate = 1;
                    this.fade = 0;
                }
                if(this.frames == 60) {
                    this.newRadius = 0;
                    var crap = this.scoreLink;
                    scores.update(crap);
                }
            }
            if(this.fade == 1 && noFrames == 20) {
                this.frames = this.frames + 1.25;
                this.velZero();
                if(this.frames > 70) {
                    this.stopAnimate = 1;
                    this.fade = 0;
                }
                if(this.frames == 60) {
                    this.newRadius = 0;
                    var crap = this.scoreLink;
                    scores.update(crap);
                    console.log(this.i +" and "+ this.scoreLink );
                }
            }
        
            this.xPos = this.xPos + ((this.xVel/(noFrames)));
            this.yPos = this.yPos + ((this.yVel/(noFrames)));
            /* if the ball goes out of bounds, place it in bounds and reverse the velocity */
            if(this.xPos > (canvasWidth - this.radius) || this.xPos <= this.radius) {
                this.xVel = -1 * this.xVel;
                this.xPos <= this.radius ? this.xPos = this.radius : 0;
                this.xPos >= (canvasWidth - this.radius) ? this.xPos = (canvasWidth - this.radius) : 0;
            }
            if(this.yPos > (320 - this.radius) || this.yPos <= this.radius) {
                this.yVel = -1 * this.yVel;
                this.yPos <= this.radius ? this.yPos = this.radius : 0;
                this.yPos >= (320 - this.radius) ? this.yPos = 320 - this.radius : 0;  
            }
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.xPos,this.yPos,this.radius,0,(Math.PI*2),true);
            ctx.fill();
        }
    };
    this.velZero = function () {
        this.xVel = 0;
        this.yVel = 0;
    };
    this.updateLink = function() {
        this.scoreLink = ballscoreno;
    };
};
MainAssistant.prototype.maincircle = function(x,y,rad,vx,vy, string) {
    /* circle obj generates every circle that is displayed to the user, including circletouch.  It has an animate() method that controls the radius, and velocity if the ball has collided */
    this.scoreLink = null;
    this.xPos = x;
    this.yPos = y;
    this.xVel = vx;
    this.yVel = vy;
    this.radius = rad;
    this.frames = 0;
    this.fade = 0;
    this.stopAnimate = 0;
    this.i = i + 1;
    this.collisionOrder = 0;
    this.color = 'rgba('+string+')';
    i = i + 1;
    this.newRadius = this.radius;
    this.animate = function() {
        if(this.stopAnimate == 0) {
            this.radius < this.newRadius ? this.radius = this.radius + ((gameParameters.round[mm].newRadius/10) * (25 / noFrames)) : 0;
            this.radius > this.newRadius ? this.radius = this.radius - ((gameParameters.round[mm].newRadius/10) * (25 / noFrames)) : 0;
            this.radius < 0 ? this.radius = 0 : 0;
            if(this.fade == 1 && noFrames == 25) {
                this.frames = this.frames + 1;
                this.velZero();
                if(this.frames > 70) {
                    this.stopAnimate = 1;
                    this.fade = 0;
                }
                if(this.frames == 60) {
                    this.newRadius = 0;
                }
            }
            if(this.fade == 1 && noFrames == 20) {
            this.frames = this.frames + 1.25;
            this.velZero();
                if(this.frames > 70) {
                    this.stopAnimate = 1;
                    this.fade = 0;
                }
                if(this.frames == 60) {
                    this.newRadius = 0;
                }
            }
            this.xPos = this.xPos + ((this.xVel/(noFrames)));
            this.yPos = this.yPos + ((this.yVel/(noFrames)));
            /* if the ball goes out of bounds, place it in bounds and reverse the velocity */
            if(this.xPos > (canvasWidth - this.radius) || this.xPos <= this.radius) {
                this.xVel = -1 * this.xVel;
                this.xPos <= this.radius ? this.xPos = this.radius : 0;
                this.xPos >= (canvasWidth - this.radius) ? this.xPos = (canvasWidth - this.radius) : 0;
            }
            if(this.yPos > (320 - this.radius) || this.yPos <= this.radius) {
                this.yVel = -1 * this.yVel;
                this.yPos <= this.radius ? this.yPos = this.radius : 0;
                this.yPos >= (320 - this.radius) ? this.yPos = 320 - this.radius : 0;  
            }
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.xPos,this.yPos,this.radius,0,(Math.PI*2),true);
            ctx.fill();
        }
    };
    this.velZero = function () {
        this.xVel = 0;
        this.yVel = 0;
    };
};
MainAssistant.prototype.handleTap = function(event) {
    tapX = event.down.x;
    tapY = event.down.y;
    circleTouch.xPos = tapX;
    circleTouch.yPos = tapY;
    circleTouch.newRadius = gameParameters.round[mm].newRadius;
    circleTouch.fade = 1;
    roundManager.roundActive = 1;
    overlay.addClassName('hideOverlay');
    overlay.removeClassName('showOverlay');
    if(mm == 0) {
        howtoplay.removeClassName("htpvisible");
        howtoplay.addClassName("htphidden");
    }
};
/* calculate collisions between balls */
calcCollision = function (theCircle, ballnum) {
    var x1 = theCircle.xPos;
    var y1 = theCircle.yPos;
    var x2, y2, difx, dify, difRad;
    var distance;
    /* specifically calculate collisions with circleTouch, the circle generated when the user taps the screen */
    if(circleTouch.fade == 1) {
        x2 = circleTouch.xPos;
        y2 = circleTouch.yPos;
        difx = x2 - x1;
        dify = y2 - y1;
        distance = ((difx)*(difx))+((dify)*(dify));
        difRad = (circleTouch.radius + theCircle.radius) * (circleTouch.radius + theCircle.radius);
        if(distance <= difRad) {
            theCircle.newRadius = gameParameters.round[mm].newRadius;
            theCircle.fade = 1;
            theCircle.collisionOrder = 0;
            roundManager.cExploded = roundManager.cExploded + 1;
            scoreManager.updateTempScore(theCircle.collisionOrder);
            scoreManager.redrawTempScore();
            scoreManager.drawBallCount();
            c[ballnum].updateLink();
            scores.pushScore(theCircle.xPos - 100,theCircle.yPos - 6, theCircle.collisionOrder);
            return;
        }
    }
    /* calculate collisions by looping through unexploded balls and determining if the distance from this circle to one of the exploded circles is less than the radius' of the circle added together;
    This uses an object that stores all the exploded balls, to limit computation*/
    for(s=0; s <= ll; s++) {
        x2 = activeStore.store[s].xPos;
        y2 = activeStore.store[s].yPos;
        difx = x2 - x1;
        dify = y2 - y1;
        distance = ((difx)*(difx))+((dify)*(dify));
        difRad = (activeStore.store[s].radius + theCircle.radius) * (activeStore.store[s].radius + theCircle.radius);
        if(distance <= difRad) {
            theCircle.newRadius = gameParameters.round[mm].newRadius;
            theCircle.fade = 1;
            theCircle.collisionOrder = activeStore.store[s].collisionOrder + 1;
            roundManager.cExploded = roundManager.cExploded + 1;
            scoreManager.updateTempScore(theCircle.collisionOrder);
            scoreManager.redrawTempScore();
            scoreManager.drawBallCount();
            c[ballnum].updateLink();
            scores.pushScore(theCircle.xPos - 100,theCircle.yPos - 6, theCircle.collisionOrder);
            return;
        }
    }
};
/* the purpose of this function is to determine when the round is over by counting the number of frames and observing when the number of frames stops changing */
MainAssistant.prototype.calcFrames = function() {
    this.oldDifference = 0;
    this.difference = 0;
    this.oldframes = 0;
    this.frames = 0;
    this.update = function() {
        this.oldDifference = this.difference;
        this.oldframes = this.frames;
        for(n=0; n < gameParameters.round[mm].ballTotal; n++) {
            this.frames = this.frames + c[n].frames;
        }
        this.frames = this.frames + circleTouch.frames;
        this.difference = this.frames - this.oldframes;
        if(this.difference == this.oldDifference && this.frames != 0) {
            render.stopAnimate();
            ctx.clearRect (0, 0, 480, 320);
            this.frames = 0;
            this.difference = 0;
            this.oldDifference = 0;
            roundManager.update();
        }
    };
};
/* This is the canvas stack, controlling animation, calculation of collisions, and updates frameManager to see when the round has ended */
MainAssistant.prototype.canvas = function() {
    this.addBalls = function() {
    for(n=0; n < gameParameters.round[mm].ballTotal; n++) {
        c[n] = new MainAssistant.prototype.circle(randPosX(),randPosY(),gameParameters.round[mm].radius,randVel(),randVel(),randColorString());
    }
    circleTouch = new MainAssistant.prototype.maincircle(-1,-1,0,0,0,'0,255,255,0.6');
    //rectangleOverlay.opacity = 0;
    };
    this.update = function () {
        activeStore = {"store": [
                {}
            ]
        };
        /* balls that have been "exploded" are stored in activeStore, which is created on every execution of .update(); */

        ctx.clearRect (0, 0, 480, 320);
        for(n=0; n < gameParameters.round[mm].ballTotal; n++) {
            if(c[n].stopAnimate != 1) {
                c[n].animate();
                if(c[n].fade == 1) {
                    activeStore.store.push({"radius": c[n].radius, "xPos": c[n].xPos, "yPos": c[n].yPos, "collisionOrder": c[n].collisionOrder});
                    ll = ll + 1;
                }
            }
        }
        /*Animate the circleTouch, the one that appears when the user taps the screen */
        circleTouch.animate();
        if(circleTouch.fade == 1 || circleTouch.stopAnimate == 1) {
            for(n=0; n < gameParameters.round[mm].ballTotal; n++) {
                if(c[n].stopAnimate != 1 && c[n].fade == 0) {
                    calcCollision(c[n], n);
                }
            }
        }
        ll = 0;
        frameManager.update();
        //rectangleOverlay.update();
    };
    /* start and stop the animation update */
    this.animate = function() {
        this.timer = setInterval(this.update.bind(this),interval);
    };
    this.stopAnimate = function() {
        clearInterval(this.timer);
    };   
};
MainAssistant.prototype.playFlurry = function() {
        this.play = setInterval('p.playFlurryRep();', 8000);
    };
MainAssistant.prototype.stopFlurry = function() {
        clearTimer(this.play);
    };
MainAssistant.prototype.handleRoundStart = function() {
    if(myApp.score.tempRound) {
        roundResume.removeClassName('showRoundResume');
        roundResume.addClassName('hideRoundResume');
    }
    showRoundSplash();
    /* this clears the start round screen, and rendering a round */
    roundManager.roundActive = 1;
    title.addClassName('hideTitle');
    title.removeClassName('showTitle');
    subtitle.addClassName('hideSubTitle');
    subtitle.removeClassName('showSubTitle');
    /*this little fix is meant to improve performance, by rendering fewer frames during higher levels */
    if(mm < 10) {
        interval = 40;
        noFrames = 1000 / interval;
    } else {
        interval = 50;
        noFrames = 1000 / interval;
    }
    if(mm == 0) {
        howtoplay.removeClassName("htphidden");
        howtoplay.addClassName("htpvisible");
    }
    render.animate();
    roundStart.addClassName('hideRoundStart');
    roundStart.removeClassName('showRoundStart');
    roundManager.cExploded = 0;
    scoreManager.redrawTempScore();
    scoreManager.hideGameScore();
    overlay.addClassName('showOverlay');
    overlay.removeClassName('hideOverlay');
};
showCongratulations = function() {
    /* the congrats screen at the conclusion of a successful round 20 */
    roundManager.roundActive = 0;
    overlay.addClassName('hideOverlay');
    overlay.removeClassName('showOverlay');
    title.addClassName('showTitle');
    title.removeClassName('hideTitle');
    subtitle.addClassName('showSubTitle');
    subtitle.removeClassName('hideSubTitle');
    play.addClassName('hidePlay');
    /* just some high score management */
    subtitle.style.top = "100px";
    if(highScore > ultraSCORE) {
        title.textContent = "High Score!";
        postHighScore.addClassName('showPostHighScore');
        subtitle.textContent = "score: " + highScore;
        myApp.score.highScore = highScore;
        myApp.score.tempScore = null;
        myApp.score.tempRound = null;
        myApp.prefsCookie.put(myApp.score);
        ultraSCORE = highScore;
        highScore = 0;
    } else {
        leaderboard.addClassName('showLeaderBoard');
        title.textContent = "Nice Job!";
        subtitle.textContent = "score: " + highScore;
        highScore = 0;
        myApp.score.tempScore = null;
        myApp.score.tempRound = null;
    }
    if(mm == 0) {
        scoreManager.score = 0;     
    } 
    mainMenu.addClassName('showCongratsMenu');
    mainMenu.removeClassName('hideCongratsMenu');
    newGame.addClassName('showCongratsMenu');
    newGame.removeClassName('hideCongratsMenu');
    info.addClassName('hideInfo'); 
    info.removeClassName('showInfo');  
    scoreManager.hideTempScore();
    interval = 40;
    noFrames = 1000 / interval;
    scoreManager.hideBallCount();
    render = new this.canvas();
    render.addBalls();

};
showRoundFail = function(sucks) {
    /* this executes whenever a user loses a round */ 
    roundManager.roundActive = 0;
    overlay.addClassName('hideOverlay');
    overlay.removeClassName('showOverlay');
    title.addClassName('showTitle');
    title.removeClassName('hideTitle');
    subtitle.addClassName('showSubTitle');
    subtitle.removeClassName('hideSubTitle');
    play.addClassName('hidePlay');
    title.textContent = "Try Again";
    subtitle.textContent = "you got " + sucks + " balls, and needed " + gameParameters.round[mm].noNeeded + " of " + gameParameters.round[mm].ballTotal;
    info.addClassName('hideInfo');
    roundStart.removeClassName('hideRoundStart');
    roundStart.addClassName('showRoundStart');
    scoreManager.hideTempScore();
    scoreManager.drawGameScore();
    scoreManager.hideBallCount();
    render.addBalls();
};
showRoundSplash = function() {
    /* Round splash screen displayed at the start of every round */
    startButton.textContent = "start";
    roundManager.roundActive = 0;
    overlay.addClassName('hideOverlay');
    overlay.removeClassName('showOverlay');
    subtitle.addClassName('showSubTitle');
    subtitle.removeClassName('hideSubTitle');
    title.addClassName('showTitle');
    title.removeClassName('hideTitle');
    play.addClassName('hidePlay');
    play.removeClassName('showPlay');
    postscore.addClassName('hidepostscore');
    postscore.removeClassName('showpostscore');
    info.addClassName('hideInfo');
    info.removeClassName('showInfo');
    title.textContent = "Round "+(mm+1);
    subtitle.textContent = "Get " + gameParameters.round[mm].noNeeded + " of " + gameParameters.round[mm].ballTotal + " balls";
    roundStart.removeClassName('hideRoundStart');
    roundStart.addClassName('showRoundStart');
    scoreManager.hideTempScore();
    if(mm !=0) {
        scoreManager.drawGameScore();
    }
    hichScore.addClassName('hideHichScore');
    scoreManager.hideBallCount();
    render.addBalls();
    myApp.score.highScore = ultraSCORE;
    myApp.score.tempScore = scoreManager.score;
    myApp.score.tempRound = mm;
    myApp.prefsCookie.put(myApp.score);
};
showGameIntro = function() {
    /* Round splash screen displayed at the start of every round */
    roundManager.roundActive = 0;
    overlay.addClassName('hideOverlay');
    overlay.removeClassName('showOverlay');
    title.addClassName('showTitle');
    title.removeClassName('hideTitle');
    play.addClassName('hidePlay');
    play.removeClassName('showPlay');
    postscore.addClassName('hidepostscore');
    postscore.removeClassName('showpostscore');
    info.addClassName('hideInfo');
    info.removeClassName('showInfo');
    hichScore.addClassName('hideHichScore');
    roundStart.removeClassName('hideRoundStart');
    roundStart.addClassName('showRoundStart');
    startButton.textContent = "start new game";
};
MainAssistant.prototype.handlePlay = function() {
    if(myApp.score.tempRound) {
        roundResume.addClassName("showRoundResume");
        showGameIntro();
    } else {
        showRoundSplash();
    }
};
MainAssistant.prototype.infoTap = function() {
    Mojo.Controller.stageController.pushScene({name: 'about', disableSceneScroller: true});
};
MainAssistant.prototype.handleShowScores = function() {
    Mojo.Controller.stageController.pushScene({name: 'postScore', disableSceneScroller: true});
};
MainAssistant.prototype.roundResumeEvent = function() {
    mm = myApp.score.tempRound;
    scoreManager.score = myApp.score.tempScore;
    roundResume.removeClassName('showRoundResume');
    roundResume.addClassName('hideRoundResume');
    howtoplay.removeClassName("htpvisible");
    howtoplay.addClassName("htphidden");
    showRoundSplash();
};
MainAssistant.prototype.setup = function() {
    Mojo.Controller.stageController.setWindowOrientation('left');
    Mojo.Controller.stageController.setWindowProperties('blockScreenTimeout');
    ctx = this.controller.get('canvas').getContext('2d');
    title = $('title');
    info = $('info');
    play = $('play');
    subtitle = $('subtitle');
    scoreDiv = $('roundScore');
    startButton = $('roundStart');
    gameScore = $('gameScore');
    overlay = $('overlay');
    hichScore = $('hichScore');
    ballCount = $('ballCount');
    roundResume = $('roundResume');
    postscore = $('postscore');
    howtoplay = $('howtoplay');
    mainMenu = $('mainMenu');
    newGame = $('newGame');
    leaderboard = $('leaderboard');
    postHighScore = $('postHighScore');
    hichScore.textContent = 'high score: '+ ultraSCORE;
    /* palm pixi/pre changes */
    if(Mojo.Environment.DeviceInfo.touchableRows < 8) {
         title.addClassName("Palmpixi");
         subtitle.addClassName("Palmpixi");
         scoreDiv.addClassName("Palmpixi");
         gameScore.addClassName("Palmpixi");
         overlay.addClassName("Palmpixi");
         startButton.addClassName("startpixi");
        hichScore.addClassName("Palmpixi");
         roundResume.addClassName("startpixi");
         leaderboard.addClassName("startpixi");
         postHighScore.addClassName("startpixi");
         howtoplay.addClassName("startpixi");
         newGame.style.left = "200px";
         mainMenu.style.left = "50px";
         postscore.addClassName("postscorepixi");
         play.addClassName("playpixi");
         info.addClassName("infopixi");
        canvasWidth = 400;
    } else {
        title.addClassName("Palmpre");
        subtitle.addClassName("Palmpre");
        scoreDiv.addClassName("Palmpre");
        gameScore.addClassName("Palmpre");
        overlay.addClassName("Palmpre");
        startButton.addClassName("startpre");
        hichScore.addClassName("Palmpre");
        leaderboard.addClassName("startpre");
        roundResume.addClassName("startpre");
        postHighScore.addClassName("startpre");
        howtoplay.addClassName("startpre");
        newGame.style.left = "240px";
        mainMenu.style.left = "90px";
        postscore.addClassName("postscorepre");
        play.addClassName("playpre");
        info.addClassName("infopre");
        canvasWidth = 480;
    }
    render = new this.canvas();
    roundManager = new MainAssistant.prototype.roundManager();
    frameManager = new MainAssistant.prototype.calcFrames();
    frameManager.difference = 0;
    frameManager.frames = 0;
    frameManager.oldDifference = 0;
    frameManager.oldframes = 0;
    overlay = this.controller.get('overlay');
    overlay.addClassName('hideOverlay');
    roundStart = this.controller.get('roundStart');
    roundStart.addClassName('hideRoundStart');
    scoreManager = new this.scoreManager();
    scores = new this.scores();
    this.controller.enableFullScreenMode( true );
    if(myApp.score.username) {
        this.controller.serviceRequest('palm://com.palm.preferences/systemProperties', {
            method:"Get",
            parameters:{"key": "com.palm.properties.nduid" },
            onSuccess: this.myCallBack.bind(this)
        });
    }
    this.handleTap = this.handleTap.bindAsEventListener(this);
    this.tapevent1 = this.controller.listen(overlay, Mojo.Event.tap, this.handleTap);
    this.handleShowScores = this.handleShowScores.bindAsEventListener(this);
    this.showScoresEvent = this.controller.listen(postscore, Mojo.Event.tap, this.handleShowScores);
    this.handlePlay = this.handlePlay.bindAsEventListener(this);
    this.tapevent2 = this.controller.listen(play, Mojo.Event.tap, this.handlePlay);
    this.handleRoundStart = this.handleRoundStart.bindAsEventListener(this);
    this.tapEvent3 = this.controller.listen(roundStart, Mojo.Event.tap, this.handleRoundStart);
    this.infoTap = this.infoTap.bindAsEventListener(this);
    this.handleInfo = this.controller.listen(info, Mojo.Event.tap, this.infoTap);
    this.stopTimer = this.stopTimer.bindAsEventListener(this);
    this.stopTimerEvent = this.controller.listen(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.stopTimer);
    this.startTimer = this.startTimer.bindAsEventListener(this);
    this.startTimerEvent = this.controller.listen(this.controller.stageController.document, Mojo.Event.stageActivate, this.startTimer);
    this.roundResumeEvent = this.roundResumeEvent.bindAsEventListener(this);
    this.roundResumeEventHandle = this.controller.listen(roundResume, Mojo.Event.tap, this.roundResumeEvent);
    this.mainMenuTap = this.mainMenuTap.bindAsEventListener(this);
    this.mmtap = this.controller.listen(mainMenu, Mojo.Event.tap, this.mainMenuTap);
    this.leaderboardTap = this.leaderboardTap.bindAsEventListener(this);
    this.ldt = this.controller.listen(leaderboard, Mojo.Event.tap, this.leaderboardTap);
    this.newGameTap = this.newGameTap.bindAsEventListener(this);
    this.newGameTapEvent = this.controller.listen(newGame, Mojo.Event.tap, this.newGameTap);
    this.postScoreTap = this.postScoreTap.bindAsEventListener(this);
    this.pst = this.controller.listen(postHighScore, Mojo.Event.tap, this.postScoreTap);
};
MainAssistant.prototype.myCallBack = function(event) {
    var devid=event['com.palm.properties.nduid'];
    new Ajax.Request("http://m.scoreboard.alexhaefner.com/g.php", 
					{ 
                        method: 'post', 
                        postBody: '&devid='+devid,
                        onComplete: this.showResponse.bind(this),
                        onFailure: this.failResponse.bind(this)
                    });

};
MainAssistant.prototype.showResponse = function(response) {
    var text = hichScore.textContent;
    hichScore.textContent = text + " " +response.responseText;
};
MainAssistant.prototype.failResponse = function(response) {
    highScore.textContent = response.responseText;
};
MainAssistant.prototype.postScoreTap = function(event) {
    play.removeClassName('hidePlay');
    play.addClassName('showPlay');
    subtitle.style.top = "150px";
    title.textContent = "Critical Mass";
    postHighScore.addClassName('hidePostHighScore');
    postHighScore.removeClassName('showPostHighScore');
    subtitle.textContent = "";
    leaderboard.addClassName('hideLeaderBoard');
    leaderboard.removeClassName('showLeaderBoard');
    mainMenu.addClassName('hideCongratsMenu');
    mainMenu.removeClassName('showCongratsMenu');
    newGame.addClassName('hideCongratsMenu');
    newGame.removeClassName('showCongratsMenu');
    info.addClassName('showInfo');  
    info.removeClassName('hideInfo');
    postscore.addClassName("showpostscore");
    postscore.removeClassName("hidepostscore");
    Mojo.Controller.stageController.pushScene({name: 'postScore', disableSceneScroller: true});
};
MainAssistant.prototype.leaderboardTap = function(event) {
    this.controller.serviceRequest("palm://com.palm.applicationManager", {
        method: "open",
        parameters:  {
        id: 'com.palm.app.browser',
        params: {
            target: "http://m.scoreboard.alexhaefner.com"
            }
        }
    });
}; 
MainAssistant.prototype.newGameTap = function(event) {
    subtitle.style.top = "150px";
    postHighScore.addClassName('hidePostHighScore');
    postHighScore.removeClassName('showPostHighScore');
    leaderboard.addClassName('hideLeaderBoard');
    leaderboard.removeClassName('showLeaderBoard');
    mainMenu.addClassName('hideCongratsMenu');
    mainMenu.removeClassName('showCongratsMenu');
    newGame.addClassName('hideCongratsMenu');
    newGame.removeClassName('showCongratsMenu');
    showRoundSplash();
};
MainAssistant.prototype.mainMenuTap = function(event) {
    play.removeClassName('hidePlay');
    play.addClassName('showPlay');
    subtitle.style.top = "150px";
    title.textContent = "Critical Mass";
    postHighScore.addClassName('hidePostHighScore');
    postHighScore.removeClassName('showPostHighScore');
    subtitle.textContent = "";
    leaderboard.addClassName('hideLeaderBoard');
    leaderboard.removeClassName('showLeaderBoard');
    mainMenu.addClassName('hideCongratsMenu');
    mainMenu.removeClassName('showCongratsMenu');
    newGame.addClassName('hideCongratsMenu');
    newGame.removeClassName('showCongratsMenu');
    info.addClassName('showInfo');  
    info.removeClassName('hideInfo');
    postscore.addClassName("showpostscore");
    postscore.removeClassName("hidepostscore");
};
MainAssistant.prototype.startTimer = function(event) {
if(render && roundManager.roundActive == 1) {
    render.animate();
}
};
MainAssistant.prototype.stopTimer = function(event) {
if(render && roundManager.roundActive == 1) {
    render.stopAnimate();
}
};
MainAssistant.prototype.activate = function(event) {
};

MainAssistant.prototype.deactivate = function(event) {
};

MainAssistant.prototype.cleanup = function(event) {
    clearInterval(this.animate);
};
randPosX = function() {
    var randPosX = Math.floor(Math.random() * canvasWidth);
    return randPosX;
};
randPosY = function() {
    var randPosY = Math.floor(Math.random() * 315);
    return randPosY;
};
randVel = function() {
    var randVel = Math.floor(Math.random() * 6);
    randVel == 0 ? randVel = 40 : 0;
    randVel == 1 ? randVel = 60 : 0;
    randVel == 2 ? randVel = 80 : 0;
    randVel == 3 ? randVel = -40 : 0;
    randVel == 4 ? randVel = -60 : 0;
    randVel == 5 ? randVel = -80 : 0;
    return randVel;
};
rand255 = function() {
    var rand255 = Math.floor(Math.random() * 226);
    rand255 = rand255 + 30;
    return rand255;
};
randColorString = function() {
    var randVel;
    randVel = ''+rand255()+','+rand255()+','+rand255()+',0.7';
    return randVel;
};
        