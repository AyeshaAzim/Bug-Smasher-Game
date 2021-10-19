
/*Building the platform*/

var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 750;
var ctx = canvas.getContext("2d");
canvas.style.border = "10px inset #02383C";
document.body.appendChild(canvas);

var timer = 0;
var click = false;
var speed = 10;

/*Background*/

var background = false;
var backgroundImage = new Image();
backgroundImage.onload = function () 
{
    background = true;
};
backgroundImage.src = "grass.jpg";

/*Bug*/

var bugCharacter = false;
var bugImage = new Image();
bugImage.onload = function () 
{
    bugCharacter = true;
};
bugImage.src = "bug.png";

var bug = {};
var bugCaught = 0;
var reset = function () {
    bug.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        bug.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (bug.y < 100)
};
//mousedown event
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) 
{

    if (e.button != 0) return;

    mouseXincanvas = e.clientX;
    mouseYincanvas = e.clientY;

    if (bugSmash(bug, mouseXincanvas, mouseYincanvas)) {
        click = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / speed);
        reset();
    }
	if (Replay(mouseXincanvas, mouseYincanvas)) {
        location.reload();
    }
    if (InitialSpeed(mouseXincanvas, mouseYincanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / speed);
        reset();
        render();
    }
};
//bug's body define
function bugSmash(bug, x, y) {

    if (x <= (bug.x + 80)
        && bug.x <= (x + 90)
        && y <= (bug.y + 80)
        && bug.y <= (y + 80)
    ) {
        speed = speed + 5;
        bugCaught++;
        return true;
    }
    return false;
};
//Reset Score box
function Replay(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};

//Reset speed box
function InitialSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        speed = 10;
        return true;
    }
    return false;
};
// Draw everything
var render = function () {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (background) {
        ctx.drawImage(backgroundImage, 0, 100);
    }
    if (bugCharacter) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
    if (click == true) {
        if (background) {
            ctx.drawImage(backgroundImage, 0, 100);
        }
        click = false;
    }
// Score, Title
    ctx.fillStyle = "#02383C";
    ctx.font = "42px Courier New";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bug Smasher", 25, 40);
    ctx.font = "22px Courier New";
    ctx.fillText("Bugs Smashed: " + bugCaught, 65, 10);



    // Reset Score, Speed button
    ctx.fillStyle = "#02383C";
    ctx.fillRect(320, 18, 200, 61);
    ctx.fillRect(560, 18, 200, 61);
    ctx.fillStyle = "#BEF992";
    ctx.fillRect(325, 21, 190, 54);
    ctx.fillRect(565, 21, 190, 54);
    ctx.fillStyle = "#02383C";
    ctx.font = "28px Courier New";
    ctx.fillText("Replay", 370, 34);
    ctx.fillText("Reset Speed", 568, 34);

};
// Game loop
var main = function ()
{
    render();
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Play the game!

reset();
main();
