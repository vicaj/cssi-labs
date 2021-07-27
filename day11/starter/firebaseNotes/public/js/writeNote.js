let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if(user){
                console.log(`Logged in as: ${user.displayName}`);
                document.querySelector("#welcome").innerHTML = `Welcome ${user.displayName}!`;
                googleUser = user;
                userId = googleUser.uid;

            }else{
                window.location = 'index.html';
            }
        });
}

const submitNote = () => {
    const note = document.querySelector("#noteText").value
    const title = document.querySelector("#noteTitle").value;
    const labels = document.querySelector("#labels").value;
    //let labelArray = labels.split(",")
    const today = new Date();
    const time = `${today.getHours()}:${today.getMinutes()}`

    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            note: note,
            time: time,
            //labels: labels
        }
    )
    .then(() => {
        document.querySelector("#noteText").value = ''
        document.querySelector("#noteTitle").value = ''
    })
    .catch(error => {
        console.log("Something bad happened...")
    })
};