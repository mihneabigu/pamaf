function wholePage(userObject, bestUsersObject, userDocID) {
    var otherUser = {};
    var canvas = document.getElementById('game');
    console.log("aici", canvas)
    var context = canvas.getContext('2d');
    var imagePlayer = new Image();
    imagePlayer.onload = function () {
        playerImage = imagePlayer;
    }
    imagePlayer.src = userObject.photoUrl;
    var otherImagePlayer = new Image();
    //var stage = new createjs.Stage("game");


    ////////////////////////CREATEJS//////////////////////////////////////////////
    /*function init() {
            //var stage = new createjs.Stage("game");
            var circle = new createjs.Shape();
            circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
            circle.x = 100;
            circle.y = 100;
            stage.addChild(circle);
            //stage.update();
          }
    function init2() {
            //var stage = new createjs.Stage("game");
            var circle = new createjs.Shape();
            circle.graphics.beginFill("green").drawCircle(0, 0, 30);
            circle.x = 300;
            circle.y = 300;
            stage.addChild(circle);
            //stage.update();
          }
    init()
    init2()
    stage.update()*/

    /////////////////////////////////////////////////////////////////



    var gameStarted = false;
    //var isVersusBorder = false;

    /*document.body.addEventListener("keydown", function(event){
    	if(event.keyCode == 13 && !gameStarted){
    		startGame();
    	}
    });*/

    var pct = 0.5

    var selectedPage = "Intro"
    intro_screen();

    var inputBoxElement;
    var inputBoxElement_Value;
    var canvasInputBox = document.getElementById('canvas'); //canvasul micut in care tin inputboxul de pe github
    var joinRoom_Clicked;
    var createRoom_Clicked;

    var audioCtx;
    var gainNode;
    var isDown = false;
    var offsetX, offsetY;
    var range;

    var year1;
    var year2;
    var year3;

    var sp_btn;
    var mp_btn;
    var settings_btn;
    var profile_btn;
    var leaderboard_btn;

    var startGame; //lobby room

    var singlePlayText_Size = 25; //general button size
    var singlePlayBox_size = 25; //general box size
    var multiPlayText_Size = 25; //general button size
    var multiPlayBox_size = 25; //general box size
    var profileText_size = 25; //general button size
    var profileBox_size = 25; //general box size
    var settingsText_size = 25; //general button size
    var settingsBox_size = 25; //general box size
    var leaderboardText_size = 25; //general button size
    var leaderboardBox_size = 25; //general box size

    var createRoomText_size = 25; //general button size
    var joinRoomText_size = 25; //general button size

    var startGame_Text_Size = 35;


    var year_1_Text_size = 25;
    var year_2_Text_size = 25;
    var year_3_Text_size = 25;

    var isDown_Year1 = false;
    var isDown_Year2 = false;
    var isDown_Year3 = false;

    var textYear1X;
    var textYear1Y;
    var textYear2X;
    var textYear2Y;
    var textYear3X;
    var textYear3Y;
    var raspunsYear1;
    var raspunsYear2;
    var raspunsYear3;
    var raspunsCreateRoom;
    var raspunsJoinRoom;

    var margine_stg_drp;
    var margine_sus_jos;

    var createRoom_btn;
    var joinRoom_btn;

    var isPlaying = false;

    var backCircle = {
        x: 100,
        y: 70,
        radius: 35,
        id: 5,
        textSize: 50
    }

    //////////////////////////AUDIO API///////////////////////////////
    //window.onload = 
    init();

    function init() {
        audioCtx = new window.AudioContext()

        bufferLoader = new BufferLoader(
            audioCtx,
        [
          './menu2.mp3',
        ],
            finishedLoading
        );
        bufferLoader.load();
    }


    function finishedLoading(bufferList) {
        var source = audioCtx.createBufferSource();
        source.buffer = bufferList[0];

        changeVolume(source)

        source.loop = true
        //source.start(0);
    }

    canvas.addEventListener('click', function startMenuTheme() {
        audioCtx.resume().then(() => {
            console.log('Playback resumed successfully');
            canvas.removeEventListener('click', startMenuTheme)
        });
    });


    function changeVolume(sourceParam) {
        gainNode = audioCtx.createGain()
        sourceParam.connect(gainNode)
        gainNode.connect(audioCtx.destination)
        gainNode.gain.value = 0.5
    }
    //////////////////////////AUDIO API///////////////////////////////


    function Button(text, x, y, w, h, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.size = size;

        this.draw = function () {
            //context.save()
            this.drawRectangle()

            context.font = `${this.size}px Impact`

            /*var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "red");
            gradient.addColorStop("0.2", "blue");
            gradient.addColorStop("0.9", "red");*/
            context.fillStyle = "#CBF3D2";

            context.textAlign = "center"; //punctul e la mijlocul text SUB EL
            context.textBaseline = "middle"; //punctul trece prin mijlocul text
            //context.strokeStyle = "black";

            var textX = this.x + (this.w / 2);
            var textY = this.y + (this.h / 2);
            var textSize = context.measureText(this.text);

            context.shadowBlur = 10;
            context.shadowColor = "#0A0F0D";
            context.fillText(this.text, textX, textY);
            //context.strokeText(this.text, textX, textY); 
            //context.restore()
        }

        this.drawRectangle = function () {
            context.fillStyle = "rgba(255, 255, 255, 0.0)"; //"white"; //"#AFBED1";
            context.fillRect(this.x, this.y, this.w, this.h);
        }

        this.grow = function () {
            if (this.size > 50) {
                this.size = 50
            }
            this.draw()
        }

    }

    function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = function () {
            context.beginPath()
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            context.fillStyle = "white";
            context.strokeStyle = "white"
            context.stroke();
            context.fill()
        }
        this.update = function () {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

            this.draw()
        }
    }

    var circleArray = []

    for (var i = 0; i < 100; i++) {
        var radius = 1;
        var x = Math.random() * (canvas.width - radius * 2) + radius;
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var dx = (Math.random() - 0.5); //velocity for x coordinate
        var dy = (Math.random() - 0.5); //velocity for y coordinate
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }

    function animateDots() {
        for (var i = 0; i < circleArray.length; i++) {
            context.shadowBlur = 0;
            circleArray[i].update()
        }
    }

    function intro_screen() {
        context.save()

        var title_btn = new Button("PAMAF", canvas.width / 2 - 175, canvas.height / 2 - 160, 350, 50, 50)
        title_btn.grow()
        context.restore()

        sp_btn = new Button("SINGLEPLAYER", canvas.width / 2 - 100, canvas.height / 2 - 40, 200, 35, singlePlayText_Size)
        sp_btn.grow()
        context.restore()

        mp_btn = new Button("MULTIPLAYER", canvas.width / 2 - 100, canvas.height / 2 + 10, 200, 35, multiPlayText_Size)
        mp_btn.grow()
        context.restore()

        settings_btn = new Button("SETTINGS", canvas.width / 2 - 100, canvas.height / 2 + 60, 200, 35, settingsText_size)
        settings_btn.grow()
        context.restore()

        profile_btn = new Button("PROFILE", canvas.width / 2 - 100, canvas.height / 2 + 110, 200, 35, profileText_size)
        profile_btn.grow()
        context.restore()

        leaderboard_btn = new Button("LEADERBOARD", canvas.width / 2 - 100, canvas.height / 2 + 160, 200, 35, leaderboardText_size)
        leaderboard_btn.grow()
        context.restore()

        canvas.addEventListener('click', clickMouse_IntroScreen)
        canvas.addEventListener('mousemove', moveMouse_IntroScreen)
    }

    function clickMouse_IntroScreen(e) {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };
        console.log(pos.x, pos.y)
        var margine_stg_drp = (window.innerWidth - canvas.width) / 2;
        var margine_sus_jos = (window.innerHeight - canvas.height) / 2;

        var textSinglePlayX = [sp_btn.x, sp_btn.x + sp_btn.w, sp_btn.x, sp_btn.x + sp_btn.w]
        var textSinglePlayY = [sp_btn.y, sp_btn.y, sp_btn.y + sp_btn.size, sp_btn.y + sp_btn.size]

        var textMultiPlayX = [mp_btn.x, mp_btn.x + mp_btn.w, mp_btn.x, mp_btn.x + mp_btn.w]
        var textMultiPlayY = [mp_btn.y, mp_btn.y, mp_btn.y + mp_btn.size, mp_btn.y + mp_btn.size]

        var textSettingsX = [settings_btn.x, settings_btn.x + settings_btn.w, settings_btn.x, settings_btn.x + settings_btn.w]
        var textSettingsY = [settings_btn.y, settings_btn.y, settings_btn.y + settings_btn.size, settings_btn.y + settings_btn.size]

        var textProfileX = [profile_btn.x, profile_btn.x + profile_btn.w, profile_btn.x, profile_btn.x + profile_btn.w]
        var textProfileY = [profile_btn.y, profile_btn.y, profile_btn.y + profile_btn.size, profile_btn.y + profile_btn.size]

        var textLeaderboardX = [leaderboard_btn.x, leaderboard_btn.x + leaderboard_btn.w, leaderboard_btn.x, leaderboard_btn.x + leaderboard_btn.w]
        var textLeaderboardY = [leaderboard_btn.y, leaderboard_btn.y, leaderboard_btn.y + leaderboard_btn.size, leaderboard_btn.y + leaderboard_btn.size]

        var raspunsSinglePlay = pnpoly2(textSinglePlayX, textSinglePlayY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsMultiPlay = pnpoly2(textMultiPlayX, textMultiPlayY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsSettings = pnpoly2(textSettingsX, textSettingsY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsProfile = pnpoly2(textProfileX, textProfileY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsLeaderboard = pnpoly2(textLeaderboardX, textLeaderboardY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)

        if (raspunsSinglePlay == true) {
            console.log("Clicked SinglePlay")
            canvas.removeEventListener('click', clickMouse_IntroScreen)
            canvas.removeEventListener('mousemove', moveMouse_IntroScreen)
            selectedPage = "SinglePlayer"
        }
        if (raspunsMultiPlay == true) {
            console.log("Clicked MultiPlay")
            canvas.removeEventListener('click', clickMouse_IntroScreen)
            canvas.removeEventListener('mousemove', moveMouse_IntroScreen)
            selectedPage = "MultiPlayer"
        }
        if (raspunsSettings == true) {
            console.log("Clicked Settings")
            canvas.removeEventListener('click', clickMouse_IntroScreen)
            canvas.removeEventListener('mousemove', moveMouse_IntroScreen)
            selectedPage = "Settings"
        }
        if (raspunsProfile == true) {
            console.log("Clicked Profile")
            canvas.removeEventListener('click', clickMouse_IntroScreen)
            canvas.removeEventListener('mousemove', moveMouse_IntroScreen)
            selectedPage = "Profile"
        }
        if (raspunsLeaderboard == true) {
            console.log("Clicked Leaderboard")
            canvas.removeEventListener('click', clickMouse_IntroScreen)
            canvas.removeEventListener('mousemove', moveMouse_IntroScreen)
            selectedPage = "Leaderboard"
        }
    }

    function moveMouse_IntroScreen(e) {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        var margine_stg_drp = (window.innerWidth - canvas.width) / 2;
        var margine_sus_jos = (window.innerHeight - canvas.height) / 2;

        var textSinglePlayX = [sp_btn.x, sp_btn.x + sp_btn.w, sp_btn.x, sp_btn.x + sp_btn.w]
        var textSinglePlayY = [sp_btn.y, sp_btn.y, sp_btn.y + sp_btn.size, sp_btn.y + sp_btn.size]

        var textMultiPlayX = [mp_btn.x, mp_btn.x + mp_btn.w, mp_btn.x, mp_btn.x + mp_btn.w]
        var textMultiPlayY = [mp_btn.y, mp_btn.y, mp_btn.y + mp_btn.size, mp_btn.y + mp_btn.size]

        var textSettingsX = [settings_btn.x, settings_btn.x + settings_btn.w, settings_btn.x, settings_btn.x + settings_btn.w]
        var textSettingsY = [settings_btn.y, settings_btn.y, settings_btn.y + settings_btn.size, settings_btn.y + settings_btn.size]

        var textProfileX = [profile_btn.x, profile_btn.x + profile_btn.w, profile_btn.x, profile_btn.x + profile_btn.w]
        var textProfileY = [profile_btn.y, profile_btn.y, profile_btn.y + profile_btn.size, profile_btn.y + profile_btn.size]

        var textLeaderboardX = [leaderboard_btn.x, leaderboard_btn.x + leaderboard_btn.w, leaderboard_btn.x, leaderboard_btn.x + leaderboard_btn.w]
        var textLeaderboardY = [leaderboard_btn.y, leaderboard_btn.y, leaderboard_btn.y + leaderboard_btn.size, leaderboard_btn.y + leaderboard_btn.size]

        var raspunsSinglePlay = pnpoly2(textSinglePlayX, textSinglePlayY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsMultiPlay = pnpoly2(textMultiPlayX, textMultiPlayY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsSettings = pnpoly2(textSettingsX, textSettingsY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsProfile = pnpoly2(textProfileX, textProfileY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        var raspunsLeaderboard = pnpoly2(textLeaderboardX, textLeaderboardY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)

        if (raspunsProfile == true) {
            profileText_size = 35;
        } else if (raspunsProfile == false) {
            profileText_size = 25;
        }

        if (raspunsSinglePlay == true) {
            singlePlayText_Size = 35;
        } else if (raspunsSinglePlay == false) {
            singlePlayText_Size = 25;
        }

        if (raspunsMultiPlay == true) {
            multiPlayText_Size = 35;
        } else if (raspunsMultiPlay == false) {
            multiPlayText_Size = 25;
        }

        if (raspunsSettings == true) {
            settingsText_size = 35;
        } else if (raspunsSettings == false) {
            settingsText_size = 25;
        }

        if (raspunsLeaderboard == true) {
            leaderboardText_size = 35;
        } else if (raspunsLeaderboard == false) {
            leaderboardText_size = 25;
        }
    }

    function pnpoly2(vertx, verty, testx, testy) {
        if ((testx >= vertx[0] && testy >= verty[0]) && (testx <= vertx[1] && testy >= verty[1]) && (testx >= vertx[2] && testy <= verty[2]) && (testx <= vertx[3] && testy <= verty[3])) {
            return true;
        }
        return false;
    }

    /////////////////////////SETTINGS PAGE///////////////////////////

    function settings_screen() {
        /*context.beginPath()
        context.lineWidth = 2
        context.arc(backCircle.x, backCircle.y, backCircle.radius, 0, Math.PI*2, false)
        context.strokeStyle = "#210B2C";
        context.stroke();
    
        context.lineWidth = 1;*/

        context.font = `${backCircle.textSize}px Impact`;

        var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        /*gradient.addColorStop("0", "red");
        gradient.addColorStop("0.03", "blue");
        gradient.addColorStop("0.3", "red");*/
        context.fillStyle = "#CBF3D2";

        context.fillText('\u2b8c', 100, 70);

        var title_btn = new Button("Music", canvas.width / 2 - 175, canvas.height / 2 - 50, 350, 50, 50)
        title_btn.grow()
        context.restore()

        ///////////////////MUSIC SLIDER////////////////////
        var cw = canvas.width;
        var ch = canvas.height;

        function reOffset() {
            var BB = canvas.getBoundingClientRect();
            offsetX = BB.left;
            offsetY = BB.top;
        }

        reOffset();
        window.onscroll = function (e) {
            reOffset();
        }
        window.onresize = function (e) {
            reOffset();
        }

        range = makeRangeControl(canvas.width / 2 - 100, canvas.height / 2 + 40, 200, 25, pct);
        drawRangeControl(range);

        canvas.addEventListener("mousedown", downFnc)
        canvas.addEventListener("mousemove", moveFnc)
        canvas.addEventListener("mouseup", upFnc)
        canvas.addEventListener("mouseout", outFnc)

        function makeRangeControl(x, y, width, height, pct) {
            var range = {
                x: x,
                y: y,
                width: width,
                height: height
            };
            range.x1 = range.x + range.width;
            range.y1 = range.y;

            range.pct = pct;
            return (range);
        }

        function drawRangeControl(range) {

            //Bar
            context.lineWidth = 10;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(range.x, range.y);
            context.lineTo(range.x1, range.y);
            context.strokeStyle = '#B4ADA3';
            context.stroke();

            //Thumb
            context.beginPath();
            var thumbX = range.x + range.width * range.pct;
            context.moveTo(thumbX, range.y - range.height / 2);
            context.lineTo(thumbX, range.y + range.height / 2);
            context.strokeStyle = "#CBF3D2";
            context.stroke();

            context.lineWidth = 1;
        }

        if (isDown == true) {
            context.fillStyle = "#CBF3D2";
            context.font = '25px Impact';

            context.fillText(parseInt(range.pct * 100) + '%', canvas.width / 2, range.y + 40)
        }
        ///////////////////MUSIC SLIDER////////////////////


        canvas.addEventListener('click', clickMouse_OtherScreens)
        canvas.addEventListener('mousemove', moveMouse_OtherScreens)

    }

    function whereMouseCoordsAre_SP_Screen(pos) {

        margine_stg_drp = (window.innerWidth - canvas.width) / 2;
        margine_sus_jos = (window.innerHeight - canvas.height) / 2;

        textYear1X = [year_1.x, year_1.x + year_1.w, year_1.x, year_1.x + year_1.w]
        textYear1Y = [year_1.y, year_1.y, year_1.y + year_1.size, year_1.y + year_1.size]

        textYear2X = [year_2.x, year_2.x + year_2.w, year_2.x, year_2.x + year_2.w]
        textYear2Y = [year_2.y, year_2.y, year_2.y + year_2.h, year_2.y + year_2.h]

        textYear3X = [year_3.x, year_3.x + year_3.w, year_3.x, year_3.x + year_3.w]
        textYear3Y = [year_3.y, year_3.y, year_3.y + year_3.size, year_3.y + year_3.size]

        raspunsYear1 = pnpoly2(textYear1X, textYear1Y, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        raspunsYear2 = pnpoly2(textYear2X, textYear2Y, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        raspunsYear3 = pnpoly2(textYear3X, textYear3Y, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
    }

    function whereMouseCoordsAre_MP_Screen(pos) {

        margine_stg_drp = (window.innerWidth - canvas.width) / 2;
        margine_sus_jos = (window.innerHeight - canvas.height) / 2;

        textCreateRoomX = [createRoom_btn.x, createRoom_btn.x + createRoom_btn.w, createRoom_btn.x, createRoom_btn.x + createRoom_btn.w]
        textCreateRoomY = [createRoom_btn.y, createRoom_btn.y, createRoom_btn.y + createRoom_btn.h, createRoom_btn.y + createRoom_btn.h]

        textJoinRoomX = [joinRoom_btn.x, joinRoom_btn.x + joinRoom_btn.w, joinRoom_btn.x, joinRoom_btn.x + joinRoom_btn.w]
        textJoinRoomY = [joinRoom_btn.y, joinRoom_btn.y, joinRoom_btn.y + joinRoom_btn.h, joinRoom_btn.y + joinRoom_btn.h]

        raspunsCreateRoom = pnpoly2(textCreateRoomX, textCreateRoomY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
        raspunsJoinRoom = pnpoly2(textJoinRoomX, textJoinRoomY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)
    }

    function moveMouse_OtherScreens(e) {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        var margine_stg_drp = (window.innerWidth - canvas.width) / 2;
        var margine_sus_jos = (window.innerHeight - canvas.height) / 2;

        const pos_relative_to_canvas = {
            x: e.clientX - margine_stg_drp,
            y: e.clientY - margine_sus_jos
        }

        if (isIntersect(pos_relative_to_canvas, backCircle)) {
            backCircle.textSize = 70
            //backCircle.radius = 40
        } else {
            backCircle.textSize = 50
            // backCircle.radius = 30
        }

        if (selectedPage == "Lobby") {

            textStartGameX = [startGame.x, startGame.x + startGame.w, startGame.x, startGame.x + startGame.w]
            textStartGameY = [startGame.y, startGame.y, startGame.y + startGame.h, startGame.y + startGame.h]

            raspunsStartGameRoom = pnpoly2(textStartGameX, textStartGameY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)

            if (raspunsStartGameRoom == true) {
                startGame_Text_Size = 45;
            } else if (raspunsStartGameRoom == false) {
                startGame_Text_Size = 35;
            }
        }


        if (selectedPage == "SinglePlayer") {

            whereMouseCoordsAre_SP_Screen(pos)

            if (raspunsYear1 == true) {
                year_1_Text_size = 35;
            } else if (raspunsYear1 == false) {
                year_1_Text_size = 25;
            }

            if (raspunsYear2 == true) {
                year_2_Text_size = 35;
            } else if (raspunsYear2 == false) {
                year_2_Text_size = 25;
            }

            if (raspunsYear3 == true) {
                year_3_Text_size = 35;
            } else if (raspunsYear3 == false) {
                year_3_Text_size = 25;
            }
        }

        if (selectedPage == "MultiPlayer") {

            whereMouseCoordsAre_MP_Screen(pos)

            if (raspunsCreateRoom == true) {
                createRoomText_size = 35;
            } else if (raspunsCreateRoom == false) {
                createRoomText_size = 25;
            }

            if (raspunsJoinRoom == true) {
                joinRoomText_size = 35;
            } else if (raspunsJoinRoom == false) {
                joinRoomText_size = 25;
            }
        }
    }

    function isIntersect(point, circle) {
        return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
    }

    var amJoining = false;

    function clickMouse_OtherScreens(e) {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        var margine_stg_drp = (window.innerWidth - canvas.width) / 2;
        var margine_sus_jos = (window.innerHeight - canvas.height) / 2;

        const pos_relative_to_canvas = {
            x: e.clientX - margine_stg_drp,
            y: e.clientY - margine_sus_jos
        }

        if (isIntersect(pos_relative_to_canvas, backCircle)) {
            canvas.removeEventListener('mousedown', downFnc);
            canvas.removeEventListener('mousemove', moveFnc);
            canvas.removeEventListener('mouseup', upFnc);
            canvas.removeEventListener('mouseout', outFnc);

            canvas.removeEventListener('mousemove', moveMouse_OtherScreens);
            canvas.removeEventListener('click', clickMouse_OtherScreens);

            canvasInputBox.style.display = "none";
            joinRoom_Clicked = false;
            createRoom_Clicked = false;

            selectedPage = "Intro"
        }

        if (selectedPage == "Lobby") {

            textStartGameX = [startGame.x, startGame.x + startGame.w, startGame.x, startGame.x + startGame.w]
            textStartGameY = [startGame.y, startGame.y, startGame.y + startGame.h, startGame.y + startGame.h]

            raspunsStartGameRoom = pnpoly2(textStartGameX, textStartGameY, pos.x - margine_stg_drp, pos.y - margine_sus_jos)

            if (raspunsStartGameRoom == true) {
                console.log("AM INCEPUT")
                isMultiplayer = true;
                isPlaying = true;
                onHallway = false;
                initMultiplayer();
                socket.emit("startGame", {
                    id: otherUser.id,
                    x: circle.x,
                    y: circle.y
                })
            }
        }

        if (selectedPage == "SinglePlayer") {
            whereMouseCoordsAre_SP_Screen(pos)

            canvas.removeEventListener('mousemove', moveMouse_OtherScreens);
            canvas.removeEventListener('click', clickMouse_OtherScreens);

            if (raspunsYear1 == true) {
                console.log("Click YEAR1");
                isPlaying = true;
                yearPacman = 1;
                onHallway = true;
                map = [];
                initHallway();
            }

            if (raspunsYear2 == true) {
                console.log("Click YEAR2");
                isPlaying = true;
                yearPacman = 2;
                onHallway = true;
                map = [];
                initHallway();
            }

            if (raspunsYear3 == true) {
                console.log("Click YEAR3");
                isPlaying = true;
                yearPacman = 3;
                onHallway = true;
                map = [];
                initHallway();
            }
        }

        if (selectedPage == "MultiPlayer") {
            whereMouseCoordsAre_MP_Screen(pos)

            if (raspunsJoinRoom == true) {
                console.log("Click JoinRoom")
                canvasInputBox.style.display = "block";

                var inputBoxElement = new CanvasInput({
                    canvas: canvasInputBox,
                    fontSize: 20,
                    width: 250,
                    x: (canvasInputBox.width / 2 - 140),
                    fontFamily: 'Courier New',
                    fontStyle: 'italic',
                    fontColor: '#3C493F',
                    placeHolderColor: '#3C493F',
                    padding: 10,
                    borderWidth: 3,
                    borderColor: '#3C493F',
                    backgroundColor: "#CBF3D2",
                    borderRadius: 10,
                    boxShadow: '1px 1px 0px #fff',
                    innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                    placeHolder: 'Enter token here',
                    onsubmit: function () {
                        inputBoxElement_Value = inputBoxElement._value;
                        console.log(inputBoxElement_Value)

                        document.body.addEventListener("keydown", function (event) {
                            if (event.keyCode == 13) {
                                console.log("REDIRECT LA PAGINA CU JUCATORI"); /////////////////////////////////////////////////////////////////validare token/////////////////////////
                            };
                        });

                        socket.emit("joinRoom", {
                            id: socket.id,
                            key: inputBoxElement_Value,
                            user: userObject
                        })


                        canvasInputBox.style.display = "none";
                        amJoining = true;
                        selectedPage = "Lobby";
                    }
                });


                joinRoom_Clicked = true;
                createRoom_Clicked = false;
            }

            if (raspunsCreateRoom == true) {
                console.log("Click CreateRoom")
                canvasInputBox.style.display = "none";

                joinRoom_Clicked = false;
                createRoom_Clicked = true;

                selectedPage = "Lobby"

                socket.emit("createRoom", {
                    id: socket.id,
                    key: "abcd",
                    user: userObject
                });
            }
        }
    }


    function downFnc(e) {
        e.preventDefault();
        e.stopPropagation();

        if (selectedPage == "Settings") {
            var mx = parseInt(e.clientX - offsetX);
            var my = parseInt(e.clientY - offsetY);

            isDown = (mx > range.x && mx < range.x + range.width && my > range.y - range.height / 2 && my < range.y + range.height / 2);
        }

        if (selectedPage == "SinglePlayer") {
            const pos = {
                x: e.clientX,
                y: e.clientY
            };

            var margine_stg_drp = (window.innerWidth - canvas.width) / 2;
            var margine_sus_jos = (window.innerHeight - canvas.height) / 2;

            whereMouseCoordsAre_SP_Screen(pos)

            if (raspunsYear1 == true) {
                isDown_Year1 = true;
            }

            if (raspunsYear2 == true) {
                isDown_Year2 = true;
            }

            if (raspunsYear3 == true) {
                isDown_Year3 = true;
            }
        }
    }


    function moveFnc(e) {
        if (!isDown) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        range.pct = Math.max(0, Math.min(1, (mouseX - range.x) / range.width));
        pct = range.pct

        gainNode.gain.value = pct;
        globalVolume = pct;

    }

    function upFnc(e) {

        e.preventDefault();
        e.stopPropagation();

        isDown = false;
        isDown_Year1 = false;
        isDown_Year2 = false;
        isDown_Year3 = false;
    }

    function outFnc(e) {

        e.preventDefault();
        e.stopPropagation();

        isDown = false;
    }

    function roundedImage(x, y, width, height, radius) {
        context.beginPath();
        context.lineWidth = 5
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
        context.strokeStyle = "#CBF3D2"
        context.stroke();

        context.lineWidth = 1
    }


    /////////////////////////PROFILE PAGE////////////////////////

    var deathImageX = canvas.width / 2 - 12.5 + 40;
    var deathImageY = canvas.height / 2 + 77;
    var deathImageVelocity = 0.05;

    var killsImageX = canvas.width / 2 - 12.5 - 160;
    var killsImageY = canvas.height / 2 + 77;
    var killsImageVelocity = 0.05;

    var highscoreImageX = canvas.width / 2 - 15 + 25;
    var highscoreImageY = canvas.height / 2 + 7;
    var highscoreImageVelocity = 0.05;

    var userImageX = canvas.width / 2 - 15 - 182;
    var userImageY = canvas.height / 2 + 7;
    var userImageVelocity = 0.05;

    function profile_screen() {

        context.save()

        var imageRadius = 25
        var imageWidth = 100
        var imageHeight = 100
        var imageX = canvas.width / 2 - imageWidth / 2
        var imageY = canvas.height / 2 - 140

        roundedImage(imageX, imageY, imageWidth, imageHeight, imageRadius)

        context.clip();

        var myImage = new Image();
        myImage.src = `${userObject.photoUrl}`;
        context.drawImage(myImage, imageX, imageY, imageWidth, imageHeight)

        context.restore()



        var btn1 = new Button("USERNAME", canvas.width / 2 - 75 - 105, canvas.height / 2 + 10, 150, 25, 25)
        btn1.grow()
        context.restore()

        var btn1_value = new Button(`${userObject.name}`, canvas.width / 2 - 75 - 105 + 25, canvas.height / 2 + 38, 100, 15, 15)
        btn1_value.grow()
        context.restore()


        var btn2 = new Button("HIGHSCORE", canvas.width / 2 - 75 + 105, canvas.height / 2 + 10, 150, 25, 25)
        btn2.grow()
        context.restore()

        var btn2_value = new Button(`${userObject.highscore}`, canvas.width / 2 - 75 + 105 + 25, canvas.height / 2 + 38, 100, 15, 15)
        btn2_value.grow()
        context.restore()


        var btn3 = new Button("KILLS", canvas.width / 2 - 75 - 105, canvas.height / 2 + 80, 150, 25, 25)
        btn3.grow()
        context.restore()

        var btn3_value = new Button(`${userObject.kills}`, canvas.width / 2 - 75 - 105 + 25, canvas.height / 2 + 108, 100, 15, 15)
        btn3_value.grow()
        context.restore()


        var btn4 = new Button("DEATHS", canvas.width / 2 - 75 + 105, canvas.height / 2 + 80, 150, 25, 25)
        btn4.grow()
        context.restore()

        var btn4_value = new Button(`${userObject.deaths}`, canvas.width / 2 - 75 + 105 + 25, canvas.height / 2 + 108, 100, 15, 15)
        btn4_value.grow()
        context.restore()




        var deathsImage = new Image();
        deathsImage.src = "./deathsNew2.png";
        context.drawImage(deathsImage, deathImageX, deathImageY, 25, 30)

        deathImageY += deathImageVelocity;
        if (deathImageY >= canvas.height / 2 + 77 + 3 || deathImageY <= canvas.height / 2 + 77 - 3)
            deathImageVelocity = -deathImageVelocity;




        var killsImage = new Image();
        killsImage.src = "./killNew.png";
        context.drawImage(killsImage, killsImageX, killsImageY, 25, 30)

        killsImageY += killsImageVelocity;
        if (killsImageY >= canvas.height / 2 + 77 + 3 || killsImageY <= canvas.height / 2 + 77 - 3)
            killsImageVelocity = -killsImageVelocity;




        var highscoreImage = new Image();
        highscoreImage.src = "./trophyNew.png";
        context.drawImage(highscoreImage, highscoreImageX, highscoreImageY, 25, 30)

        highscoreImageY += highscoreImageVelocity;
        if (highscoreImageY >= canvas.height / 2 + 7 + 3 || highscoreImageY <= canvas.height / 2 + 7 - 3)
            highscoreImageVelocity = -highscoreImageVelocity;



        var userImage = new Image();
        userImage.src = "./userNew.png";
        context.drawImage(userImage, userImageX, userImageY, 25, 30)

        userImageY += userImageVelocity;
        if (highscoreImageY >= canvas.height / 2 + 7 + 3 || highscoreImageY <= canvas.height / 2 + 7 - 3)
            userImageVelocity = -userImageVelocity;






        /*context.beginPath()
        context.lineWidth = 2
        context.arc(backCircle.x, backCircle.y, backCircle.radius, 0, Math.PI*2, false)
        context.strokeStyle = "#210B2C";
        context.stroke();

        context.lineWidth = 1;*/
        context.font = `${backCircle.textSize}px Impact`;

        var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        /*gradient.addColorStop("0", "red");
        gradient.addColorStop("0.03", "blue");
        gradient.addColorStop("0.3", "red");*/
        context.fillStyle = "#CBF3D2";

        context.fillText('\u2b8c', 100, 70);

        canvas.addEventListener('click', clickMouse_OtherScreens)
        canvas.addEventListener('mousemove', moveMouse_OtherScreens)
    }
    /////////////////////////PROFILE PAGE////////////////////////


    //////////////////////////PLAY PAGE//////////////////////////
    function single_player_screen() {

        /*context.beginPath()
        context.lineWidth = 2
        context.arc(backCircle.x, backCircle.y, backCircle.radius, 0, Math.PI*2, false)
        context.strokeStyle = "#210B2C";
        context.stroke();
    
        context.lineWidth = 1;*/

        context.font = `${backCircle.textSize}px Impact`;

        var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        /*gradient.addColorStop("0", "red");
        gradient.addColorStop("0.03", "blue");
        gradient.addColorStop("0.3", "red");*/
        context.fillStyle = "#CBF3D2";

        context.fillText('\u2b8c', 100, 70);


        var selectYear = new Button("Select Year", canvas.width / 2 - 175, canvas.height / 2 - 100, 350, 50, 50)
        selectYear.grow()
        context.restore()

        year_1 = new Button("Year 1", canvas.width / 2 - 75 - 170, canvas.height / 2, 150, 35, year_1_Text_size)
        year_1.grow()
        context.restore()

        year_2 = new Button("Year 2", canvas.width / 2 - 75, canvas.height / 2, 150, 35, year_2_Text_size)
        year_2.grow()
        context.restore()

        year_3 = new Button("Year 3", canvas.width / 2 - 75 + 170, canvas.height / 2, 150, 35, year_3_Text_size)
        year_3.grow()
        context.restore()


        canvas.addEventListener("mousedown", downFnc)
        canvas.addEventListener("mouseup", upFnc)


        if (isDown_Year1 == true) {
            context.fillStyle = "#CBF3D2";
            context.font = '25px Impact';

            context.fillText("Encounters:", canvas.width / 2 - 40, canvas.height / 2 + 115)

            context.save()
            roundedImage(canvas.width / 2 + 40, canvas.height / 2 + 80, 70, 70, 30)
            context.clip();

            var myImage = new Image();
            myImage.src = './masalagiu.png';
            context.drawImage(myImage, canvas.width / 2 + 40, canvas.height / 2 + 80, 70, 70)

            context.restore()
        }

        if (isDown_Year2 == true) {
            context.fillStyle = "#CBF3D2";
            context.font = '25px Impact';

            context.fillText("Encounters:", canvas.width / 2 - 80, canvas.height / 2 + 115)

            context.save()
            roundedImage(canvas.width / 2, canvas.height / 2 + 80, 70, 70, 30)
            context.clip();

            var myImage = new Image();
            myImage.src = './varlan2.png';
            context.drawImage(myImage, canvas.width / 2, canvas.height / 2 + 80, 70, 70)

            context.restore()


            context.save()
            roundedImage(canvas.width / 2 + 90, canvas.height / 2 + 80, 70, 70, 30)
            context.clip();

            var myImage = new Image();
            myImage.src = './iftene2.png';
            context.drawImage(myImage, canvas.width / 2 + 90, canvas.height / 2 + 80, 70, 70)

            context.restore()
        }

        if (isDown_Year3 == true) {
            context.fillStyle = "#CBF3D2";
            context.font = '25px Impact';

            context.fillText("Encounters:", canvas.width / 2 - 130, canvas.height / 2 + 115)

            context.save()
            roundedImage(canvas.width / 2 - 50, canvas.height / 2 + 80, 70, 70, 30)
            context.clip();

            var myImage = new Image();
            myImage.src = './ciortuz.png';
            context.drawImage(myImage, canvas.width / 2 - 50, canvas.height / 2 + 80, 70, 70)

            context.restore()


            context.save()
            roundedImage(canvas.width / 2 + 40, canvas.height / 2 + 80, 70, 70, 30)
            context.clip();

            var myImage = new Image();
            myImage.src = './gavrilut.png';
            context.drawImage(myImage, canvas.width / 2 + 40, canvas.height / 2 + 80, 70, 70)

            context.restore()

            context.save()
            roundedImage(canvas.width / 2 + 130, canvas.height / 2 + 80, 70, 70, 30)
            context.clip();

            var myImage = new Image();
            myImage.src = './cristea.png';
            context.drawImage(myImage, canvas.width / 2 + 130, canvas.height / 2 + 80, 70, 70)

            context.restore()
        }

        canvas.addEventListener('click', clickMouse_OtherScreens)
        canvas.addEventListener('mousemove', moveMouse_OtherScreens)

    }
    //////////////////////////PLAY PAGE///////////////////////////

    ///////////////////////LEADERBOARD PAGE///////////////////////
    function leaderboard_screen() {
        /*context.beginPath()
        context.lineWidth = 2
        context.arc(backCircle.x, backCircle.y, backCircle.radius, 0, Math.PI*2, false)
        context.strokeStyle = "#210B2C";
        context.stroke();
    
        context.lineWidth = 1;*/

        context.font = `${backCircle.textSize}px Impact`;

        var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        /*gradient.addColorStop("0", "red");
        gradient.addColorStop("0.03", "blue");
        gradient.addColorStop("0.3", "red");*/
        context.fillStyle = "#CBF3D2";

        context.fillText('\u2b8c', 100, 70);


        context.shadowBlur = 10;


        context.save()

        var imageRadius = 25
        var imageWidth = 100
        var imageHeight = 100
        var imageX = canvas.width / 2 - imageWidth / 2
        var imageY = canvas.height / 2 - 200

        var goldImg = new Image();
        goldImg.src = "goldStar.png";
        context.drawImage(goldImg, imageX + 50 - 25, imageY + 100, 50, 70)

        roundedImage(imageX, imageY, imageWidth, imageHeight, imageRadius)

        context.clip();

        var myImage = new Image();
        myImage.src = `${bestUsersObject[0].photoUrl}`;
        context.drawImage(myImage, imageX, imageY, imageWidth, imageHeight)

        context.restore()







        context.save()

        var imageRadius = 25
        var imageWidth = 100
        var imageHeight = 100
        var imageX = canvas.width / 2 - imageWidth / 2 - 130
        var imageY = canvas.height / 2 - 150

        var goldImg = new Image();
        goldImg.src = "silverStar.png";
        context.drawImage(goldImg, imageX + 50 - 25, imageY + 100, 50, 70)

        roundedImage(imageX, imageY, imageWidth, imageHeight, imageRadius)

        context.clip();

        var myImage = new Image();
        myImage.src = `${bestUsersObject[1].photoUrl}`;
        context.drawImage(myImage, imageX, imageY, imageWidth, imageHeight)

        context.restore()



        context.save()

        var imageRadius = 25
        var imageWidth = 100
        var imageHeight = 100
        var imageX = canvas.width / 2 - imageWidth / 2 + 130
        var imageY = canvas.height / 2 - 150

        var goldImg = new Image();
        goldImg.src = "bronzeStar.png";
        context.drawImage(goldImg, imageX + 50 - 25, imageY + 100, 50, 70)

        roundedImage(imageX, imageY, imageWidth, imageHeight, imageRadius)

        context.clip();

        var myImage = new Image();
        myImage.src = `${bestUsersObject[2].photoUrl}`;
        context.drawImage(myImage, imageX, imageY, imageWidth, imageHeight)

        context.restore()


        //    var btn1 = new Button("1. ", canvas.width/2 - 135, canvas.height/2 + 70, 30, 30, 25) 
        //     btn1.grow()
        //     context.restore()
        //     var contender1 = new Button(`Ice Poseidon`, canvas.width/2 - 100, canvas.height/2 + 70, 200, 30, 25) 
        //     contender1.grow()
        //     context.restore()
        //    
        //    var btn2 = new Button("2. ", canvas.width/2 - 250, canvas.height/2 + 120, 30, 30, 25) 
        //     btn2.grow()
        //     context.restore()
        //     var contender2 = new Button("Rajj Patel", canvas.width/2 - 100, canvas.height/2 + 105, 200, 30, 25) 
        //     contender2.grow()
        //     context.restore()
        //    
        //    /*var btn3 = new Button("3. ", canvas.width/2 + 20, canvas.height/2 + 80, 30, 30, 25) 
        //     btn3.grow()
        //     context.restore()*/
        //     var contender3 = new Button("Summit 1G1", canvas.width/2 - 100, canvas.height/2 + 140, 200, 30, 25) 
        //     contender3.grow()
        //     context.restore()
        //    
        //    /*var btn4 = new Button("4. ", canvas.width/2 + 20, canvas.height/2 + 120, 30, 30, 25) 
        //     btn4.grow()
        //     context.restore()*/
        //     var contender4 = new Button("Summit 1G2", canvas.width/2 - 100, canvas.height/2 + 175, 200, 30, 25) 
        //     contender4.grow()
        //     context.restore()
        //    
        //    /*var btn5 = new Button("5. ", canvas.width/2 - 100 - 15, canvas.height/2 + 160, 30, 30, 25) 
        //     btn5.grow()
        //     context.restore()*/
        //     var contender5 = new Button("Summit 1G3", canvas.width/2 - 100, canvas.height/2 + 210, 200, 30, 25) 
        //     contender5.grow()
        //     context.restore()


        canvas.addEventListener('click', clickMouse_OtherScreens)
        canvas.addEventListener('mousemove', moveMouse_OtherScreens)
    }
    ///////////////////////LEADERBOARD PAGE///////////////////////

    /////////////////////MULTIPLAYER PAGE//////////////////////////
    function multi_player_screen() {
        context.font = `${backCircle.textSize}px Impact`;
        context.fillStyle = "#CBF3D2";
        context.fillText('\u2b8c', 100, 70);

        context.shadowBlur = 10;

        createRoom_btn = new Button("CREATE ROOM", canvas.width / 2 - 100 - 110, canvas.height / 2 - 50, 200, 35, createRoomText_size)
        createRoom_btn.grow()
        context.restore()

        joinRoom_btn = new Button("JOIN ROOM", canvas.width / 2 - 100 + 110, canvas.height / 2 - 50, 200, 35, joinRoomText_size)
        joinRoom_btn.grow()
        context.restore()

        if (joinRoom_Clicked == true) {

            var hitEnter = new Button("PRESS ENTER", canvas.width / 2 - 75, canvas.height / 2 + 110, 150, 35, 25)
            hitEnter.grow()

        }





        canvas.addEventListener('click', clickMouse_OtherScreens)
        canvas.addEventListener('mousemove', moveMouse_OtherScreens)
    }
    /////////////////////MULTIPLAYER PAGE//////////////////////////

    var socket = io.connect("localhost:4000"); //argument = where we want to make this websocket connection to
    socket.on("joining", function (data) {
        otherUser = data;
        otherImagePlayer.onload = function () {
            otherPlayerImage = otherImagePlayer;
        }
        otherImagePlayer.src = data.user.photoUrl;
        console.log(otherUser);
    });
    socket.on("joinRoom", function (data) {

        otherUser = data;
        otherImagePlayer.onload = function () {
            otherPlayerImage = otherImagePlayer;
        }
        otherImagePlayer.src = data.user.photoUrl;
        console.log(otherUser);
    });

    socket.on("startGame", function (data) {
        isMultiplayer = true;
        initMultiplayer();
        isPlaying = true;
        onHallway = false;
        otherPlayer.x = data.x;
        otherPlayer.y = data.y;
    });

    socket.on("multi", function (data) {

        otherPlayer.x = data.x;
        otherPlayer.y = data.y;
    });

    socket.on("dots", function (data) {
        dotsObject = data.dotsArray;
        dots = [];
        dotsObject.forEach(function (dotObject) {
            let dot = new Dot(dotObject.x, dotObject.y, dotObject.radius, dotObject.i, dotObject.j, dotObject.index, dotObject.color);
            dots.push(dot);
        })
    });

    socket.on("notImmune", function (data) {
        circle.immune = data.immune;
    })

    function lobby_screen() {


        context.font = `${backCircle.textSize}px Impact`;
        context.fillStyle = "#CBF3D2";
        context.fillText('\u2b8c', 100, 70);

        //context.save()
        if (!amJoining) {
            creator = true;
            var lobby_title = new Button("LOBBY", canvas.width / 2 - 100, canvas.height / 2 - 160, 200, 50, 50)
            lobby_title.grow()
            context.restore()

            var player1 = new Button("PLAYER 1", canvas.width / 2 - 100 - 150, canvas.height / 2 - 60, 200, 35, 35)
            player1.grow()
            context.restore()


            context.save()
            roundedImage(canvas.width / 2 - 100 + 50 - 151, canvas.height / 2, 100, 100, 25)
            context.clip();

            var myImage = new Image();
            myImage.src = `${userObject.photoUrl}`;
            context.drawImage(myImage, canvas.width / 2 - 100 + 50 - 151, canvas.height / 2, 100, 100)

            context.restore()


            var player2 = new Button("PLAYER 2", canvas.width / 2 - 100 + 150, canvas.height / 2 - 60, 200, 35, 35)
            player2.grow()
            context.restore()



            if (otherUser.user != undefined) {
                context.save()
                roundedImage(canvas.width / 2 - 100 + 50 + 151, canvas.height / 2, 100, 100, 25)
                context.clip();

                var myImage = new Image();
                myImage.src = `${otherUser.user.photoUrl}`;
                context.drawImage(myImage, canvas.width / 2 - 100 + 50 + 151, canvas.height / 2, 100, 100)

                context.restore()

            }

            startGame = new Button("Start Game", canvas.width / 2 - 100, canvas.height / 2 + 150, 200, 35, startGame_Text_Size)
            startGame.grow()
            context.restore()

        } else if (amJoining) {
            creator = false;
            var lobby_title = new Button("LOBBY", canvas.width / 2 - 100, canvas.height / 2 - 160, 200, 50, 50)
            lobby_title.grow()
            context.restore()

            var player1 = new Button("PLAYER 1", canvas.width / 2 - 100 - 150, canvas.height / 2 - 60, 200, 35, 35)
            player1.grow()
            context.restore()


            if (otherUser.user != undefined) {
                context.save()
                roundedImage(canvas.width / 2 - 100 + 50 - 151, canvas.height / 2, 100, 100, 25)
                context.clip();

                var myImage = new Image();
                myImage.src = `${otherUser.user.photoUrl}`;
                context.drawImage(myImage, canvas.width / 2 - 100 + 50 - 151, canvas.height / 2, 100, 100)

                context.restore()

            }

            var player2 = new Button("PLAYER 2", canvas.width / 2 - 100 + 150, canvas.height / 2 - 60, 200, 35, 35)
            player2.grow()
            context.restore()

            context.save()
            roundedImage(canvas.width / 2 - 100 + 50 + 151, canvas.height / 2, 100, 100, 25)
            context.clip();

            var myImage = new Image();
            myImage.src = `${userObject.photoUrl}`;
            context.drawImage(myImage, canvas.width / 2 - 100 + 50 + 151, canvas.height / 2, 100, 100)

            context.restore()

        }
        /*var myImage = new Image();
        myImage.src = './versus2.png';
        context.drawImage(myImage, canvas.width/2 - 35, canvas.height/2 - 35, 70, 170)*/


        var vs = new Button("VS", canvas.width / 2 - 25, canvas.height / 2 + 40, 50, 35, 35)
        vs.grow()
        context.restore()



        canvas.addEventListener('click', clickMouse_OtherScreens)
        canvas.addEventListener('mousemove', moveMouse_OtherScreens)
    }

    function loop() {
        console.log('game running');
    }

    function clearCanvas() {
        context.clearRect(0, 0, 700, 550);
    }


    /*function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }*/

    function multiPlayer() {
        if (isDead) {
            if (frameDead < 120) {
                ctx.clearRect(0, 0, maxWidth, maxHeight);
                draw_map();
                circle.draw();

                dieSong.play();
                frameDead += 1;
            } else {
                frameDead = 0;
                isDead = false;
                circle.reset();

            }
        } else if (firstTimeCountDown) {
            countDown();
        } else if (isGamePaused) {
            ctx.clearRect(0, 0, maxWidth, maxHeight);
            ctx.font = "30px Consolas";
            ctx.fillStyle = "white";
            ctx.fillText("GAME PAUSED", maxWidth / 2 - 150, maxHeight / 2 - 150);
        } else if (gameOver) {

            ctx.clearRect(0, 0, maxWidth, maxHeight);
            ctx.font = "30px Consolas";
            ctx.fillStyle = "white";
            ctx.fillText("GAME OVER", maxWidth / 2 - 40, maxHeight / 2 - 40);

            sleep(2000)
            isPlaying = false;
            gameOver = false;
            isMultiplayer = false;
            firstTimeCountDown = true;
            initMultiplayer();

            //cancelAnimationFrame(requestID);
        } else {
            ctx.clearRect(0, 0, maxWidth, maxHeight);
            draw_map();
            circle.update();
            otherPlayer.draw();
            if (!firstTimeCountDown) {
                if (!amJoining) {
                    socket.emit("dots", {
                        id: otherUser.id,
                        dotsArray: dots
                    });
                    if (sendImmuneStatus) {
                        socket.emit("notImmune", {
                            id: otherUser.id,
                            immune: false
                        });
                    } else {
                        socket.emit("notImmune", {
                            id: otherUser.id,
                            immune: true
                        });
                    }
                }
                socket.emit("multi", {
                    id: otherUser.id,
                    x: circle.x,
                    y: circle.y
                });
                draw_margin();
            }
        }
    }


    let db = firebase.firestore();


    function animate() {
        requestAnimationFrame(animate)
        clearCanvas()
        animateDots()

        //renderTime()    
        if (isPlaying == false) {

            if (selectedPage == "Intro")
                intro_screen()
            if (selectedPage == "SinglePlayer")
                single_player_screen()
            if (selectedPage == "MultiPlayer")
                multi_player_screen()
            if (selectedPage == "Lobby")
                lobby_screen()
            if (selectedPage == "Settings")
                settings_screen()
            if (selectedPage == "Profile")
                profile_screen()
            if (selectedPage == "Leaderboard")
                leaderboard_screen()

        } else if (isPlaying == true) {
            if (!isMultiplayer) {

                if (onHallway && isPlaying) {
                    ctx.clearRect(0, 0, maxWidth, maxHeight);

                    draw_map();
                    circle.update();
                    draw_margin();
                } else {
                    if (isDead) {
                        if (frameDead < 120) {
                            ctx.clearRect(0, 0, maxWidth, maxHeight);
                            draw_map();
                            circle.draw();
                            for (let j = 0; j < ghosts.length; j++) {
                                ghosts[j].draw();
                            }
                            dieSong.play();
                            frameDead += 1;
                        } else {
                            frameDead = 0;
                            isDead = false;
                            circle.reset();
                            for (let j = 0; j < ghosts.length; j++) {
                                ghosts[j].reset();
                            }
                        }
                    } else if (firstTimeCountDown) {
                        countDown();
                    } else if (isGamePaused) {
                        ctx.clearRect(0, 0, maxWidth, maxHeight);
                        ctx.font = "30px Consolas";
                        ctx.fillStyle = "white";
                        ctx.fillText("GAME PAUSED", maxWidth / 2 - 90, maxHeight / 2 - 90);
                    } else if (gameOver) {

                        ctx.clearRect(0, 0, maxWidth, maxHeight);
                        ctx.font = "30px Consolas";
                        ctx.fillStyle = "white";
                        ctx.fillText("GAME OVER", maxWidth / 2 - 15, maxHeight / 2 - 15);

                        sleep(2000)
                        isPlaying = false;
                        gameOver = false;
                        ctx.resetTransform();

                        firstTimeCountDown = false;
                        //initPacman()


                        //firebase call
                        //let db = firebase.firestore();
                        console.log("scor", circle.score)
                        if (circle.score > userObject.highscore) {
                            db.collection("users").doc(userDocID).update({
                                highscore: circle.score
                            })
                            userObject.highscore = circle.score
                        }


                        var index = -1;

                        db.collection("users").orderBy("highscore", "desc").limit(3).get()
                            .then(users => {

                                users.forEach(doc => {
                                    index++

                                    console.log("NOU:", doc.data())
                                    bestUsersObject[index] = doc.data()
                                })

                                console.log("Toti userii", bestUserObject)
                            })
                            .catch((e) => {
                                console.log(e)
                            });



                        //cancelAnimationFrame(requestID);
                    } else {
                        ctx.clearRect(0, 0, maxWidth, maxHeight);
                        draw_map();
                        circle.update();
                        if (!firstTimeCountDown) {
                            ghosts.forEach(function (ghost) {
                                ghost.update();
                            });
                            draw_margin();
                        }
                    }
                }
            } else {

                multiPlayer();
            }
        }
    }

    animate()
}
