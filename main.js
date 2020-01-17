// Initialize canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var activeRoom = new Room(5,5,0);

var scl = 0.02*canvas.height

var startScene = true

var seq = 0;

var startseq = 0;

if (canvas.height<canvas.width){

    scl = scl = 0.02*canvas.height

}else{

    scl = scl = 0.015*canvas.width
}

var roomMessage = ""

var message = ""

var songs = [
    "Mary had a...", 
    "Old MacDonald had a...", 
    "Carry on, carry on, as if...", 
    "Is this the real life? Is this...", 
    "Amazing Grace, how...", 
    "It's fun to stay at the...", 
    "Who you gonna call?"
]

var answers = [
    "little lamb", 
    "farm", 
    "nothing really matters", 
    "just fantasy", 
    "sweet the sound", 
    "ymca", 
    "ghostbusters"
]

var trivia = [
    "HISTORY-br-Who was the first Prime Minister of India? -br-(last name only)",
    "HISTORY-br-What country split off from India due to religious reasons?",
    "HISTORY-br-Fill in the blank: -br-Now I have become death, the...",
    "HISTORY-br-Name of the hurricanes that defended Japan from Mongol invaders?",
    "HISTORY-br-Name of Richard Nixon's cocker spaniel, the subject of a famous speech?",
    "GAMING-br-The SEGA jingle took up this PERCENTAGE of the original Sonic's cartridge memory.",
    "ANIME-br-How many dragon balls are there?-br-(NUMERICAL: i.e. '1' not 'one')",
    "ANIME-br-What kind of animal lives inside Naruto?-br-Give the general term for the real-world animal.",
    "MOVIES-br-Name the only other named member of Yoda's species.",
    "MOVIES-br-Name the only character to be played by the same actor in all 9 Star Wars films.-br-Ignore periods, hyphens, apostrophes, etc.",
    "MOVIES-br-Famous first words of Obi-Wan Kenobi in A New Hope?"
]

var trivianswers = [
    "nehru",
    "pakistan",
    "destroyer of worlds",
    "kamikaze",
    "checkers",
    "12.5",
    "7",
    "fox",
    "yaddle",
    "c3po",
    "hello there"
]

var rand = Math.floor(Math.random()*songs.length)

var randTriv = Math.floor(Math.random()*trivia.length)

// Load Audio
var perception = new Audio('./bensound-perception.mp3')
perception.volume = 0.4

var energy = new Audio('./bensound-energy.mp3')
energy.volume = 0.4;

var motion = new Audio('./bensound-endlessmotion.mp3')
motion.volume = 0.4

var dance = new Audio('./bensound-dance.mp3')
dance.volume = 0.4

var epic = new Audio('./bensound-epic.mp3')
epic.volume = 0.4

//Load logo
var logo = new Image()
logo.src = "./rooms-logo.png"

var click = new Audio('./click.mp3')

var blips = new Audio('./blips.mp3')
blips.volume = 0.8;

var laser = new Audio('./laser.mp3')

// Dimension constants
var CENT_X = canvas.width/2
var CENT_Y = canvas.height/2
    
var GR_SIZE = scl;
var L_PAD = CENT_X-GR_SIZE*activeRoom[0].length/2
var T_PAD = CENT_Y-GR_SIZE*activeRoom.length/2

// FUNCTIONSs
function Room(width, height){

    var Room = []

    for (a = 0; a<height; a++){ // Generate 2D Array

        var row = []

        for (b=0;b<width; b++){

            if (a === 0 || a === height-1){   
             
                var num = 1;
                row.push(num)
            }else{

                if (b === 0 || b === width-1){

                    var num = 1
                }else{

                    var num = 0
                }
                row.push(num)    
            }
        }
        Room.push(row) 
    }
    return Room;
}

function Enemy(){

   return {

    x: CENT_X + Math.random()*200-100,
    y: CENT_Y + Math.random()*200-100,
    r: scl/2,

    xspeed: scl/8*(Math.random()*10-5),
    yspeed: scl/8*(Math.random()*10-5),
}
}

function CollideRect(circ, rect){

    if (circ.x > rect.x -circ.r && circ.x < rect.x + rect.w +circ.r&& circ.y > rect.y-circ.r && circ.y < rect.y + rect.h+circ.r){
  
      return true;
  
    }else{
  
      return false;
    }
  }

function CollideCirc(circ, circ2){

    if (circ.x > circ2.x-circ2.r-circ.r && circ.x < circ2.x + circ2.r + circ.r && circ.y > circ2.y-circ2.r-circ.r && circ.y < circ2.y+circ2.r+circ.r){
  
        return true;
    
      }else{
    
        return false;
      }
}

// Password field
var PASSWORD = "A113"
  
