const submitMessage = () =>{
    console.log("submitting message");
    const passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;
    
const errorMessage = () => {
    if(messageInput.length > 10){
        alert("This message is longer than 10 characters");
        return;
    }
    if(passcodeInput.value.seatch(/\[0-9]+\]/)===-1){

    }else{

    }

}

    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    passcodeInput.value='';
    messageInput.value='';
};

const sendMessageButton = document.querySelector('.button');
sendMessageButton.addEventListener('click',submitMessage);