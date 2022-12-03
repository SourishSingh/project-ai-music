song="";
leftWristX= 0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload()
{
 song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    Image(video , 0, 0, 600, 500);
    fill("#FF000");
    stroke("#FF000");

    circle(rightWristX,rightWristY,20);

    if(rightWristX>0 && rightWristY<= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristX>100 && rightWristY<= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristX>200 && rightWristY<= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristX>200 && rightWristY<= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    if(rightWristX>400 && rightWristY<= 500){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    if(scoreLeeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function gotPoses(){
    if(results.length>0){
        console.log(results);
        scoreLeeftWrist = results[0].pose.keypoint[9].score;
        console.log("scoreLeftWrist = "+scoreLeeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    }
}