var options = {
    canvas: canvas,
    fontSize: 25,
    fontFamily: 'Arial',
    fontColor: '#212121', 
    fontWeight: 'normal',
    width: 360,
    padding: 8,
    x: CENT_X-180,
    y: canvas.height-100,
    borderWidth: 5,
    borderColor: '#000',
    readonly: false,
    borderRadius: 1,
    boxShadow: '0px 0px 0px #fff',
    innerShadow: '0px 0px 0px rgba(0, 0, 0, 0.5)',
    placeHolder: 'Password? (all lower case)',
    onsubmit: function(){


        switch (this._value){

            case PASSWORD:
                console.log("correct")
                player.correct = true;
                break;
            
            case "idk":

                if (activeRoom === Rooms.ten){

                    if (randTriv === trivia.length-1){

                        randTriv = 0
                    }else{
                        randTriv += 1;
                    }
                    alert("Go the the sage for your new question.")


                }else{

                    alert("Oh no you're not, you can't cheat yourself out of this one.")
                }
               
                break;

            default:
                alert("Wrong Password")
                break;
        
        }
       
    }
}

var input = new CanvasInput(options)

function newInput(){
    input = new CanvasInput(options)
}

// Room list
const Rooms = {

    zero: new Room(20,20), 
    one: new Room(40,20), // The Password
    S: new Room(18,18),
    two: new Room(20,40), // The Parkour
    three: new Room(70,20), // The Parkour II
    four: new Room(30,30), // The Difficult Password
    five: new Room(40,40), // The Key
    K: new Room(20,40), 
    six: new Room(30,40), // The Missing Door
    seven: new Room(22,30), // The Shameless Plug
    eight: new Room(20,20), // The Maze
    nine: new Room(36,36), // The Impossible
    ten: new Room(16,32), // The Trivia
    eleven: new Room(40,40), // The Final
    final: new Room(20,40),

    A: new Room(26,20),
    B: new Room(20,30),
    C: new Room(30,20),
    D: new Room(20,20),
    E: new Room(30,16),
    F: new Room(40,30),
    G: new Room(20,20),
    H: new Room(46,20),
    I: new Room(20,20),

    Hall: new Room(40,8),
}
   
// Starting Room
activeRoom = Rooms.zero

// MAKE DOORS
for (i=0; i<4; i++){

    Rooms.zero[0][1+i] = 3; // 0 => 1

    Rooms.one[Rooms.one.length-2-i][0] = 5 // 1 => S (SECRET)
    Rooms.S[Rooms.S.length/2-2+i][Rooms.S[0].length-1] = 2 // S => 1

    Rooms.one[0][Rooms.one[0].length/2-2+i] = 3; // 1 => 2

    Rooms.two[0][Rooms.two[0].length/2-2+i] = 3; // 2 => 3

    Rooms.three[Rooms.three.length/2-2+i][Rooms.three[0].length-1] = 3; // 3 => 4
    Rooms.four[Rooms.four.length/2-2+i][Rooms.four[0].length-1] = 3; // 4 => 5

    Rooms.five[Rooms.five.length-1][Rooms.five[0].length-2-i] = 2; // 5 => K
    Rooms.K[0][1+i] = 2; // 5 => K

    Rooms.five[0][Rooms.five[0].length/2-2+i] = 3; // 5 => 6

    Rooms.six[0][Rooms.six[0].length/2-2+i] = 3.1; // 6 => 7 (TIME)

    Rooms.seven[0][Rooms.seven[0].length/2-2+i] = 3; // 1 => 2

    Rooms.eight[0][Rooms.eight[0].length/2-2+i] = 2; // 8 => E
    Rooms.E[Rooms.E.length-1][Rooms.E[0].length/2-2+i] = 2; // E => 8

    Rooms.E[Rooms.E.length/2-2+i][0] = 2.1; // E => B
    Rooms.B[Rooms.B.length/2-4+i][Rooms.B[0].length-1] = 2.1; // B => E

    Rooms.E[Rooms.E.length/2-2+i][Rooms.E[0].length-1] = 2.2; // E => F
    Rooms.F[Rooms.F.length/2-2+i][0] = 2.2; // F => E
    
    Rooms.eight[Rooms.eight.length/2-2+i][Rooms.eight[0].length-1] = 2.2; // 8 => G
    Rooms.G[Rooms.G.length/2-2+i][0] = 2.2; // G => 8

    Rooms.G[0][Rooms.G[0].length/2-2+i] = 2.1; // G => F
    Rooms.F[Rooms.F.length-1][Rooms.F[0].length/2-2+i] = 2.1; // G => F

    Rooms.G[Rooms.G.length-1][Rooms.G[0].length/2-2+i] = 2; // G => H
    Rooms.H[0][1+i] = 2; // H => G

    Rooms.H[Rooms.H.length/2-2+i][Rooms.H[0].length-1] = 2.1; // H => I
    Rooms.I[Rooms.I.length/2-2+i][0] = 2.1; // I => H

    Rooms.eight[Rooms.eight.length/2-2+i][0] = 2.1; // 8 => A
    Rooms.A[Rooms.A.length/2-2+i][Rooms.A[0].length-1] = 2.1; // A => 8

    Rooms.A[0][Rooms.A[0].length/2-2+i] = 2.2; // A => B
    Rooms.B[Rooms.B.length-1][Rooms.B[0].length/2-2+i] = 2.2; // B => A

    Rooms.B[Rooms.B.length/2-2+i][0] = 2; // B => C
    Rooms.C[Rooms.C.length/2-2+i][Rooms.C[0].length-1] = 2; // B => C

    Rooms.C[Rooms.C.length-1][1+i] = 2.1; // C => D
    Rooms.D[0][Rooms.D[0].length-2-i] = 2.1; // D => C

    Rooms.D[Rooms.D.length/2-2+i][0] = 3; // D => 9

    Rooms.nine[Rooms.nine.length-5-i][0] = 3; // 9 => 10

    Rooms.nine[0][Rooms.nine[0].length-14-i] = 5; // 9 => Hall
    Rooms.Hall[Rooms.Hall.length-1][Rooms.Hall[0].length-2-i] = 2; // Hall => 9

    Rooms.ten[Rooms.ten.length-1][Rooms.ten[0].length/2-2+i] = 3

    Rooms.eleven[Rooms.eleven.length-1][Rooms.eleven[0].length/2-2+i] = 3
}

