// * render the chat into the dom
// * clear the list of chats(when the room changes)

class ChatUI {
  constructor(list) {
    this.list = list;
  }

  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
      <li class="list-group-item">
      <span class="username">${data.username}</span>
      <span class="message">${data.message}</span>
      <div class="time">${when}</div>  
      </li>
      `;
    this.list.innerHTML += html;
  }
}

//! dateFns.distanceInWordsToNow is fn from fateFns library which conerts date time to a friendly format.
