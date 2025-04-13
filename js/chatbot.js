// Simple AI Chatbot Implementation
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Predefined responses for the simple chatbot
    const botResponses = {
      greetings: [
        "Hello! How can I help you today?",
        "Hi there! What can I assist you with?",
        "Greetings! How may I be of service?"
      ],
      farewell: [
        "Goodbye! Have a great day!",
        "Farewell! Feel free to chat again anytime.",
        "See you later! Thanks for chatting!"
      ],
      thanks: [
        "You're welcome! Is there anything else I can help with?",
        "My pleasure! Let me know if you need anything else.",
        "Glad I could help! Any other questions?"
      ],
      about: [
        "I'm a simple AI assistant designed to help visitors on this website. You can ask me about the website owner's portfolio, projects, or get general information!"
      ],
      help: [
        "I can help you navigate the website, provide information about the website owner's projects, or answer general questions. Feel free to ask anything!"
      ],
      default: [
        "That's an interesting point. Could you tell me more?",
        "I'm not sure I fully understand. Can you provide more details?",
        "Let me try to help with that. What specific information are you looking for?",
        "That's something I don't have much information about yet. Would you like to know about the portfolio or projects instead?"
      ]
    };
  
    // Function to determine response category
    function getCategoryFromInput(input) {
      input = input.toLowerCase();
      
      if (/\b(hi|hello|hey|greetings|howdy)\b/.test(input)) {
        return 'greetings';
      } else if (/\b(bye|goodbye|farewell|see you|later)\b/.test(input)) {
        return 'farewell';
      } else if (/\b(thanks|thank you|appreciate|grateful)\b/.test(input)) {
        return 'thanks';
      } else if (/\b(who are you|what are you|about you|your purpose)\b/.test(input)) {
        return 'about';
      } else if (/\b(help|assist|support|guide)\b/.test(input)) {
        return 'help';
      } else if (/\b(portfolio|projects|work|experience|skills)\b/.test(input)) {
        return 'portfolio';
      } else if (/\b(contact|reach|email|phone|message)\b/.test(input)) {
        return 'contact';
      } else if (/\b(blog|posts|articles|writing)\b/.test(input)) {
        return 'blog';
      } else if (/\b(lab|login|account|register|signup)\b/.test(input)) {
        return 'lab';
      } else {
        return 'default';
      }
    }
  
    // Add custom responses for website-specific queries
    botResponses.portfolio = [
      "You can find the portfolio in the 'About' section! It showcases various projects and experiences.",
      "Check out the 'About' tab to see the complete portfolio with project details."
    ];
    
    botResponses.contact = [
      "You can contact the website owner using the form on this page, or through the email and phone number listed below.",
      "Feel free to send a message using the contact form. You'll receive a response shortly!"
    ];
    
    botResponses.blog = [
      "The blog can be found in the 'Blog' section. It contains articles on various topics!",
      "Visit the 'Blog' tab to read interesting articles and posts."
    ];
    
    botResponses.lab = [
      "The 'Lab' section contains interactive projects that require login. You can register for an account there!",
      "To access the lab features, head to the 'Lab' tab and log in or create a new account."
    ];
  
    // Function to get a random response from a category
    function getRandomResponse(category) {
      const responses = botResponses[category] || botResponses.default;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';
      
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      
      contentDiv.appendChild(paragraph);
      messageDiv.appendChild(contentDiv);
      chatMessages.appendChild(messageDiv);
      
      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Function to process user input and get bot response
    function processUserInput(input) {
      // Add user message to chat
      addMessage(input, true);
      
      // Simulate processing time
      setTimeout(() => {
        const category = getCategoryFromInput(input);
        const response = getRandomResponse(category);
        addMessage(response);
      }, 500);
    }
  
    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userInput = chatInput.value.trim();
      
      if (userInput) {
        processUserInput(userInput);
        chatInput.value = '';
      }
    });
  
    // Add CSS for chat messages
    const style = document.createElement('style');
    style.textContent = `
      .chatbot-messages {
        height: 350px;
      }
      
      .message {
        margin-bottom: 15px;
        display: flex;
      }
      
      .user-message {
        justify-content: flex-end;
      }
      
      .message-content {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 18px;
      }
      
      .bot-message .message-content {
        background-color: var(--border-color);
        color: var(--text-color);
      }
      
      .user-message .message-content {
        background-color: var(--primary-color);
        color: white;
      }
      
      .message-content p {
        margin-bottom: 0;
      }
    `;
    document.head.appendChild(style);
  });