// MAKE SAGES
Rooms.zero[2][Rooms.zero[0].length-3] = 7

Rooms.one[2][Rooms.one[0].length/2-4] = 7

Rooms.S[Rooms.S.length-3][3] = 7

Rooms.two[Rooms.two.length-3][Rooms.two[0].length-5] = 7

Rooms.three[5][Rooms.three[0].length-3] = 7

Rooms.four[3][Rooms.four[0].length-3] = 7

Rooms.five[Rooms.five.length-3][Rooms.five[0].length-7] = 7

Rooms.six[Rooms.six.length-4][Rooms.six[0].length-4] = 7

Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7
Rooms.seven[Math.floor(Math.random()*(Rooms.seven.length-2))+1][Math.floor(Math.random()*(Rooms.seven[0].length-4))+2] = 7

Rooms.nine[2][Rooms.nine[0].length-4] = 7

Rooms.Hall[3][3] = 7

Rooms.ten[Rooms.ten.length-3][4] = 7

Rooms.eleven[Rooms.eleven.length-3][Rooms.eleven[0].length-15] = 7

// FIREWALLS
for (i=0;i<12;i++){

    for (c=0;c<3;c++){

        Rooms.two[Rooms.two.length-6-c*10][1+i] = 6;

        Rooms.two[Rooms.two.length-11-c*10][Rooms.two[0].length-2-i] = 6;

        Rooms.three[1+i][12+c*18] = 6

        Rooms.three[Rooms.three.length-2-i][21+c*18] = 6  
    }

    Rooms.K[Rooms.K.length/2][1+i] = 6

    Rooms.K[Rooms.K.length/2+5][Rooms.K[0].length-2-i] = 6
}

for(i=0;i<60;i++){

    Rooms.nine[Math.floor(Math.random()*(Rooms.nine.length-4))+2][Math.floor(Math.random()*(Rooms.nine[0].length-4))+2] = 6
}

// Player
const player = {

    x: CENT_X,
    y: CENT_Y,
    r: scl/2,

    xspeed: 0,
    yspeed: 0,

    correct: false,
    dead: false,

    asking: false,

    hasKey: false,

    paused: false,

    invicible: false
}

const Key = {

    x: CENT_X-(Rooms.K[0].length/2-3)*GR_SIZE,
    y: CENT_Y+(Rooms.K.length/2-4)*GR_SIZE,

    w: GR_SIZE,
    h: GR_SIZE
}

var enemRange = [0,0];

var Enemies = []

for (t=0;t<70;t++){

    var n = new Enemy
    Enemies.push(n)
}
// Controller
const controller = {

    left:false,
    right:false,
    up:false,
    down: false,
    space: false,
    keyListener:function(event) {
  
      var key_state = (event.type == "keydown")?true:false;
  
      switch(event.keyCode) {
  
        case 37:// left key
          controller.left = key_state;
          break;
        case 38:// up key
          controller.up = key_state;
          break;
        case 39:// right key
          controller.right = key_state;
          break;
        case 40: // down key
          controller.down = key_state;
          break;
        case 32: // space bar
          controller.space = key_state;
          break;
      }
    }
}

