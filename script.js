    // DOM elements
    const toggleBtn = document.getElementById('chat-toggle');
    const popup = document.getElementById('chat-popup');
    const closeBtn = document.getElementById('chat-close');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('chat-send');

    // Show/hide chat popup
    function toggleChat() {
        const open = popup.classList.toggle('open');
        popup.setAttribute('aria-hidden', (!open).toString());
        if (open) {
            input.focus();
            // Add initial message if chat is empty
            if (box.children.length === 0) {
                setTimeout(() => {
                    addMessage('Hello! I\'m Razpay support. How can I help with payments today?', 'bot');
                }, 300);
            }
        }
    }

    // Add message to chat box
    function addMessage(txt, who = 'bot') {
        const div = document.createElement('div');
        div.className = `message ${who}`;
        div.textContent = txt;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.innerHTML = `
            <span>Thinking</span>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        box.appendChild(typingDiv);
        box.scrollTop = box.scrollHeight;
        return typingDiv;
    }

    // Call chatbot API
    async function getBotReply(msg) {
        try {
            // For demo purposes, we'll use a simulated API
            // In a real implementation, you would call your actual API endpoint:
            /*
            const res = await fetch('https://your-api-endpoint.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });
            
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            return data.reply?.trim() || 'Sorry, I didn’t get that.';
            */
            
            // Simulated API response with payment-related answers
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const paymentKeywords = ['payment', 'pay', 'transaction', 'fee', 'charge', 'refund', 'card', 'credit', 'debit', 'gateway'];
            const integrationKeywords = ['integrate', 'api', 'sdk', 'documentation', 'code', 'implement'];
            const securityKeywords = ['secure', 'security', 'pci', 'compliance', 'fraud'];
            
            if (msg.toLowerCase().includes('hello') || msg.toLowerCase().includes('hi')) {
                return 'Hello! How can I assist you with Razpay today?';
            }
            else if (msg.toLowerCase().includes('fee') || msg.toLowerCase().includes('pricing')) {
                return 'Our standard transaction fee is 2.9% + $0.30 per successful charge. Volume discounts are available for high-volume businesses.';
            }
            else if (paymentKeywords.some(kw => msg.toLowerCase().includes(kw))) {
                const responses = [
                    'Payments typically take 1-2 business days to settle in your bank account.',
                    'We support all major credit cards: Visa, Mastercard, American Express, and Discover.',
                    'You can issue refunds directly from your Razpay dashboard or via the API.',
                    'Failed payments can occur due to insufficient funds, card expiration, or bank restrictions.'
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }
            else if (integrationKeywords.some(kw => msg.toLowerCase().includes(kw))) {
                return 'You can integrate Razpay using our REST API or client libraries. Documentation is available at docs.razpay.com. We have SDKs for JavaScript, Python, Java, and PHP.';
            }
            else if (securityKeywords.some(kw => msg.toLowerCase().includes(kw))) {
                return 'Razpay is PCI DSS Level 1 certified. We use end-to-end encryption, tokenization, and advanced fraud detection to secure your transactions.';
            }
            else if (msg.toLowerCase().includes('contact') || msg.toLowerCase().includes('support')) {
                return 'You can reach our support team 24/7 at support@razpay.com or +1-800-555-1234.';
            }
            else {
                const fallbackResponses = [
                    'I can help with payment processing, integration, security, and billing questions.',
                    'Could you clarify your question about Razpay?',
                    'I specialize in payment processing. How can I assist you today?',
                    'For more complex issues, our support team is available 24/7.'
                ];
                return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            }
        } catch (e) {
            console.error(e);
            return '⚠️ Error contacting server. Please try again later.';
        }
    }

    // Form submit = user sends message
    form.onsubmit = async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'you');
        input.value = '';
        sendBtn.disabled = true;
        
        // Show typing indicator
        const typingIndicator = showTyping();
        
        // Get bot reply
        const reply = await getBotReply(text);
        
        // Remove typing indicator
        box.removeChild(typingIndicator);
        
        // Add bot reply
        addMessage(reply, 'bot');
        sendBtn.disabled = false;
    };

    // Toggle button click
    toggleBtn.onclick = toggleChat;
    closeBtn.onclick = toggleChat;

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (popup.classList.contains('open') && 
            !popup.contains(e.target) && 
            e.target !== toggleBtn) {
            toggleChat();
        }
    });

    // Initial greeting after a short delay
    setTimeout(() => {
        if (!popup.classList.contains('open')) {
            addMessage('Welcome to Razpay support! Ask me about payments, integration, or security.', 'bot');
        }
    }, 2000);
