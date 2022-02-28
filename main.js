Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90,
})
camera= document.getElementById("camera");
Webcam.attach('#camera');
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="capturedImage">'
    })

}
console.log("ml5 version : ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gydcg5ATOo/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function check(){
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResult);
}
function gotResult(error,result){
if(error){
    console.error(error);
}
else{
console.log(result)
document.getElementById("result_object_name").innerHTML= result[0].label;

prediction1= result[0].label;
toSpeak=""
if(prediction1=="amazing"){
toSpeak="This look amazing"
document.getElementById("result_object_gesture_icon").innerHTML="&#128076;"
}
else if(prediction1=="best"){
    toSpeak="All the best"
    document.getElementById("result_object_gesture_icon").innerHTML="&#128077;"
    }
    else if(prediction1=="victory"){
        toSpeak="That was the marvelous victory"
        document.getElementById("result_object_gesture_icon").innerHTML="&#9996;"
        }
speak();
}
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
utterThis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
}