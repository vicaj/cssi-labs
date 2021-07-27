window.onload = () => {
    //When page loads, check user logged in state
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            //If logged in, get user's notes from db
            //      Display notes on page
            const googleUserId = user.uid;
            username = user.displayName;
            getNotes(googleUserId)
        }else{
            //If not logged in, redirect to log in page
            window.location = 'index.html'
        }
    });
};

const getNotes = (userId) =>{
    console.log(userId);
    //Get user's notes from db
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value',snapshot =>{
        writeNotesToHtml(snapshot.val());
    });
};

const writeNotesToHtml = (data) =>{
    const noteRenderArea = document.querySelector("#app");
    for(let noteKey in data){
        //Create html string for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        noteRenderArea.innerHTML += noteHtml
    }
    //Put all html into page at once
}

const createHtmlForNote = (note) => {
    // TODO
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 50)+50;
    let l = Math.floor(Math.random() * 50)+50;

    return `<div class="column is-one-third">
                <div class="card" style="background-color: ${"hsl("+h+", "+s+"%, "+l+"%)"};">
                    <header class="card-header">
                        <p>${username}</p>
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                </div>
            </div>`;
}