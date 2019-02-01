document.addEventListener("DOMContentLoaded", event => {
        try {
          let app = firebase.app();
        
        } catch (e) {
          console.error(e);
        }
});

var retrievedUserObj = {} //obietul in care tinem datele clientului retrieved de la baza de date
var bestUsers = {} //obiectul in care tinem userii ordonati descrescator dupa highscore
var userDocID;

function change_div(div1, div2)
{
   d1 = document.getElementById(div1);
   d2 = document.getElementById(div2);
   if( d2.style.display = "none" )
   {
      d1.style.display = "none";
      d2.style.display = "block";
   }
   else
   {
      d1.style.display = "block";
      d2.style.display = "none";
   }
}

function addUser(uid, name, mail, photoUrl) {
    let db = firebase.firestore();
    
    if (name == null) {
        var str = mail
        name = str.split("@")[0]
    }

    db.collection("users").add({
        uid: uid,
        name: name,
        mail: mail,
        kills: 0,
        highscore: 0,
        deaths: 0,
        photoUrl: photoUrl
    })
    
    /*retrievedUserObj = {
        uid: uid,
        name: name,
        highscore: 0,
        deaths: 0,
        kills: 0,
        photoUrl: photoUrl
    }*/
    
    db.collection("users").where("uid", "==", uid).get()
        .then(users => {

         retrievedUserObj = {
                uid: users.docs[0].data().uid,
                name: users.docs[0].data().name,
                highscore: users.docs[0].data().highscore,
                deaths: users.docs[0].data().deaths,
                kills: users.docs[0].data().kills,
                photoUrl: users.docs[0].data().photoUrl
            }
        
            userDocID = users.docs[0].id; 
            console.log("RETRIEVVED IN ADDUSER", retrievedUserObj)
        });
}

function getUser(uid, name, mail, photoUrl) {
    let db = firebase.firestore(); 
    
    db.collection("users").where("uid", "==", uid).get()
        .then(users => {
            /*
            users.forEach(doc => {
                console.log(doc.data())
            })
            */
//console.log("SUNTEM IN THEN")
            console.log(users.docs[0].data(), users.docs[0].data().kills) //luam doar primul document pt ca merreu AR TREBUI SA FIE unul singur doar cu uid-ul respectiv
            retrievedUserObj = {
                uid: users.docs[0].data().uid,
                name: users.docs[0].data().name,
                highscore: users.docs[0].data().highscore,
                deaths: users.docs[0].data().deaths,
                kills: users.docs[0].data().kills,
                photoUrl: users.docs[0].data().photoUrl
            }
        
            userDocID = users.docs[0].id; //undefined la inceput cred pt ca nu ajunge aici, arunca eroare
            console.log("RETRIEVVED IN GETUSER ", retrievedUserObj)
        })
        .catch((e) => {
//console.log("SUNTEM IN CATCH")
            console.log(e) //cannot read property data of undefined - daca nu exista userul, .data() de mai sus va ridica eroare si o vom trata aici prin apelul addUser()
            addUser(uid, name, mail, photoUrl)     
        });
}

function getLeaderboard() {
    let db = firebase.firestore();   
    
    var index = -1;
    
    db.collection("users").orderBy("highscore", "desc").limit(3).get()
        .then(users => {
        
            users.forEach(doc => {
                index++
                
                console.log("NOU:", doc.data())
                bestUsers[index] = doc.data()
            })

            console.log("Toti userii",bestUsers)
        })
        .catch((e) => {
            console.log(e)
        });
}






function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    //this above operations happens asynchronously which means we can attach a promise
    .then(async function(result) {
        const user = result.user //which gives us a user once that promise resolves
        console.log(user)
        console.log(user.displayName)
        
        change_div('login_box','divCanvas');
                
        getUser(user.uid, user.displayName, user.email, user.photoURL);
        
        await sleep(1000);    
        console.log("RETRIEVED OBJ:", retrievedUserObj)
        
        getLeaderboard();
        
        wholePage(retrievedUserObj, bestUsers, userDocID);        
        
    })
    .catch(console.log)
    
}


function githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
    //this above operations happens asynchronously which means we can attach a promise
    .then(async function(result) {
        const user = result.user //which gives us a user once that promise resolves
        console.log(user)
        console.log(user.displayName)
        
        change_div('login_box','divCanvas');
                
        getUser(user.uid, user.displayName, user.email, user.photoURL);
        
        await sleep(1000);
        
        console.log("RETRIEVED OBJ:", retrievedUserObj)
        
        getLeaderboard();
        
        wholePage(retrievedUserObj, bestUsers, userDocID);        
    })
    .catch(console.log)
    
}



function facebookLogin() {
    /*const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    //this above operations happens asynchronously which means we can attach a promise
    .then(result => {
        const user = result.user //which gives us a user once that promise resolves
        console.log(user)

        
        change_div('login_box','options_box');
        getUser(user.uid, user.displayName, user.email);
    })
    .catch(console.log)*/
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    //this above operations happens asynchronously which means we can attach a promise
    .then(async function(result) {
        const user = result.user //which gives us a user once that promise resolves
        console.log(user)
        console.log(user.displayName)
        
        change_div('login_box','divCanvas');
                
        getUser(user.uid, user.displayName, user.email, user.photoURL);
        
        await sleep(1000);
        
        console.log("RETRIEVED OBJ:", retrievedUserObj)
        
        getLeaderboard();
        
        wholePage(retrievedUserObj, bestUsers, userDocID);        
    })
    .catch(console.log)
    
    
}
