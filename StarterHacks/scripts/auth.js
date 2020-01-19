//listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    //get data
    db.collection("events").onSnapshot(snapshot => {
      setupEvents(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupUI();
    setupEvents([]);
  }
});

//create new event
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();

  db.collection("events")
    .add({
      EventName: createForm["EventName"].value,
      OrganizationName: createForm["OrganizationName"].value,
      Location: createForm["Location"].value,
      EventDescription: createForm["EventDescription"].value
    })
    .then(() => {
      //close and clear the form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});
// sign-up
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign-up user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          orgname: signupForm["signup-name"].value
        });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch(err => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});

//logout method
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

//login form
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch(err => {
      loginForm.querySelector(".error").innerHTML = err.message;
    });
});
