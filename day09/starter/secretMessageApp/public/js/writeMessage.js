const submitMessage = () =>{
    console.log("submitting message");
    const passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    passcodeInput.value='';
    messageInput.value='';
};

const sendMessageButton = document.querySelector('.button');
sendMessageButton.addEventListener('click',submitMessage);