// LOOP LOOP LOOP LOOP
const loop = () => {

    message = roomMessage

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Reassign constants
    CENT_X = canvas.width/2
    CENT_Y = canvas.height/2
    
    GR_SIZE = scl;
    L_PAD = CENT_X-GR_SIZE*activeRoom[0].length/2
    T_PAD = CENT_Y-GR_SIZE*activeRoom.length/2

    // Move player
    if (controller.up){

        player.yspeed -= scl*0.03;
        player.paused = false;
    }
    if (controller.down){

        player.yspeed += scl*0.03;
        player.paused = false;
    }
    if (controller.left){

        player.xspeed -= scl*0.03;
        player.paused = false;
    }
    if (controller.right){

        player.xspeed += scl*0.03;
        player.paused = false;
    }

    if (controller.space){

        player.paused = true;
    }
    
    if (player.paused){

        player.xspeed = 0;
        player.yspeed = 0;
    }

    player.x += player.xspeed
    player.y += player.yspeed
    player.xspeed*=0.9
    player.yspeed *= 0.9
  
    // Establish bounds

    function leftEnd(room){

        var leftEnd = CENT_X - GR_SIZE*(room[0].length/2-1) +player.r+GR_SIZE;

        return leftEnd
    }

    function rightEnd(room){
        var rightEnd = CENT_X + GR_SIZE*(room[0].length/2-1)-player.r-GR_SIZE

        return rightEnd
    }

    function topEnd(room){

        var topEnd = CENT_Y - GR_SIZE*(room.length/2-1)+player.r+GR_SIZE

        return topEnd
    }

    function bottomEnd(room){

        var bottomEnd = CENT_Y + GR_SIZE*(room.length/2-1)-player.r-GR_SIZE

        return bottomEnd

    }

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height)
        
    // GRID
    for (i = 0; i <activeRoom.length; i++){

        for (j=0; j<activeRoom[0].length; j++){ 

            var tile = {

                x: L_PAD+j*GR_SIZE-15,
                y: T_PAD+i*GR_SIZE-15,

                w: GR_SIZE+30,
                h: GR_SIZE+30
            }

            var fit = {

                x: L_PAD+j*GR_SIZE,
                y: T_PAD+i*GR_SIZE,

                w: GR_SIZE,
                h: GR_SIZE
            }

            var wide = {

                x: L_PAD+j*GR_SIZE-30,
                y: T_PAD+i*GR_SIZE-30,

                w: GR_SIZE+60,
                h: GR_SIZE+60
            }

            switch(activeRoom[i][j]){

                case 0: // Empty Space
                    ctx.fillStyle = "#F0F0F0"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE*1.1, GR_SIZE*1.1)
                    break;

                case 1: // Wall
                    ctx.fillStyle = "black"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    break;

                case 2: // Door 1
                    ctx.fillStyle = "gold"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    if (CollideRect(player, tile)){

                        click.play()

                        switch (activeRoom){

                            case Rooms.S:
                                activeRoom = Rooms.one
                                player.x = leftEnd(Rooms.one)
                                player.y = bottomEnd(Rooms.one)
                                break;
                            case Rooms.five:
                                activeRoom = Rooms.K
                                player.x = leftEnd(Rooms.K)
                                player.y = topEnd(Rooms.K)
                                break;
                            case Rooms.K:
                                activeRoom = Rooms.five
                                player.x = rightEnd(Rooms.five)
                                player.y = bottomEnd(Rooms.five)
                                break
                            case Rooms.eight:
                                activeRoom = Rooms.E
                                player.x = CENT_X
                                player.y = bottomEnd(Rooms.E)
                                break;
                            case Rooms.E:
                                activeRoom = Rooms.eight
                                player.x = CENT_X
                                player.y = topEnd(Rooms.E)
                                break;
                            case Rooms.B:
                                activeRoom = Rooms.C
                                player.x = rightEnd(Rooms.C)
                                player.y = CENT_Y
                                break;
                            case Rooms.C:
                                activeRoom = Rooms.B
                                player.x = leftEnd(Rooms.B)
                                player.y = CENT_Y
                                break;
                            case Rooms.G:
                                activeRoom = Rooms.H
                                player.x = leftEnd(Rooms.H)
                                player.y = topEnd(Rooms.H)
                                break;
                            case Rooms.H:
                                activeRoom = Rooms.G
                                player.x = rightEnd(Rooms.G)
                                player.y = bottomEnd(Rooms.G)
                                break;
                            case Rooms.Hall:
                                activeRoom = Rooms.nine
                                player.x = rightEnd(Rooms.nine)
                                player.y = topEnd(Rooms.nine)
                                break;
                        }      
                    }
                    break;

                case 2.1: // Door 2
                    ctx.fillStyle = "gold"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    if (CollideRect(player, tile)){

                        click.play()

                        switch (activeRoom){

                            case Rooms.eight:
                                activeRoom = Rooms.A
                                player.x = rightEnd(Rooms.A)
                                player.y = CENT_Y
                                break;
                            case Rooms.A:
                                activeRoom = Rooms.eight
                                player.x = leftEnd(Rooms.eight)
                                player.y = CENT_Y
                                break; 
                            case Rooms.E:
                                activeRoom = Rooms.B
                                player.x = rightEnd(Rooms.B)
                                player.y = CENT_Y
                                break; 
                            case Rooms.B:
                                activeRoom = Rooms.E
                                player.x = leftEnd(Rooms.E)
                                player.y = CENT_Y
                                break; 
                            case Rooms.C:
                                activeRoom = Rooms.D
                                player.x = rightEnd(Rooms.D)
                                player.y = topEnd(Rooms.D)
                                break; 
                            case Rooms.D:
                                activeRoom = Rooms.C
                                player.x = leftEnd(Rooms.C)
                                player.y = bottomEnd(Rooms.C)
                                break; 
                            case Rooms.G:
                                activeRoom = Rooms.F
                                player.x = CENT_X
                                player.y = bottomEnd(Rooms.F)
                                break; 
                            case Rooms.F:
                                activeRoom = Rooms.G
                                player.x = CENT_X
                                player.y = topEnd(Rooms.G)
                                break; 
                            case Rooms.H:
                                activeRoom = Rooms.I
                                player.x = leftEnd(Rooms.I)
                                player.y = CENT_Y
                                break; 
                            case Rooms.I:
                                activeRoom = Rooms.H
                                player.x = rightEnd(Rooms.H)
                                player.y = CENT_Y
                                break; 
                           
                        }      
                    }
                    break;

                case 2.2: // Door 2
                    ctx.fillStyle = "gold"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    if (CollideRect(player, tile)){

                        click.play()

                        switch (activeRoom){

                            case Rooms.eight:
                                activeRoom = Rooms.G
                                player.x = leftEnd(Rooms.G)
                                player.y = CENT_Y
                                break;
                            case Rooms.G:
                                activeRoom = Rooms.eight
                                player.x = rightEnd(Rooms.G)
                                player.y = CENT_Y
                                break;
                            case Rooms.A:
                                activeRoom = Rooms.B
                                player.x = CENT_X
                                player.y = bottomEnd(Rooms.B)
                                break;
                            case Rooms.B:
                                activeRoom = Rooms.A
                                player.x = CENT_X
                                player.y = topEnd(Rooms.A)
                                break;
                            case Rooms.F:
                                activeRoom = Rooms.E
                                player.x = rightEnd(Rooms.E)
                                player.y = CENT_Y
                                break;
                            case Rooms.E:
                                activeRoom = Rooms.F
                                player.x = leftEnd(Rooms.F)
                                player.y = CENT_Y
                                break;
                            case Rooms.Hall:
                                activeRoom = Rooms.nine
                                player.x = leftEnd(Rooms.nine)
                                player.y = bottomEnd(Rooms.nine)
                                break;
                          
                    
                        }      
                    }
                    break;

                case 3: // Next Level Door

                    ctx.fillStyle = "magenta";
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    
                    if (CollideRect(player, tile)){

                        
                        if (activeRoom != Rooms.one && 
                            activeRoom != Rooms.four &&
                            activeRoom != Rooms.five &&
                            activeRoom != Rooms.ten &&
                            activeRoom != Rooms.eleven){
                            
                            click.play()
                        }
                        
                        switch (activeRoom){

                            case Rooms.zero:
                                activeRoom = Rooms.one
                                player.x = rightEnd(Rooms.one)
                                player.y = bottomEnd(Rooms.one)
                                break;
                            case Rooms.one:
                                player.asking = true;

                                if (player.correct){
                                    click.play()
                                    activeRoom = Rooms.two
                                    player.x = CENT_X
                                    player.y = bottomEnd(Rooms.two)
                                }    
                                break;
                            case Rooms.two:
                                activeRoom = Rooms.three
                                player.x = leftEnd(Rooms.three)
                                player.y = bottomEnd(Rooms.three)
                                break;
                            case Rooms.three:
                                activeRoom = Rooms.four
                                player.x = leftEnd(Rooms.four)
                                player.y = CENT_Y
                                break;
                            case Rooms.four:

                                player.asking = true
                                
                                if (player.correct){
                                    click.play()
                                    activeRoom = Rooms.five
                                    player.x = leftEnd(Rooms.five)
                                    player.y = CENT_Y
                                } 
                                break;
                            case Rooms.five:
                                if (player.hasKey){

                                    click.play()
                                    activeRoom = Rooms.six
                                    player.x = CENT_X
                                    player.y = bottomEnd(Rooms.six)
                                    seq=-1
                                    player.hasKey = false

                                }else{

                                    message = "Do you have the key?"   
                                }             
                                break;
                            case Rooms.seven:
                                activeRoom = Rooms.eight
                                player.x = CENT_X
                                player.y = bottomEnd(Rooms.eight)
                                break;
                            case Rooms.D:
                                activeRoom = Rooms.nine
                                player.x = rightEnd(Rooms.nine)
                                player.y = topEnd(Rooms.nine)
                                break;
                            case Rooms.nine:
                                player.invincible = false
                                activeRoom = Rooms.ten
                                player.x = rightEnd(Rooms.ten)
                                player.y = topEnd(Rooms.ten)
                                break;
                            case Rooms.ten:
                                player.asking = true
                                if (player.correct){
                                    click.play()
                                    activeRoom = Rooms.eleven
                                    player.x = CENT_X
                                    player.y = topEnd(Rooms.eleven)
                                } 
                                break;
                            case Rooms.eleven:
                                player.asking = true
                                if (player.correct){
                                    click.play()
                                    activeRoom = Rooms.final
                                    player.x = CENT_X
                                    player.y = topEnd(Rooms.final)
                                } 
                                break;
                            
                        }
                    }else{

                        setTimeout(()=>{
                            player.asking = false

                        },1000)
                        
                    }                 
                    break;  

                case 3.1: // Time Door

                if (seq>12){

                    ctx.fillStyle = "magenta";
                    if (CollideRect(player, tile)){

                        activeRoom = Rooms.seven
                        player.x = CENT_X
                        player.y = bottomEnd(Rooms.seven)
                    }
                }else{

                    ctx.fillStyle = "black";
                }

                ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    break;


                case 5: // Secret Door

                    if (CollideRect(player, wide)){

                        ctx.fillStyle = "gold"
                    }else{

                        ctx.fillStyle = "black"
                    }
                    
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)

                    if (CollideRect(player, tile)){
                        click.play()

                        switch (activeRoom){
                            case Rooms.one:
                                activeRoom = Rooms.S
                                player.x = rightEnd(Rooms.S)
                                player.y = CENT_Y
                                break;
                            case Rooms.nine:
                                activeRoom = Rooms.Hall
                                player.x = rightEnd(Rooms.Hall)
                                player.y = bottomEnd(Rooms.Hall)
                                break;
                        }
                       

                    }
                            
                    break;

                case 6: // Firewall
                    ctx.fillStyle = "red"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)

                    if (CollideRect(player, fit) && !player.invincible){

                        laser.play()

                        player.dead = true;                       
                    }            
                        
                    break;

                case 6.1: // Fake Firewall
                    ctx.fillStyle = "red"
                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE)
                    break;

                case 7: // Sage

                    if (CollideRect(player,tile)){

                        blips.play()
                        ctx.fillStyle = "#D300C3"

                       
                        switch (activeRoom){

                            case Rooms.zero:
                                message = "I am a sage. Visit some of my friends for more life-changing advice."
                                break;
                            case Rooms.one:
                                message = "The answers to life's questions are often hidden just around the corner."
                                break;
                            case Rooms.S:
                                message = `PASSWORD HINT:-br-${songs[rand]}`
                                break;
                            case Rooms.two:
                                message = "Endurance in the face of failure is a valuable asset."
                                break;
                            case Rooms.three:
                                message = "Such resilience is difficult to find."
                                break;
                            case Rooms.four:
                                message = "The password is hidden within you."
                                break;
                            case Rooms.five:
                                message = "Sometimes, life presents with you with a unique situation in which there are no shortcuts."
                                break;
                            case Rooms.six:
                                message = "One sometimes wonders if patience is simply the greatest virtue of them all."
                                break;
                            case Rooms.seven:
                                message = "HEEWON AHN -br-WEB: heewon.site -br-IG: shelost.off -br-EMAIL: shelost.off@gmail.com"
                                break;
                            case Rooms.nine:
                                message = "Life has a tendency to provide-br-you with a way around your problems."
                                break;
                            case Rooms.Hall:
                                message = "Here's some invincibility."
                                player.invincible = true;
                                break;
                            case Rooms.ten:
                                message = `${trivia[randTriv]}-br--br-(You can type 'idk' to get another question)`
                                break;
                            case Rooms.eleven:
                                message = "Remind me... what was the password for Room 1 again?"
                                break;
                        }

                    }else{

                        ctx.fillStyle = "magenta"
                    }

                    ctx.fillRect(L_PAD+j*GR_SIZE, T_PAD+i*GR_SIZE, GR_SIZE, GR_SIZE) 
                break;


            }       
        }
    }

    // Player Boundaries
    if (player.x < leftEnd(activeRoom)-GR_SIZE){
 
        player.x = leftEnd(activeRoom)-GR_SIZE

    }else if (player.x > rightEnd(activeRoom)+GR_SIZE){

        player.x = rightEnd(activeRoom)+GR_SIZE
    }

    if (player.y < topEnd(activeRoom)-GR_SIZE){

        player.y = topEnd(activeRoom)-GR_SIZE

    }else if (player.y > bottomEnd(activeRoom)+GR_SIZE){

        player.y = bottomEnd(activeRoom)+GR_SIZE
    }

    // Render player
    ctx.fillStyle = "royalblue"
      ctx.beginPath()
      ctx.arc(player.x, player.y, player.r, 0, Math.PI*2)
      ctx.fill()


    if (player.invincible){

        ctx.strokeStyle = "cyan"
        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.arc(player.x, player.y, player.r+scl/2, 0, Math.PI*2)
        ctx.stroke()
    }

    // KEY
    if (activeRoom === Rooms.K || player.hasKey){

        ctx.fillStyle = "goldenrod"
        ctx.fillRect(Key.x, Key.y, Key.w, Key.h)
    }else{

        player.hasKey = false
    }

    // Player gains key upon contact
    if (CollideRect(player,Key) && activeRoom === Rooms.K){

        player.hasKey = true
    }

    // Key moves w player
    if (player.hasKey){

        Key.x = player.x
        Key.y = player.y
    }else{

        Key.x = CENT_X-(Rooms.K[0].length/2-3)*GR_SIZE
        Key.y = CENT_Y+(Rooms.K.length/2-4)*GR_SIZE
    }

    // Enem ranges, messages, music
    switch (activeRoom){
    
        case Rooms.zero:
            roomMessage = "11 ROOMS-br-By Heewon Ahn-br- -br-HOW TO PLAY:-br-    Use the doors to transverse between rooms.-br-    MAGENTA doors => next room-br-    GOLDEN doors => different parts of same room-br- -br-PRO TIP:-br-    Press space to pause.-br-    Use the pause feature to your advantage.-br-    Password fields still work when paused."
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break
        case Rooms.one:
            enemRange = [0,2] 
            PASSWORD = answers[rand]     
            roomMessage = "ROOM 1:-br-The Password"
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break;
        case Rooms.S:
            enemRange = [68,68] 
            PASSWORD = answers[rand]     
            roomMessage = "ROOM 1:-br-The Password"
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break;
        case Rooms.two:
            enemRange = [3,4]
            roomMessage = "ROOM 2:-br-The Parkour"
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break;
        case Rooms.three:
            enemRange = [5,8]
            roomMessage = "ROOM 3:-br-The Parkour II"
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break;
        case Rooms.four:
            enemRange = [9,10]    
            roomMessage = "ROOM 4:-br-The Difficult Password"
            PASSWORD = "hidden within you"
            dance.pause(); energy.play(); motion.pause(); epic.pause()
            break;
        case Rooms.five:
            enemRange = [11,16]
            roomMessage = "ROOM 5:-br-The Key"
            dance.pause(); energy.play(); motion.pause(); epic.pause()
            break;
        case Rooms.K:
            enemRange = [17,19]
            roomMessage = "ROOM 5:-br-The Key"
            dance.pause(); energy.play(); motion.pause(); epic.pause()
            break;
        case Rooms.six:
            enemRange = [20,24]
            roomMessage = "ROOM 6:-br-The Missing Door"
            dance.pause(); energy.play(); motion.pause(); epic.pause()
            player.hasKey = false
            break;
        case Rooms.seven:
            enemRange = [23,25]
            roomMessage = "ROOM 7:-br-The Shameless Plug"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.eight:
            enemRange = [26,27]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.A:
            enemRange = [28,28]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.B:
            enemRange = [29,29]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.C:
            enemRange = [30,30]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.D:
            enemRange = [31,31]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.E:
            enemRange = [32,32]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.F:
            enemRange = [33,33]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.G:
            enemRange = [34,34]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.H:
            enemRange = [35,35]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.I:
            enemRange = [36,36]
            roomMessage = "ROOM 8:-br-The Maze"
            dance.pause(); energy.pause(); motion.play(); epic.pause()
            break;
        case Rooms.nine:
            enemRange = [37,55]
            roomMessage = "ROOM 9:-br-The Impossible"
            dance.pause(); energy.pause(); motion.pause(); epic.play()
            break;
        case Rooms.Hall:
            enemRange = [56,56]
            roomMessage = "ROOM 9:-br-The Impossible"
            dance.pause(); energy.pause(); motion.pause(); epic.play()
            break;
        case Rooms.ten:
            PASSWORD = trivianswers[randTriv]
            enemRange = [57,57]
            roomMessage = "ROOM 10:-br-The Trivia"
            dance.pause(); energy.pause(); motion.pause(); epic.play()
            break;
        case Rooms.eleven:
            PASSWORD = answers[rand]
            enemRange = [58,63]
            roomMessage = "ROOM 11:-br-The Final"
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break;
        case Rooms.final:
            enemRange = [64,64]
            roomMessage = "Good Job!-br-Thank you for playing 11 ROOMS.-br--Heewon-br--br-All music is courtesy of-br-bensound.com"
            dance.play(); energy.pause(); motion.pause(); epic.pause()
            break;
    }

    // ENEMIES
    if (activeRoom != Rooms.zero){
    for (f=enemRange[0]; f<enemRange[1]+1; f++){

        var enem = Enemies[f]

        if (enem.xspeed >= 0){

            enem.xspeed += scl*0.03;
        }else{
    
            enem.xspeed -= scl*0.03;
        }
       if (enem.yspeed >= 0){
    
        enem.yspeed += scl*0.03;
       }else{
    
        enem.yspeed -= scl*0.03;
       }

       if (player.paused){

        enem.xspeed = 0;
        enem.yspeed = 0;
       }

        enem.x += enem.xspeed
        enem.y += enem.yspeed
    
        enem.xspeed *= 0.9;
        enem.yspeed *= 0.9;

        // Enem boundaries
        if (enem.x < leftEnd(activeRoom)-GR_SIZE){
 
            enem.x = leftEnd(activeRoom)-GR_SIZE
            enem.xspeed *= -1;
    
        }else if (enem.x > rightEnd(activeRoom)+GR_SIZE){
    
            enem.x = rightEnd(activeRoom)+GR_SIZE
            enem.xspeed *= -1;
        }
    
        if (enem.y < topEnd(activeRoom)-GR_SIZE){
    
            enem.y = topEnd(activeRoom)-GR_SIZE
            enem.yspeed *= -1;
    
        }else if (enem.y > bottomEnd(activeRoom)+GR_SIZE){
    
            enem.y = bottomEnd(activeRoom)+GR_SIZE
            enem.yspeed *= -1;
        }

        // Render enemies
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(enem.x, enem.y, enem.r, 0, Math.PI*2)
        ctx.fill()

        if (CollideCirc(player, enem) && !player.invincible){

            laser.play()
            player.dead = true;  
        }
    }

    // Handle death
    if (player.dead){

        switch (activeRoom){

            case Rooms.one:
                player.x = rightEnd(Rooms.one)
                player.y = bottomEnd(Rooms.one)
                break
            case Rooms.S:
                activeRoom = Rooms.one
                player.x = rightEnd(Rooms.one)
                player.y = bottomEnd(Rooms.one)
                break
            case Rooms.two:
                player.x = CENT_X
                player.y = bottomEnd(Rooms.two)
                break
            case Rooms.three:
                player.x = leftEnd(Rooms.three)
                player.y = bottomEnd(Rooms.three)
                break
            case Rooms.four:
                player.x = leftEnd(Rooms.four)
                player.y = CENT_Y
                break
            case Rooms.five:
                player.x = leftEnd(Rooms.five)
                player.y = CENT_Y
                break
            case Rooms.K:
                activeRoom = Rooms.five
                player.x = leftEnd(Rooms.five)
                player.y = CENT_Y
                break
            case Rooms.six:
                player.x = CENT_X
                player.y = bottomEnd(Rooms.six)
                break
            case Rooms.seven:
                player.x = CENT_X
                player.y = bottomEnd(Rooms.seven)
                break
            case Rooms.eight:
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.A:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.B:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.C:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.D:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.E:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.F:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.G:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.H:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.I:
                activeRoom = Rooms.eight
                player.x = CENT_X
                player.y = bottomEnd(Rooms.eight)
                break
            case Rooms.nine:
                player.x = rightEnd(Rooms.nine)
                player.y = topEnd(Rooms.nine)
                break
            case Rooms.Hall:
                activeRoom = Rooms.nine
                player.x = rightEnd(Rooms.nine)
                player.y = topEnd(Rooms.nine)
                break
            case Rooms.ten:
                player.x = rightEnd(Rooms.ten)
                player.y = topEnd(Rooms.ten)
                break
            case Rooms.eleven:
                player.x = CENT_X
                player.y = topEnd(Rooms.eleven)
                break
            case Rooms.final:
                player.x = CENT_X
                player.y = CENT_Y
                break
        }

        player.dead = false;  
        player.hasKey = false;
    }
}
    // Render password field
    if (player.asking){

        input.render()
        if (player.correct){

            input.destroy()
            newInput()
            player.correct = false;
            player.asking = false;
        }
    }

    // Render message
    var m = message.split("-br-")

    for (k=0;k<m.length;k++){

        ctx.fillStyle = "black"
        ctx.font = "20px Arial"
        ctx.fillText(m[k],30,50+k*30)
    }

    // Render PAUSE message
    if (player.paused){

        ctx.fillStyle = "black"
        ctx.font = "30px Arial"
        ctx.fillText("PAUSED", canvas.width-150, 50)

        ctx.fillStyle = "gray"
        ctx.font = "20px Arial"
        ctx.fillText("Move player to resume", canvas.width-230, 80)
    }

    if (startScene){

        ctx.fillStyle = "white"
        ctx.fillRect(0,0,canvas.width, canvas.height)

        if (startseq <1){
            ctx.globalAlpha = startseq
        }else if (startseq >2){
            ctx.globalAlpha = 3- startseq
        }
        ctx.drawImage(logo, CENT_X - logo.width/20, CENT_Y-logo.height/20, logo.width/10, logo.height/10)
    }

    window.requestAnimationFrame(loop)
}

setInterval(()=>{

    seq += 1
}, 1000)

setInterval(()=>{

    startseq += 0.1
}, 100)

setTimeout(()=>{
    startScene = false
},3000)

window.requestAnimationFrame(loop)
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)