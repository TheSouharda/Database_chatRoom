// * Dom Queries

const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-mssg");

//* add a new chat

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  // ! message method is used because its used as an id in the html file.
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});
// ! addchat is async function thus returns  PROMISE

//* Update Username

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //* Update name via chatroom class

  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  //* Reset the form

  newNameForm.reset();

  //*show the name then hide the update msg

  updateMsg.innerText = `Your name was updated to ${newName}`;

  //! settimeout was implemented to remove the text

  setTimeout(() => (updateMsg.innerText = ""), 3000);
});

//* check local storage for username
const username = localStorage.username ? localStorage.username : "anon";

//* Class instances

const chatUI = new ChatUI(chatList);

const chatroom = new Chatroom("general", username);

//* get chat and render
chatroom.getChats((data) => {
  chatUI.render(data);
});
