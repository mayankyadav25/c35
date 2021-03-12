//balls position should be synchronised in every browser in this game we are using realtime database databse is a place where we can store multiple values and we can further use them in code
var ball;
var database;
var position;
//firebase is a platform developed by google for creating mobile and web applications
//database is helping us to generate some configutation keys which we use index.html which helps our database to connect with the code
//we create nodes/roots in databse 
//we use some variables and through these variables we add some data in databas and acces the data from the database

function setup(){
    //here we are setting up the database with the help of firebase.database function
    database=firebase.database();

    createCanvas(500,500);
    ball=createSprite(250,250,10,10);
//.ref is used to refer the location in database,from this location i want to continously read x and y values
    var ballref=database.ref('ball/position');
    //.on function is used to read the values or to continously listen to the values;

    //that value is a predefined string that we need to pass
    ballref.on("value",readop,showerror);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
//to write the data into the database again we need to refer to the location of the child or node
//.set is used to set the values in the database 
//anything we have to wright or read from database should be in json format
function writePosition(x,y){
    database.ref('ball/position').set({
        x:position.x+x,
        y:position.y+y
    })
    

    
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
//this data is a parameter which means we can store some value inside it (value which we are reading from database)
function readop(data){
    //that data.val is used to extract the data from database
position=data.val();
ball.x=position.x;
ball.y=position.y;
}
function showerror(){
    console.log("error");
}