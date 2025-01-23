const messageDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");


async function loadMessages() {
  try {
    const response = await fetch("https://project-victory.azurewebsites.net/api/messages");
    const messages = await response.json();

    messageDiv.innerHTML = "";

    messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.innerHTML = `
<div class="message">
  <div class="message-header">
    <span class="username">Username</span>
    <span class="timestamp">${new Date(msg.timestamp).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })}</span>
  </div>
  <div class="message-body">
    ${msg.message}
  </div>
</div>
      `;
      messageDiv.appendChild(messageElement);
    });

    scrollToBottom();
  } catch (error) {
    console.log(error);
  }
}

async function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) {
    alert("Please enter a messaga hajwan");
    return;
  }

  try {
    await fetch("https://project-victory.azurewebsites.net/api/messages", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text})
    });

    messageInput.value = "";
    loadMessages();
  } catch (error) {

  }
}

function scrollToBottom() {
  messageDiv.scrollTop = messageDiv.scrollHeight;
}

sendButton.addEventListener("click", sendMessage)
loadMessages();
