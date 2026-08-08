// AI Chatbot for the contact page.
//
// Primary path: POST the user's message to the Cloudflare Worker (see
// /cloudflare-worker), which runs a real LLM on Cloudflare's free Workers AI and
// applies the "answer generic/safe & about-Jeba questions, politely refuse
// offensive/political ones" policy in its system prompt.
//
// Fallback path: if the endpoint isn't set yet or the Worker is unreachable, a
// small built-in keyword responder answers so the page never breaks.

// ── CONFIG ───────────────────────────────────────────────────────────────────
// Paste your deployed Worker URL here (see cloudflare-worker/README.md).
// Leave blank to use the offline keyword fallback only.
const CHATBOT_ENDPOINT = '';
// ─────────────────────────────────────────────────────────────────────────────

interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form') as HTMLFormElement | null;
  const chatInput = document.getElementById('chat-input') as HTMLInputElement | null;
  const chatMessages = document.getElementById('chat-messages');
  if (!chatForm || !chatInput || !chatMessages) return;

  const history: Turn[] = [];
  const REFUSAL = "Under the policy, this question can't be answered.";

  // ── UI helpers ──────────────────────────────────────────────────────────
  function addMessage(text: string, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    contentDiv.appendChild(paragraph);
    messageDiv.appendChild(contentDiv);
    chatMessages!.appendChild(messageDiv);
    chatMessages!.scrollTop = chatMessages!.scrollHeight;
    return messageDiv;
  }

  function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML =
      '<div class="message-content typing"><span></span><span></span><span></span></div>';
    chatMessages!.appendChild(messageDiv);
    chatMessages!.scrollTop = chatMessages!.scrollHeight;
    return messageDiv;
  }

  // ── LLM call ────────────────────────────────────────────────────────────
  async function askLLM(message: string): Promise<string> {
    const res = await fetch(CHATBOT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: history.slice(-8) }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data || !data.reply) throw new Error('No reply');
    return data.reply as string;
  }

  // ── Offline fallback (keyword responder) ──────────────────────────────────
  const botResponses: Record<string, string[]> = {
    greetings: ['Hello! How can I help you today?', 'Hi there! What can I assist you with?'],
    farewell: ['Goodbye! Have a great day!', 'See you later! Thanks for chatting!'],
    thanks: ["You're welcome! Anything else I can help with?", 'Glad I could help!'],
    about: [
      "I'm the assistant for Jebakumar's portfolio. Ask me about his work, projects, or how to get in touch!",
    ],
    help: [
      "I can tell you about Jebakumar's experience, projects, or how to contact him. Ask away!",
    ],
    portfolio: [
      'Jebakumar is a Software System Design Engineer at AMD (ex-Intel, ex-SonicWall) focused on Ethernet/networking validation and test automation. See the About page for details.',
    ],
    contact: [
      'You can reach Jebakumar at jebakumar@gmail.com or +91-9952235964, or use the contact form on this page.',
    ],
    blog: ['Check out the blog at blog.jebakumar.in.'],
    lab: ['The Lab (lab.jebakumar.in) has interactive projects and requires login.'],
    refuse: [REFUSAL + ' Feel free to ask a professional or general question instead.'],
    default: [
      "I'm running in offline mode right now, so I can only answer basics about Jebakumar. Try asking about his experience, projects, or contact details.",
    ],
  };

  function fallbackCategory(raw: string): string {
    const input = raw.toLowerCase();
    if (/\b(hi|hello|hey|greetings|howdy)\b/.test(input)) return 'greetings';
    if (/\b(bye|goodbye|farewell|see you|later)\b/.test(input)) return 'farewell';
    if (/\b(thanks|thank you|appreciate|grateful)\b/.test(input)) return 'thanks';
    if (/\b(who are you|what are you|about you|your purpose)\b/.test(input)) return 'about';
    if (/\b(help|assist|support|guide)\b/.test(input)) return 'help';
    if (/\b(portfolio|projects|work|experience|skills|amd|intel|resume)\b/.test(input))
      return 'portfolio';
    if (/\b(contact|reach|email|phone|message|hire)\b/.test(input)) return 'contact';
    if (/\b(blog|posts|articles|writing)\b/.test(input)) return 'blog';
    if (/\b(lab|login|account|register|signup)\b/.test(input)) return 'lab';
    if (/\b(sex|nude|kill|hate|racist|politic|election|nsfw|drugs|weapon)\b/.test(input))
      return 'refuse';
    return 'default';
  }

  function fallbackReply(input: string): string {
    const list = botResponses[fallbackCategory(input)] || botResponses.default;
    return list[Math.floor(Math.random() * list.length)];
  }

  // ── Submit handler ────────────────────────────────────────────────────────
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    addMessage(userInput, true);
    history.push({ role: 'user', content: userInput });
    chatInput.value = '';

    const typing = addTypingIndicator();
    let reply: string;
    try {
      if (!CHATBOT_ENDPOINT) throw new Error('No endpoint configured');
      reply = await askLLM(userInput);
    } catch {
      reply = fallbackReply(userInput);
    }
    typing.remove();
    addMessage(reply);
    history.push({ role: 'assistant', content: reply });
  });
});
