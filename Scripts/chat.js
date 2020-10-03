//// * adding new chat documents
// * setting up a real-life listener to get new chats
// * updating the username
// * updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    //* Format a chat object

    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    //* Save the chat document in the database
    const response = await this.chats.add(chat);
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // * Update UI
            callback(change.doc.data());
          }
        });
      });

    //* where property is used to segregate the chats on the basis of room
    //*orderBy arranges the order of records on the basis of argumrnts.but click on the link to set the order in console
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

// setTimeout(() => {
//   chatroom.updateRoom("gaming");
//   chatroom.updateName("rivu");
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat("hello");
// }, 3000);
