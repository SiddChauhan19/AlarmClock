var clockFace = document.getElementById('clock-face');
var setAlarm = document.getElementById('setalm');
var alarmContainer = document.getElementById('alarm-container');
var hours = document.getElementById('hour');
var minutes = document.getElementById('min');
var second = document.getElementById('sec');
var ampm = document.getElementById('ampm');

var alarmInterval; // Variable to store the interval ID for the alarm check//CHANGE1


//to display the current Time
var currentTime = setInterval(function () {//to show every new second on screen by calling the function after every 1 sec
    const today = new Date();
    var h = formatTime(today.getHours());
    var m = formatTime(today.getMinutes());
    var s = formatTime(today.getSeconds());
    var ampm = h < 12 ? 'AM' : 'PM'//to show AM/PM
    // checkAlarm(h, m, s, ampm);
    //2 ways to display
    //method 1:
    // clockFace.innerHTML =+ h.toString() + ":" + m.toString() + ":" + s.toString();//to show time
    clockFace.innerHTML = `${h}:${m}:${s}${ampm}`;//method 2
}, 1000);

//formatting time in 2 digits if less than 10
function formatTime(time) {
    if (time < 10)
        return "0" + time;
    return time;
}


//To set the alarm
setAlarm.addEventListener('click', function () {
    if (hours.value !== '' && minutes.value !== '' && second.value !== '' && ampm.value !== '') {

        // Determine the AM/PM value based on the hours entered
        if (parseInt(hours.value) >= 12) {
            ampm.value = 'PM';
        } else {
            ampm.value = 'AM';
        }
        // console.log("MYTIME:" + formatTime(hours.value) + ":" + formatTime(minutes.value) + ":" + formatTime(second.value) + ampm.value);
        var alarmTime = formatTime(hours.value) + ":" + formatTime(minutes.value) + ":" + formatTime(second.value) + ampm.value;

        // new li everytime for newly added alarm
        var newLi = document.createElement("li");

        //'Delete' button for the newly added alarm.
        var delbutton = document.createElement('button');//dynamic delete button
        var delText = document.createTextNode(`Delete`);
        delbutton.appendChild(delText);

        // Create text nodes for the time entered in the input fields and the am/pm value.
        var liText = document.createTextNode(`${formatTime(hours.value)}:${formatTime(minutes.value)}:${formatTime(second.value)}${ampm.value}`);

        // Clear the input fields after creating the new alarm.
        hours.value = '';
        minutes.value = '';
        second.value = '';

        // Add the time text node and the 'Delete' button to the new <li> element.
        newLi.appendChild(liText);
        newLi.appendChild(delbutton);
        alarmContainer.appendChild(newLi);

        // Get newly created 'Delete' button from newly added <li> element.
        var deleteButton = newLi.querySelector('button');
        delbutton.setAttribute('class', 'btn btn-outline-danger');
        //adding eventlistner to delete button onclick
        deleteButton.addEventListener('click', function () {
            // alarmContainer.removeChild(newLi);
            deleteAlarm(newLi);
        });

        //*********************************************************** */
        //Alert alarm when TIme Matches
        alarmInterval = setInterval(function () {
            const today = new Date();
            var h = formatTime(today.getHours());
            var m = formatTime(today.getMinutes());
            var s = formatTime(today.getSeconds());
            var ampm = h < 12 ? 'AM' : 'PM'//to show AM/PM
            var currentTime = clockFace.innerHTML = h + ":" + m + ":" + s + ampm;

            if (alarmTime == currentTime) {
                console.log("HEYY");
                alert("Time up");
            }
        }, 1000);
    }
});

//Function to delete alarm
function deleteAlarm(alarmElement) {
    // Stop the alarm interval when an alarm is deleted
    clearInterval(alarmInterval);
    alarmContainer.removeChild(alarmElement);
}