 const toggleBtn   = document.getElementById('chat-toggle');
    const popup       = document.getElementById('chat-popup');
    const closeBtn    = document.getElementById('chat-close');
    const form        = document.getElementById('chat-form');
    const input       = document.getElementById('chat-input');
    const messagesBox = document.getElementById('chat-messages');

    function toggleChat() {
      const open = popup.classList.toggle('open');
      popup.setAttribute('aria-hidden', (!open).toString());
      if (open) input.focus();
    }

    function addMessage(text, who = 'bot') {
      const div = document.createElement('div');
      div.className = 'message ' + who;
      div.textContent = text;
      messagesBox.appendChild(div);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function getBotReply(message) {
      const msg = message.toLowerCase();

      if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
        return "Hello! 👋 How can I help you?";
      }
      if (msg.includes('your name')) {
        return "My name is RayzBot 🤖";
      }
      if (msg.includes('how are you')) {
        return "I'm just code, but I'm doing great! 😊";
      }
      if (msg.includes('how to pay')) {
        return "just click on scanner";
      }
      if (msg.includes('what is your work') || msg.includes('what can you do')) {
        return "I can answer basic questions, help with support, or just chat!";
      }
      if (msg.includes('price') || msg.includes('cost')) {
        return "Prices vary based on the service. What do you need help with?";
      }
      if (msg.includes('help') || msg.includes('support')) {
        return "Sure! Tell me what you're stuck with.";
      }
      if (msg.includes('services')) {
        return "We offer web design, digital payments, AI chat, and more.";
      }
      if (msg.includes('thank')) {
        return "You're very welcome! 😊";
      }
      if (msg.includes('bye') || msg.includes('goodbye')) {
        return "Goodbye! Come back anytime 👋";
      }
      if (msg.includes('who made you')) {
        return "I was created by a developer using JavaScript!";
      }

      return "I'm still learning. Could you rephrase that?";
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addMessage(text, 'you');
      input.value = '';

      setTimeout(() => {
        const reply = getBotReply(text);
        addMessage(reply, 'bot');
      }, 600);
    });

    // Initial greeting
    setTimeout(() => {
      addMessage("नमस्ते! I'm your assistant. Ask me anything in simple words 🤖", 'bot');
    }, 800);
