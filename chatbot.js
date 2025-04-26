
let CONVERSATION = [
    

];
//const MY_SECRET = "F001F6F44374CA27";
// TODO #2: Replace this hardcoded developer message with the 
//          course information received from
//          https://cs272.cs.wisc.edu/rest/s25/ice/courses
//
//          You can simply JSON.stringify the data as the
//          content for this message.
const fetchCourses = async () => {
   try {
        const response = await fetch('https://cs272.cs.wisc.edu/rest/s25/ice/courses');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        CONVERSATION.push({
            "role": "developer",
            "content": "Here is the UW-Madison course information provided as JSON: " + JSON.stringify(data)
        });
        console.log("Course data fetched and added to CONVERSATION:", data);
    } catch (error) {
        console.error("Failed to fetch course data:", error);
        CONVERSATION.push({
            "role": "developer",
            "content": "Failed to retrieve course data."
        });
    }
};
 () => fetch('https://cs272.cs.wisc.edu/rest/s25/hw10/ai', {
    method: "POST", 
    headers: { 
        "Authorization": `${MY_SECRET}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(CONVERSATION)
})

CONVERSATION.push({
    role: "developer",
    content: "Here is the course information. You may recommend UW-Madison's CS200, CS220, CS272, CS300, LIS201, LIS350, or LIS461."
});


// Keep this here! :) It is our welcome message.
CONVERSATION.push({
    role: "assistant",
    content: "Welcome to Badger Enroll, my name is Bucky, how can I help you?"
});
appendMessage("assistant", "Welcome to Badger Enroll, my name is Bucky, how can I help you?");


document.getElementById('chatbot-button').addEventListener('click', () => {
    const chatWindow = document.getElementById('chatbot-window');
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

document.getElementById('chatbot-send').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('chatbot-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

/**
 * TODO #3
 * 
 * Called whenever the "Send" button or enter key is pressed.
 * You should update the `CONVERSATION` and fetch a response
 * from the AI API! Append and display this to the user.
 * 
 * https://cs272.cs.wisc.edu/rest/s25/hw10/ai
 */
//function sendMessage() {
    const userInput = document.getElementById('chatbot-input').value;
    if (userInput) {
        document.getElementById('chatbot-input').value = '';
        appendMessage('user', userInput);
        CONVERSATION.push({
            role: "user",
            content: userInput
        });
        
        appendMessage("assistant", "Hmmm... I should probably say something back!");
    }
//}
async function sendMessage() {
    const userInput = document.getElementById('chatbot-input').value;
    if (userInput) {
        document.getElementById('chatbot-input').value = '';
        appendMessage('user', userInput);
        CONVERSATION.push({ role: 'user', content: userInput });

        try {
            const response = await fetch('https://cs272.cs.wisc.edu/rest/s25/hw10/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ conversation: CONVERSATION })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.response;

            CONVERSATION.push({ role: 'bot', content: aiResponse });
            appendMessage('Bucky', aiResponse);

        } catch (error) {
            console.error("Failed to fetch AI response:", error);
            const errorMessage = "Sorry, I'm having trouble connecting to the server. Please try again later.";
            CONVERSATION.push({ role: 'bot', content: errorMessage });
            appendMessage('Bucky', errorMessage);
        }
    }
}
//console.log(typeof aiResponse)
console.log(typeof userInput)
const sendButton = document.getElementById('chatbot-send');
const messageInput = document.getElementById('chatbot-input');

sendButton.addEventListener('click', () => {
    sendMessage();
});

sendButton.addEventListener('click', () => {
    sendMessage();
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});



// Fetch courses when the script loads
fetchCourses().then(() => {
    // Initial bot message, now sent after courses are fetched
    const initialMessage = { role: 'bot', content: "Hello! I'm Bucky, your enrollment assistant. How can I help you today?" };
    CONVERSATION.push(initialMessage);
    appendMessage('Bucky', initialMessage);
});
/**
 * Appends a message ('user' or 'assistant') to the chatbox.
 * @param {string} sender Either 'user' or 'assistant'
 * @param {string} text The message to display.
 */
function appendMessage(sender, text) {
    const chatMessages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'chat-message-' + sender;
    console.log(text)
    console.log(sender)
    msg.innerHTML = DOMPurify.sanitize(marked.parse(JSON.stringify(text)));;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
