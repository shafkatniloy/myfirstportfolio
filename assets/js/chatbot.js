/**
 * ============================================================================
 * SAFKAT AI — Interactive Portfolio Chatbot Engine
 * An intelligent conversational assistant grounded in Safkat Islam Niloy's profile,
 * competitive programming records, projects, research thesis, and career history.
 * ============================================================================
 */

(function () {
    'use strict';

    // ------------------------------------------------------------------------
    // KNOWLEDGE BASE (Structured Profile Data)
    // ------------------------------------------------------------------------
    const SAFKAT_PROFILE = {
        name: "Safkat Islam Niloy",
        location: "Dhaka, Bangladesh",
        email: "shafkatniloy119@gmail.com",
        phone: "+8801407383051",
        resumeUrl: "https://drive.google.com/file/d/1ME4yloB35hPF2ta6VrHtaOP43JMWtvg4/view?usp=sharing",
        socials: {
            linkedin: "https://www.linkedin.com/in/safkat-islam-niloy-40423924b/",
            github: "https://github.com/shafkatniloy",
            codeforces: "https://codeforces.com/profile/NOoobmasterSixT9",
            codechef: "https://www.codechef.com/users/nooobmaaster69",
            facebook: "https://www.facebook.com/niloy.119",
            instagram: "https://www.instagram.com/real.redranger/"
        },
        education: {
            university: {
                degree: "B.Sc. (Engg.) in Computer Science & Telecommunication Engineering (CSTE)",
                institution: "Noakhali Science and Technology University (NSTU)",
                cgpa: "3.65 / 4.00",
                duration: "2022 – 2026",
                location: "Noakhali, Bangladesh"
            },
            college: {
                degree: "Higher Secondary Certificate (HSC) in Science",
                institution: "Dr. Mahbubur Rahman Mollah College (DMRC)",
                duration: "2018 – 2020"
            },
            school: {
                degree: "Secondary School Certificate (SSC) in Science",
                institution: "Hazi MD. Ekhlasuddin Bhuiyan School & College",
                duration: "2012 – 2018"
            }
        },
        cp: {
            codeforcesRating: 1437,
            codeforcesRank: "Specialist",
            codeforcesHandle: "NOoobmasterSixT9",
            codechefRating: 1632,
            codechefRank: "3-Star",
            codechefHandle: "nooobmaaster69",
            problemsSolved: "1,500+",
            podiums: [
                "1st Place: 3rd NSTU National Science Fest Programming Contest (2024)",
                "4th Rank: CoU CSE Fest IUPC (Divisional)",
                "Contestant: ICPC Asia Dhaka Regional Contest",
                "6 National IUPC participations representing NSTU"
            ],
            archetypes: ["Segment Tree with Lazy Propagation", "Heavy-Light Decomposition (HLD)", "Dynamic Programming", "Number Theory & Sieve", "Graph Theory & LCA"]
        },
        thesis: {
            title: "Multi-Label Chest X-Ray Classification & Diagnostic Vision",
            supervisor: "Dr. Mohammad Rashedul Islam",
            department: "Department of CSTE, NSTU",
            models: "Vision Transformers (ViT), DenseNet-121, ResNet-50",
            explainability: "Grad-CAM Heatmap Visualization for Radiologists",
            benchmark: "Zero-shot transfer evaluation using BiomedCLIP",
            datasets: "NIH Chest X-ray 14 & CheXpert"
        },
        skills: {
            languages: ["C", "C++ (C++17/20)", "C# (.NET 8)", "Python", "SQL", "PHP", "JavaScript (ES6+)"],
            backend: ["ASP.NET Core (.NET 8)", "Entity Framework Core", "Clean Architecture", "Repository & Unit of Work Pattern", "RESTful Web APIs", "JWT Security", "MediatR"],
            database: ["Microsoft SQL Server", "MySQL", "PostgreSQL", "SQLite"],
            frontend: ["HTML5", "CSS3 / SCSS", "Bootstrap", "jQuery", "Liquid Glass UI", "Responsive Design"],
            ai_ml: ["PyTorch", "Vision Transformers (ViT)", "CNNs", "Grad-CAM", "BiomedCLIP", "Medical Image Processing"],
            tools: ["Git & GitHub", "Visual Studio", "VS Code", "Postman", "Linux / Bash"]
        },
        projects: [
            {
                name: "Multi-Label Chest X-Ray Classification",
                tech: "PyTorch, ViT, DenseNet, Grad-CAM, Python",
                desc: "Medical deep learning system identifying 14 thoracic disease categories from chest radiographs with visual Grad-CAM interpretability."
            },
            {
                name: "ASP.NET Core Enterprise Web API",
                tech: "C#, .NET 8, EF Core, SQL Server, JWT Auth, Clean Architecture",
                desc: "Robust RESTful backend with layered clean architecture, repository patterns, transactions, and role-based access control."
            },
            {
                name: "University Management System",
                tech: "PHP, MySQL, JavaScript, Bootstrap",
                desc: "Institutional database application for managing student courses, admissions, faculty workloads, and examination grade books."
            },
            {
                name: "High-Speed Algorithmic Library",
                tech: "C++20, STL",
                desc: "Handcrafted competitive programming templates for Segment Trees, LCA, Flow, and Modular Arithmetic."
            },
            {
                name: "Personal Portfolio with Liquid Glass UI & Runner Preloader",
                tech: "HTML5, CSS3, JS, SVG Refractive Shaders",
                desc: "High-octane portfolio site featuring runner preloader kinematics and Apple-inspired 3D liquid refractive glass."
            }
        ]
    };

    // ------------------------------------------------------------------------
    // QUICK SUGGESTION CHIPS
    // ------------------------------------------------------------------------
    const PROMPT_SUGGESTIONS = [
        { label: "🏆 CP & Ratings", query: "Tell me about his competitive programming records and ratings" },
        { label: "💻 Tech Stack", query: "What technologies and programming languages does Safkat use?" },
        { label: "🔬 Chest X-Ray Thesis", query: "What is his undergraduate research thesis about?" },
        { label: "🎓 Education & CGPA", query: "What is his academic background and CGPA?" },
        { label: "📂 Projects", query: "What key software projects has Safkat built?" },
        { label: "📄 Download CV", query: "How can I download his resume or CV?" },
        { label: "📬 Contact & Hire", query: "How can I contact or hire Safkat?" }
    ];

    // Helper: Checks if query contains full word or exact multi-word phrase
    function matches(query, terms) {
        return terms.some(function (term) {
            if (term.includes(' ')) {
                return query.includes(term);
            }
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp('(?:^|\\W)' + escaped + '(?:\\W|$)', 'i');
            return regex.test(query);
        });
    }

    // ------------------------------------------------------------------------
    // CONVERSATIONAL INTENT ENGINE
    // ------------------------------------------------------------------------
    function getBotResponse(rawQuery) {
        const query = rawQuery.trim().toLowerCase();

        // 1. Competitive Programming / Codeforces / CodeChef (High Priority)
        if (matches(query, ['cp', 'competitive programming', 'codeforces', 'codechef', 'rating', 'specialist', '3-star', '3 star', 'solved', 'iupc', 'icpc', 'contest', 'contests', 'podium', 'rank', 'algorithms', 'problem', 'problems'])) {
            return `🏆 **Competitive Programming Highlights**:

• **Codeforces**: <span class="badge-tag tag-blue">Specialist</span> (Max Rating: **${SAFKAT_PROFILE.cp.codeforcesRating}**) — Handle: [**@${SAFKAT_PROFILE.cp.codeforcesHandle}**](${SAFKAT_PROFILE.socials.codeforces})
• **CodeChef**: <span class="badge-tag tag-amber">3-Star</span> (Max Rating: **${SAFKAT_PROFILE.cp.codechefRating}**) — Handle: [**@${SAFKAT_PROFILE.cp.codechefHandle}**](${SAFKAT_PROFILE.socials.codechef})
• **Total Solved**: **${SAFKAT_PROFILE.cp.problemsSolved}** algorithmic problems across Codeforces, CodeChef, LeetCode, and VJudge.

🏅 **Contest Honors & Podiums**:
• **1st Place**: 3rd NSTU National Science Fest Programming Contest (2024)
• **4th Rank**: CoU CSE Fest IUPC (Divisional)
• **6 National IUPC participations** representing NSTU, including the ICPC Asia Dhaka Regional Contest.

Safkat specializes in Segment Trees (Lazy Propagation), Heavy-Light Decomposition (HLD), Graph Theory, and Dynamic Programming.

<div class="chat-action-links mt-2">
  <a href="${SAFKAT_PROFILE.socials.codeforces}" target="_blank" class="chat-btn-link"><i class="fas fa-terminal mr-1"></i> Codeforces Profile</a>
  <a href="${SAFKAT_PROFILE.socials.codechef}" target="_blank" class="chat-btn-link"><i class="fas fa-star mr-1"></i> CodeChef Profile</a>
  <a href="#contests" class="chat-btn-link chat-btn-scroll"><i class="fas fa-trophy mr-1"></i> View Contests</a>
</div>`;
        }

        // 2. Skills & Tech Stack
        if (matches(query, ['skill', 'skills', 'tech stack', 'technology', 'technologies', 'language', 'languages', 'framework', 'frameworks', 'backend', 'c++', 'c#', '.net', 'asp.net', 'python', 'sql', 'ef core', 'database', 'tools'])) {
            return `💻 **Safkat's Technical Skills & Stack**:

• **Programming Languages**:
  \`C\`, \`C++ (C++17/20)\`, \`C# (.NET 8)\`, \`Python\`, \`SQL\`, \`PHP\`, \`JavaScript (ES6+)\`

• **Backend & Architecture**:
  \`ASP.NET Core (.NET 8)\`, \`Entity Framework Core\`, \`Clean Architecture\`, \`Repository & Unit of Work Patterns\`, \`RESTful APIs\`, \`JWT Auth\`, \`MediatR\`

• **Databases**:
  \`Microsoft SQL Server\`, \`MySQL\`, \`PostgreSQL\`, \`SQLite\`

• **AI & Machine Learning**:
  \`PyTorch\`, \`Vision Transformers (ViT)\`, \`CNNs (DenseNet121, ResNet50)\`, \`Grad-CAM Explainability\`, \`BiomedCLIP\`

• **Frontend & UI**:
  \`HTML5\`, \`CSS3 / SCSS\`, \`Bootstrap\`, \`jQuery\`, \`Refractive Liquid Glass UI\`

• **DevOps & Tools**:
  \`Git\`, \`GitHub\`, \`Visual Studio\`, \`VS Code\`, \`Postman\`, \`Linux / Bash\`

<div class="chat-action-links mt-2">
  <a href="#skills" class="chat-btn-link chat-btn-scroll"><i class="fas fa-cogs mr-1"></i> Jump to Skills Section</a>
</div>`;
        }

        // 3. Research Thesis / Medical Deep Learning
        if (matches(query, ['thesis', 'research', 'chest x-ray', 'x-ray', 'xray', 'machine learning', 'deep learning', 'medical', 'vision', 'vit', 'cnn', 'biomedclip', 'grad-cam', 'supervisor', 'paper', 'ai'])) {
            return `🔬 **Undergraduate Research Thesis**:

• **Title**: *"${SAFKAT_PROFILE.thesis.title}"*
• **Supervisor**: **${SAFKAT_PROFILE.thesis.supervisor}**, Department of CSTE, NSTU.
• **Domain**: Medical Computer Vision & Diagnostic Artificial Intelligence.

**Core Technical Breakdown**:
1. **Multi-Label Detection**: Detects 14 thoracic disease pathologies simultaneously from large datasets (NIH ChestX-ray 14 & CheXpert).
2. **Deep Architectures**: Compares Vision Transformers (ViT-B/16) against CNN backbones (DenseNet-121, ResNet-50).
3. **Interpretability**: Generates Grad-CAM visual heatmaps so medical doctors and radiologists can see which lung regions triggered each diagnosis.
4. **Zero-Shot Validation**: Benchmarks clinical zero-shot transfer performance using BiomedCLIP.

<div class="chat-action-links mt-2">
  <a href="#portfolio" class="chat-btn-link chat-btn-scroll"><i class="fas fa-microscope mr-1"></i> View Thesis Showcase</a>
</div>`;
        }

        // 4. Projects
        if (matches(query, ['project', 'projects', 'work', 'what did he build', 'github', 'repo', 'app', 'system'])) {
            return `📁 **Featured Software Projects**:

1. 🩻 **Chest X-Ray Multi-Label Diagnosis System**
   *PyTorch • Vision Transformers (ViT) • Grad-CAM • Python*
   Deep learning diagnostic model for 14 chest pathologies with radiological heatmap visualizations.

2. 🛒 **ASP.NET Core Enterprise Web API**
   *C# • .NET 8 • EF Core • SQL Server • JWT • Clean Architecture*
   Scalable, production-ready backend following layered Clean Architecture, CQRS, and transaction management.

3. 🏫 **University Management Portal**
   *PHP • MySQL • JavaScript • Bootstrap*
   Role-based institutional portal for course administration, grades, student enrollment, and faculty data.

4. ⚡ **High-Speed CP Algorithmic Library**
   *C++20 • Data Structures • Graphs • DP*
   Tested templates for Segment Trees, HLD, Sieve, and LCA used in national contest programming.

5. 🏃 **This Portfolio with 3D Liquid Glass & Runner Preloader**
   *HTML5 • CSS3 • SVG Normal-Map Shaders • jQuery*
   Features dynamic theme switching, 6-color palette picker, and high-octane runner kinematics.

<div class="chat-action-links mt-2">
  <a href="${SAFKAT_PROFILE.socials.github}" target="_blank" class="chat-btn-link"><i class="fab fa-github mr-1"></i> GitHub Repos</a>
  <a href="#portfolio" class="chat-btn-link chat-btn-scroll"><i class="fas fa-code mr-1"></i> Browse Projects</a>
</div>`;
        }

        // 5. Education & Academics
        if (matches(query, ['education', 'academic', 'study', 'university', 'nstu', 'cste', 'degree', 'cgpa', 'gpa', 'result', 'grade', 'college', 'school', 'dmrc', 'ekhlasuddin', 'graduation'])) {
            return `🎓 **Academic Background**:

• **Bachelor of Science in Engineering (B.Sc. Engg.)**
  **Department**: Computer Science & Telecommunication Engineering (CSTE)
  **Institution**: Noakhali Science and Technology University (NSTU)
  **Duration**: 2022 – 2026 (Graduating Batch)
  **CGPA**: <span class="badge-tag tag-green">**3.65 / 4.00**</span>

• **Higher Secondary Certificate (HSC)**
  **Institution**: Dr. Mahbubur Rahman Mollah College (DMRC)
  **Duration**: 2018 – 2020 &bull; Science Division

• **Secondary School Certificate (SSC)**
  **Institution**: Hazi MD. Ekhlasuddin Bhuiyan School & College
  **Duration**: 2012 – 2018 &bull; Science Division

<div class="chat-action-links mt-2">
  <a href="#education" class="chat-btn-link chat-btn-scroll"><i class="fas fa-graduation-cap mr-1"></i> View Education Timeline</a>
</div>`;
        }

        // 6. Resume / CV Download
        if (matches(query, ['resume', 'cv', 'curriculum vitae', 'pdf', 'download cv', 'download resume'])) {
            return `📄 **Safkat's Official Resume / CV**:

Safkat's verified resume includes his full contest record, publications/thesis work, technical project breakdowns, and contact information.

<div class="chat-action-links mt-2">
  <a href="${SAFKAT_PROFILE.resumeUrl}" target="_blank" class="chat-btn-link chat-btn-primary"><i class="fas fa-file-download mr-1"></i> Open &amp; Download Resume (PDF)</a>
</div>

If you'd like to schedule an interview or discuss a project, feel free to reach out directly!`;
        }

        // 7. Why hire Safkat / Strengths
        if (matches(query, ['why hire', 'strengths', 'why should i hire', 'why safkat', 'why choose', 'qualities']) && !matches(query, ['contact', 'email', 'phone'])) {
            return `💡 **Why Hire Safkat Islam Niloy?**

1. **Proven Algorithmic Problem Solver**: 1,500+ problems solved, Codeforces Specialist, and 6x National IUPC experience. He writes clean, optimal, and edge-case-hardened code under pressure.
2. **Modern Enterprise Backend Expertise**: Experienced in ASP.NET Core (.NET 8), Entity Framework Core, SQL Server, and Clean Architecture patterns for high-throughput, maintainable systems.
3. **Applied AI & Research Rigor**: Deep understanding of PyTorch, CNNs, Vision Transformers, and medical imaging pipelines, backed by a 3.65 / 4.00 CGPA at NSTU.
4. **Collaborative & Self-Driven**: Represented his university in national coding festivals and led technical university team initiatives.

<div class="chat-action-links mt-2">
  <a href="${SAFKAT_PROFILE.resumeUrl}" target="_blank" class="chat-btn-link"><i class="fas fa-file-download mr-1"></i> Check Resume</a>
  <a href="mailto:${SAFKAT_PROFILE.email}" class="chat-btn-link"><i class="fas fa-envelope mr-1"></i> Email Safkat</a>
</div>`;
        }

        // 8. Contact / Hiring / Email / Phone / Location
        if (matches(query, ['contact', 'email', 'phone', 'call', 'reach', 'message', 'hire', 'job', 'available', 'internship', 'address', 'location', 'dhaka', 'where', 'whatsapp', 'linkedin', 'facebook'])) {
            return `📬 **Get in Touch with Safkat**:

• 📧 **Email**: [${SAFKAT_PROFILE.email}](mailto:${SAFKAT_PROFILE.email})
• 📱 **Phone / WhatsApp**: [${SAFKAT_PROFILE.phone}](tel:${SAFKAT_PROFILE.phone})
• 📍 **Location**: ${SAFKAT_PROFILE.location}
• 💼 **Status**: <span class="badge-tag tag-green">Available for SDE &amp; Research Roles</span>

**Social & Professional Links**:
• [LinkedIn Profile](${SAFKAT_PROFILE.socials.linkedin})
• [GitHub Profile](${SAFKAT_PROFILE.socials.github})
• [Facebook (@niloy.119)](${SAFKAT_PROFILE.socials.facebook})

<div class="chat-action-links mt-2">
  <a href="mailto:${SAFKAT_PROFILE.email}?subject=Job%20Opportunity%20/%20Inquiry%20for%20Safkat" class="chat-btn-link chat-btn-primary"><i class="fas fa-paper-plane mr-1"></i> Send an Email</a>
  <a href="#contact" class="chat-btn-link chat-btn-scroll"><i class="fas fa-envelope mr-1"></i> Fill Contact Form</a>
</div>`;
        }

        // 9. Dhrubanto / Campus farewell / Personal blog
        if (matches(query, ['dhrubanto', 'blog', 'farewell', 'campus', 'writing', 'fb post'])) {
            return `📝 **Campus & Reflections**:

Safkat recently published a heartfelt campus piece titled **"ধ্রুবান্ত-১৬: আমার ফেয়ারওয়েল"**, reflecting on his journey with the 16th batch of CSTE at NSTU. It received high appreciation from fellow students and alumni.

<div class="chat-action-links mt-2">
  <a href="#blog" class="chat-btn-link chat-btn-scroll"><i class="fas fa-book-open mr-1"></i> Read Blog Section</a>
  <a href="${SAFKAT_PROFILE.socials.facebook}" target="_blank" class="chat-btn-link"><i class="fab fa-facebook-f mr-1"></i> View on Facebook</a>
</div>`;
        }

        // 10. Greetings & Identity
        if (matches(query, ['hi', 'hello', 'hey', 'salam', 'assalamu', 'ola', 'good morning', 'good evening', 'who are you', 'what is your name', 'intro'])) {
            return `Assalamu Alaikum! 👋 I'm **Safkat AI**, Safkat Islam Niloy's personal portfolio assistant.

I can tell you everything about Safkat:
• **Competitive Programming**: Codeforces Specialist (1437) & 1,500+ solved problems
• **Software Engineering**: ASP.NET Core (.NET 8), C#, SQL Server, and Clean Architecture
• **AI Research**: Multi-Label Chest X-Ray Classification using ViT & Grad-CAM
• **Academics**: B.Sc. in CSTE at NSTU with **3.65 / 4.00 CGPA**

What would you like to explore first?`;
        }

        // 11. Who is Safkat / About
        if (matches(query, ['who is safkat', 'about safkat', 'tell me about him', 'summary', 'bio', 'who is he'])) {
            return `**Safkat Islam Niloy** is a passionate **Competitive Programmer**, **Software & Backend Developer**, and **Deep Learning Researcher** based in Dhaka, Bangladesh.

Key highlights:
• 🎓 **B.Sc. (Engg.) in CSTE** at Noakhali Science and Technology University (**CGPA 3.65 / 4.00**, Batch 2022–2026).
• ⚡ **Codeforces Specialist** (Max: 1437) and **CodeChef 3-Star** (Max: 1632) with **1,500+ problems solved**.
• 🏆 **6x National IUPC contestant**, 1st Place at 3rd NSTU National Science Fest Programming Contest (2024).
• 💻 **Backend Engineering** with **ASP.NET Core (.NET 8)**, C#, Entity Framework Core, and SQL Server.
• 🔬 Currently conducting thesis research on **Multi-Label Chest X-Ray Medical AI** using Vision Transformers and BiomedCLIP.

<div class="chat-action-links mt-2">
  <a href="${SAFKAT_PROFILE.resumeUrl}" target="_blank" class="chat-btn-link"><i class="fas fa-file-download mr-1"></i> Download Resume</a>
  <a href="#about" class="chat-btn-link chat-btn-scroll"><i class="fas fa-user mr-1"></i> Read Full Bio</a>
</div>`;
        }

        // 12. Fallback Response with Smart Topic Routing
        return `I'm happy to help, though I didn't catch the exact detail you're asking about.

Here are the most popular topics about Safkat you can explore:
• **"What is his Codeforces rating & CP record?"**
• **"What technologies and backend frameworks does he use?"**
• **"Tell me about his Chest X-Ray research thesis"**
• **"What is his university CGPA and degree?"**
• **"How can I download his resume or contact him?"**

Click any suggestion chip below or type your question!`;
    }

    // ------------------------------------------------------------------------
    // MARKDOWN & FORMATTING PARSER
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

                // Focus input after animation
                setTimeout(function () {
                    chatInput.focus();
                }, 200);

                // Initialize welcome message if empty
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

        // Close on ESC key
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

        // Render Welcome Message
        function renderWelcomeMessage() {
            const welcomeText = `Assalamu Alaikum! 👋 I'm **Safkat AI**, Safkat's virtual assistant.

I can answer any questions about his **Competitive Programming records**, **ASP.NET Core & ML projects**, **Research Thesis**, or **how to contact him**.

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

            // Bind smooth scroll anchors for in-message links
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
                            // If screen is mobile, close modal so user can see section
                            if (window.innerWidth <= 768) {
                                toggleChat(false);
                            }
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        }

        // Scroll messages area to bottom
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

        // Handle user query submission with real Gemini AI + resilient local fallback
        async function handleUserQuery(queryText) {
            const text = queryText || chatInput.value.trim();
            if (!text || isTyping) return;

            // Append user message to UI
            appendMessage('user', text, false);
            chatInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            const userTurn = { role: 'user', text: text };
            let botReplied = false;

            try {
                // Call Vercel Serverless Function `/api/chat` (powered by Google Gemini)
                const controller = new AbortController();
                const timeoutId = setTimeout(function () {
                    controller.abort();
                }, 14000); // 14-second network timeout

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

                if (response.ok) {
                    const data = await response.json();
                    if (data && typeof data.reply === 'string' && data.reply.trim()) {
                        removeTypingIndicator();
                        appendMessage('bot', data.reply.trim(), false);
                        conversationHistory.push(userTurn);
                        conversationHistory.push({ role: 'model', text: data.reply.trim() });
                        botReplied = true;
                        return;
                    }
                }
            } catch (err) {
                // Network error, CORS, local development, or offline
                console.info('Safkat AI: Serving via local knowledge engine.');
            }

            // Fallback: If API was unreachable, unconfigured, or offline, serve instant answer from local grounded knowledge base
            if (!botReplied) {
                setTimeout(function () {
                    removeTypingIndicator();
                    const localReply = getBotResponse(text);
                    appendMessage('bot', localReply, false);
                    conversationHistory.push(userTurn);
                    conversationHistory.push({ role: 'model', text: localReply });
                }, 300);
            }
        }

        // Form Submit
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleUserQuery();
        });

    });

})();
