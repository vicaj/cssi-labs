let counter = 3;
const getMessages = () => {
    const messageRef = firebase.database().ref();
    messageRef.on('value',(snapshot) => {
        const data = snapshot.val();
        const passcodeAttempt = document.querySelector("#passcode").value;
        let display = false;

        for(const recordKey in data){
            //console.log(recordKey);
            //console.log(data[recordKey]);

            const record = data[recordKey];
            const storedPasscode = record.passcode;

            if(passcodeAttempt === storedPasscode){
                console.log(`Message is: ${record.message}`);
                rederMessageAsHtml(record.message);
                display = true;
            }
        }
        if(counter < 1){
            alert("You have no more attempts.");
        }else if(display == false){
            alert(`Passcode is incorrect! You have ${counter} more tries.`);
            counter--;
        }

    });
}


const rederMessageAsHtml = (message) => {
    const passCodeInput = document.querySelector("#passcode");
    passCodeInput.value = "";

    const messageDisplay = document.querySelector("#message");
    messageDisplay.innerHTML = message;
}