const express = require('express');
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const app = express();


//allow middleware to access to routes
app.use(cors());

//parse incoming requests with express.json
app.use(express.json())


//Mock Conversation History
const conversationHistory = [
    { user: "User", text: "user message 1" },
    { user: "chatGPT", text: "mock response 1" },
    { user: "User", text: "user message 2" },
    { user: "chatGPT", text: "mock response 2" },
    { user: "User", text: "user message 3" },
    { user: "chatGPT", text: "mock response 3" },
]

//Mock Conversations
const allConversations = {
    'conversation_1': {
      name: 'Conversation 1',
      messages: [
        { user: "User", text: "convo1 message 1" },
        { user: "chatGPT", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
        { user: "User", text: "convo1 message 2" },
        { user: "chatGPT", text: "mock response 2" },
        { user: "User", text: "convo1 message 3" },
        { user: "chatGPT", text: "mock response 3" },
      ]
    },
    'conversation_2': {
      name: 'Conversation 2',
      messages: [
        { user: "User", text: "convo2 message 1" },
        { user: "chatGPT", text: "mock response 1" },
        { user: "User", text: "convo2 message 2" },
        { user: "chatGPT", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
        { user: "User", text: "convo2 message 3" },
        { user: "chatGPT", text: "mock response 3" },
      ]
    },
    'conversation_3': {
      name: 'Conversation 3',
      messages: [
        { user: "User", text: "convo3 message 1" },
        { user: "chatGPT", text: "mock response 1" },
        { user: "User", text: "convo3 message 2" },
        { user: "chatGPT", text: "mock response 2" },
        { user: "User", text: "convo3 message 3" },
        { user: "chatGPT", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      ]
    }
  };

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/conversation-history', (req, res) => {
    res.json(conversationHistory);
  });

app.get('/allConversations', (req, res) => {
res.json(allConversations);
});







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});