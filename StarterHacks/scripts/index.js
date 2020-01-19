const eventList = document.querySelector(".events");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = user => {
  if (user) {
    //account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
        <div>Organization Name: ${doc.data().orgname}</div>
        <div>Logged in with ${user.email}</div>`;
        accountDetails.innerHTML = html;
      });

    //toggle UI elemetnts
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    //hide account info
    accountDetails.innerHTML = "";
    //toggle UI elements
    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block "));
  }
};
//setup events
const setupEvents = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const event = doc.data();
      const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${event.EventName}</div>
    <div class="collapsible-body white">${event.OrganizationName}</div>
    <div class="collapsible-body white">${event.Location}</div>
    <div class="collapsible-body white">${event.EventDescription}</div>
    </li>
    `;
      html += li;
    });

    eventList.innerHTML = html;
  } else {
    eventList.innerHTML = '<h5 class="center-align"></h5>';
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  var instances = M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
