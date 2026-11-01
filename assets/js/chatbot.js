/**
 * ============================================================================
 * SAFKAT AI — Interactive Portfolio Chatbot Client
 * Powered 100% by Google Gemini AI via Vercel Serverless Function (/api/chat)
 * ============================================================================
 */

(function () {
    'use strict';

    // ------------------------------------------------------------------------
    // SUGGESTED PROMPT CHIPS
    // ------------------------------------------------------------------------
    const PROMPT_SUGGESTIONS = [
        { label: "🏆 CP & Ratings", query: "Tell me about your competitive programming records and ratings" },
        { label: "💻 Tech Stack", query: "What technologies and programming languages do you specialize in?" },
        { label: "🔬 Chest X-Ray Thesis", query: "What is your undergraduate research thesis about?" },
        { label: "🎓 Education & CGPA", query: "What is your academic background and CGPA?" },
        { label: "📂 Projects", query: "What notable software projects have you built?" },
        { label: "📄 Download CV", query: "How can I download your resume or CV?" },
        { label: "📬 Contact & Hire", query: "How can I get in touch with you or discuss hiring?" }
    ];

    // ------------------------------------------------------------------------
    // MARKDOWN & RICH TEXT PARSER (For Authentic Gemini Responses)
    // ------------------------------------------------------------------------
    function formatMessageText(text) {
        if (!text) return '';

        let formatted = text
            // Escape HTML tags except for safe tags
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Re-allow custom allowed HTML tags
            .replace(/&lt;(\/?(div|a|span|i|strong|em|p|br|code|pre|ul|ol|li)[^&gt;]*)&gt;/gi, '<$1>')
            // Code blocks: ```code```
            .replace(/```([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$1</code></pre>')
            // Inline code: `code`
            .replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>')
            // Headings: ### Heading or ## Heading
            .replace(/^###\s+(.*)$/gm, '<strong class="chat-heading-3">$1</strong>')
            .replace(/^##\s+(.*)$/gm, '<strong class="chat-heading-2">$1</strong>')
            // Bold: **text**
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            // Italic: *text*
            .replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, '$1<em>$2</em>$3')
            // Bullet points: •, -, or * at beginning of line
            .replace(/^[•\-\*]\s+(.*)$/gm, '<li class="chat-bullet-item">$1</li>')
            // Markdown links: [Title](url)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-text-link">$1 <i class="fas fa-external-link-alt fa-xs"></i></a>');

        // Wrap consecutive <li> in <ul>
        formatted = formatted.replace(/(<li class="chat-bullet-item">.*?<\/li>(\s*))+/gs, function (match) {
            return '<ul class="chat-bullet-list">' + match.trim() + '</ul>';
        });

        // Strip <br> inside <ul>
        formatted = formatted.replace(/<ul class="chat-bullet-list">([\s\S]*?)<\/ul>/g, function (match, listContent) {
            return '<ul class="chat-bullet-list">' + listContent.replace(/<br\s*\/?>/gi, '') + '</ul>';
        });

        // Convert double newlines to paragraph breaks and single newlines to <br>
        formatted = formatted.replace(/\n\n+/g, '<br><br>');
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    // ------------------------------------------------------------------------
    // UI CONTROLLER & EVENT LISTENERS
    // ------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        const widget = document.getElementById('aiChatWidget');
        const toggleBtn = document.getElementById('aiChatToggleBtn');
        const modal = document.getElementById('aiChatModal');
        const closeBtn = document.getElementById('aiChatCloseBtn');
        const resetBtn = document.getElementById('aiChatResetBtn');
        const messagesContainer = document.getElementById('aiChatMessages');
        const suggestionsContainer = document.getElementById('aiChatSuggestions');
        const chatForm = document.getElementById('aiChatForm');
        const chatInput = document.getElementById('aiChatInput');
        const greetingBubble = document.getElementById('aiChatGreetingBubble');
        const closeGreetingBtn = document.getElementById('closeGreetingBubble');

        if (!widget || !toggleBtn || !modal || !messagesContainer) return;

        let isOpen = false;
        let isTyping = false;
        let conversationHistory = [];

        // Show welcome greeting bubble after 2.5 seconds if user hasn't opened chat
        let greetingTimer = setTimeout(function () {
            if (!isOpen && greetingBubble) {
                greetingBubble.classList.add('show');
            }
        }, 2500);

        if (closeGreetingBtn) {
            closeGreetingBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (greetingBubble) greetingBubble.classList.remove('show');
            });
        }

        if (greetingBubble) {
            greetingBubble.addEventListener('click', function (e) {
                if (e.target.id === 'closeGreetingBubble') return;
                toggleChat(true);
            });
        }

        // Toggle Chat Open/Close
        function toggleChat(forceOpen) {
            isOpen = (typeof forceOpen === 'boolean') ? forceOpen : !isOpen;

            if (isOpen) {
                modal.classList.add('open');
                toggleBtn.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                if (greetingBubble) greetingBubble.classList.remove('show');
                clearTimeout(greetingTimer);

                setTimeout(function () {
                    chatInput.focus();
                }, 200);

                if (messagesContainer.children.length === 0) {
                    renderWelcomeMessage();
                }
            } else {
                modal.classList.remove('open');
                toggleBtn.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
        }

        toggleBtn.addEventListener('click', function () {
            toggleChat();
        });

        closeBtn.addEventListener('click', function () {
            toggleChat(false);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                toggleChat(false);
            }
        });

        // Reset conversation
        resetBtn.addEventListener('click', function () {
            messagesContainer.innerHTML = '';
            conversationHistory = [];
            renderWelcomeMessage();
            chatInput.focus();
        });

        // Initial Greeting
        function renderWelcomeMessage() {
            const welcomeText = `Assalamu Alaikum! 👋 I'm **Safkat AI**, powered by Google Gemini.

I can answer any questions about Safkat's **Competitive Programming records**, **ASP.NET Core & ML projects**, **Research Thesis**, or **how to contact him**.

Choose a quick topic below or type your question:`;

            appendMessage('bot', welcomeText, false);
            renderSuggestionChips();
        }

        // Render Suggestion Chips
        function renderSuggestionChips() {
            if (!suggestionsContainer) return;
            suggestionsContainer.innerHTML = '';

            PROMPT_SUGGESTIONS.forEach(function (item) {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'ai-suggestion-chip';
                chip.textContent = item.label;
                chip.setAttribute('aria-label', item.label);
                chip.addEventListener('click', function () {
                    handleUserQuery(item.query);
                });
                suggestionsContainer.appendChild(chip);
            });
        }

        // Append a message to the stream
        function appendMessage(sender, text, isHtml) {
            const msgRow = document.createElement('div');
            msgRow.className = 'ai-msg-row ai-msg-' + sender;

            if (sender === 'bot') {
                const avatar = document.createElement('div');
                avatar.className = 'ai-msg-avatar';
                avatar.innerHTML = '<img src="assets/imgs/hero-avatar.jpg" alt="Safkat AI">';
                msgRow.appendChild(avatar);
            }

            const bubble = document.createElement('div');
            bubble.className = 'ai-msg-bubble';

            if (isHtml) {
                bubble.innerHTML = text;
            } else {
                bubble.innerHTML = formatMessageText(text);
            }

            msgRow.appendChild(bubble);
            messagesContainer.appendChild(msgRow);
            scrollToBottom();

            bindInternalScrollLinks(bubble);
        }

        // Smooth scroll to relevant section when clicking anchor pills
        function bindInternalScrollLinks(container) {
            const scrollLinks = container.querySelectorAll('.chat-btn-scroll');
            scrollLinks.forEach(function (link) {
                link.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId && targetId.startsWith('#')) {
                        const targetEl = document.querySelector(targetId);
                        if (targetEl) {
                            e.preventDefault();
                            if (window.innerWidth <= 768) {
                                toggleChat(false);
                            }
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        }

        function scrollToBottom() {
            setTimeout(function () {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 50);
        }

        // Typing indicator
        function showTypingIndicator() {
            isTyping = true;
            const typingRow = document.createElement('div');
            typingRow.className = 'ai-msg-row ai-msg-bot ai-typing-indicator-row';
            typingRow.id = 'aiTypingIndicator';

            const avatar = document.createElement('div');
            avatar.className = 'ai-msg-avatar';
            avatar.innerHTML = '<img src="assets/imgs/hero-avatar.jpg" alt="Safkat AI">';
            typingRow.appendChild(avatar);

            const bubble = document.createElement('div');
            bubble.className = 'ai-msg-bubble ai-typing-bubble';
            bubble.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
            typingRow.appendChild(bubble);

            messagesContainer.appendChild(typingRow);
            scrollToBottom();
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('aiTypingIndicator');
            if (indicator) {
                indicator.remove();
            }
            isTyping = false;
        }

        // --------------------------------------------------------------------
        // DIRECT GEMINI AI QUERY HANDLER
        // --------------------------------------------------------------------
        async function handleUserQuery(queryText) {
            const text = queryText || chatInput.value.trim();
            if (!text || isTyping) return;

            // Append user message
            appendMessage('user', text, false);
            chatInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            const userTurn = { role: 'user', text: text };

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(function () {
                    controller.abort();
                }, 20000); // 20s network timeout

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: text,
                        history: conversationHistory.slice(-8)
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                removeTypingIndicator();

                if (response.ok) {
                    const data = await response.json();
                    if (data && typeof data.reply === 'string' && data.reply.trim()) {
                        const reply = data.reply.trim();
                        appendMessage('bot', reply, false);
                        conversationHistory.push(userTurn);
                        conversationHistory.push({ role: 'model', text: reply });
                        return;
                    }
                }

                // If API returned an error status (e.g. 500, 502, 503)
                const errData = await response.json().catch(function () { return null; });
                const errMsg = (errData && errData.error) || 'Failed to receive a response from Gemini AI.';
                appendMessage('bot', `⚠️ **Gemini AI Service Alert**: ${errMsg}\n\nPlease check your internet connection or try again in a moment.`, false);

            } catch (err) {
                removeTypingIndicator();
                const errDetail = err && err.name === 'AbortError' ? 'The request timed out.' : 'Network connection error.';
                appendMessage('bot', `⚠️ **Gemini AI Service Alert**: ${errDetail} Please try again.`, false);
            }
        }

        // Form Submit
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleUserQuery();
        });

    });

})();
