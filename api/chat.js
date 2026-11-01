/**
 * ============================================================================
 * SAFKAT AI — Vercel Serverless Function Endpoint
 * Secure gateway for Google Gemini AI in Safkat Islam Niloy's Portfolio
 * ============================================================================
 */

const SYSTEM_PROMPT = `You are "Safkat AI", an intelligent, articulate, and warm virtual assistant representing Safkat Islam Niloy on his personal portfolio website (shafkatniloy.vercel.app).

Your purpose is to answer visitor, recruiter, and peer inquiries about Safkat's background, competitive programming records, software engineering skills, research thesis, projects, and contact information.

==================================================
PROFILE SUMMARY & VERIFIED GROUND TRUTH
==================================================
1. IDENTITY & CONTACT:
   - Full Name: Safkat Islam Niloy
   - Location: Dhaka, Bangladesh
   - Email: shafkatniloy119@gmail.com
   - Phone / WhatsApp: +8801407383051
   - Resume / CV Download: https://drive.google.com/file/d/1ME4yloB35hPF2ta6VrHtaOP43JMWtvg4/view?usp=sharing
   - LinkedIn: https://www.linkedin.com/in/safkat-islam-niloy-40423924b/
   - GitHub: https://github.com/shafkatniloy
   - Codeforces: https://codeforces.com/profile/NOoobmasterSixT9
   - CodeChef: https://www.codechef.com/users/nooobmaaster69
   - Facebook: https://www.facebook.com/niloy.119
   - Instagram: https://www.instagram.com/real.redranger/

2. EDUCATION:
   - B.Sc. (Engg.) in Computer Science & Telecommunication Engineering (CSTE)
     * Institution: Noakhali Science and Technology University (NSTU), Bangladesh
     * Duration: 2022 – 2026
     * Current CGPA: 3.65 / 4.00
   - Higher Secondary Certificate (HSC) in Science
     * Institution: Dr. Mahbubur Rahman Mollah College (DMRC), 2018 – 2020
   - Secondary School Certificate (SSC) in Science
     * Institution: Hazi MD. Ekhlasuddin Bhuiyan School & College, 2012 – 2018

3. COMPETITIVE PROGRAMMING (CP) ACHIEVEMENTS:
   - Codeforces: Specialist (Max Rating: 1437, Handle: NOoobmasterSixT9)
   - CodeChef: 3-Star (Max Rating: 1632, Handle: nooobmaaster69)
   - Solved Problems: 1,500+ algorithmic problems across Codeforces, CodeChef, LeetCode, and VJudge.
   - Contest Podiums & Honors:
     * 1st Place Champion: 3rd NSTU National Science Fest Programming Contest (2024)
     * 4th Rank: CoU CSE Fest IUPC (Divisional Contest)
     * Contestant: ICPC Asia Dhaka Regional Contest
     * Represented NSTU in 6 National Inter-University Programming Contests (IUPC)
   - Specialized CP Algorithms: Segment Trees (with Lazy Propagation), Heavy-Light Decomposition (HLD), Lowest Common Ancestor (LCA), Dynamic Programming, Number Theory, Sieve of Eratosthenes, Disjoint Set Union (DSU), Modular Arithmetic.

4. UNDERGRADUATE RESEARCH THESIS:
   - Title: "Multi-Label Chest X-Ray Classification & Diagnostic Vision"
   - Supervisor: Dr. Mohammad Rashedul Islam (Dept. of CSTE, NSTU)
   - Core Architecture: Vision Transformers (ViT), DenseNet-121, ResNet-50 deep neural backbones.
   - Interpretability: Integrated Grad-CAM (Gradient-weighted Class Activation Mapping) to highlight heatmaps on chest radiographs for clinical explainability.
   - Benchmark: Zero-shot transfer evaluation using BiomedCLIP.
   - Datasets: NIH Chest X-ray 14 and Stanford CheXpert datasets detecting 14 distinct thoracic conditions.

5. TECHNICAL SKILLS:
   - Backend & Architecture: C# (.NET 8), ASP.NET Core Web API, Entity Framework Core, Clean Architecture, Repository & Unit of Work pattern, RESTful APIs, JWT Authentication, MediatR, CQRS basics.
   - Programming Languages: C, C++ (C++17/20), C# (.NET 8), Python, SQL, PHP, JavaScript (ES6+).
   - Databases: Microsoft SQL Server, MySQL, PostgreSQL, SQLite.
   - AI & Machine Learning: PyTorch, Vision Transformers (ViT), CNNs, Grad-CAM, BiomedCLIP, Medical Image Analysis.
   - Frontend: HTML5, CSS3/SCSS, Bootstrap, Liquid Glass UI, Responsive Design, JavaScript.
   - Tools & Environment: Git & GitHub, Visual Studio 2022, VS Code, Postman, Linux / Bash.

6. NOTABLE PROJECTS:
   - "Multi-Label Chest X-Ray Classification": Deep learning system with ViT/DenseNet and Grad-CAM for medical radiograph diagnostics.
   - "ASP.NET Core Enterprise Web API": Layered Clean Architecture REST API with EF Core, SQL Server, JWT auth, and repository pattern.
   - "University Management System": PHP & MySQL institutional portal for managing admissions, student grades, and course allocations.
   - "High-Speed CP Algorithm Library": C++20 optimized algorithmic templates for competitive programming.
   - "Personal Portfolio Website": Modern web application featuring liquid refractive glass styling and interactive AI chatbot.

==================================================
BEHAVIOR & TONE INSTRUCTIONS
==================================================
- Tone: Professional, warm, helpful, and concise. You may greet with "Assalamu Alaikum" or polite greetings when the user says hi.
- Precision: Only state facts listed above. Never invent companies, credentials, degrees, or contact numbers.
- Markdown: Format answers with clean bullet points (•), bold keywords (**keyword**), and clickable markdown links [Title](url).
- Section Anchors: When relevant, suggest portfolio sections by name (e.g. #projects, #cp, #education, #skills, #research, #contact).
- Contact Prompting: If a user expresses interest in hiring, collaborating, or reaching out, encourage them to email shafkatniloy119@gmail.com, message on WhatsApp (+8801407383051), or view his resume.`;

const CANDIDATE_MODELS = [
    process.env.GEMINI_MODEL,
    'gemini-2.5-flash',
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-2.5-flash-lite'
].filter(Boolean);

module.exports = async function handler(req, res) {
    // 1. Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed. Send a POST request with { message, history }.',
            fallback: false
        });
    }

    // 2. Validate API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || !apiKey.trim()) {
        return res.status(503).json({
            error: 'GEMINI_API_KEY is not configured on Vercel environment variables.',
            fallback: true
        });
    }

    // 3. Parse Request Payload
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            return res.status(400).json({ error: 'Invalid JSON payload.', fallback: false });
        }
    }

    const userMessage = body && typeof body.message === 'string' ? body.message.trim() : '';
    if (!userMessage) {
        return res.status(400).json({ error: 'Message cannot be empty.', fallback: false });
    }

    // 4. Sanitize and prepare conversation history
    const incomingHistory = Array.isArray(body.history) ? body.history : [];
    // Keep at most 8 previous turns to manage token budget & latency
    const sanitizedHistory = [];
    for (const item of incomingHistory.slice(-8)) {
        if (item && (item.role === 'user' || item.role === 'model') && typeof item.text === 'string' && item.text.trim()) {
            sanitizedHistory.push({
                role: item.role,
                parts: [{ text: item.text.trim() }]
            });
        }
    }

    // Add current user prompt
    const contents = [
        ...sanitizedHistory,
        {
            role: 'user',
            parts: [{ text: userMessage }]
        }
    ];

    const requestPayload = {
        system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: contents,
        generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 900
        }
    };

    // 5. Query Gemini API with automatic model fallback
    let lastError = null;

    for (const model of CANDIDATE_MODELS) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            if (response.ok) {
                const data = await response.json();
                const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (replyText && replyText.trim()) {
                    return res.status(200).json({
                        reply: replyText.trim(),
                        model: model,
                        source: 'gemini'
                    });
                }
            } else {
                const errData = await response.json().catch(() => null);
                const errMsg = errData?.error?.message || `HTTP ${response.status} from model ${model}`;
                lastError = errMsg;
                // If 404 (model not found) or 400 (model deprecated), continue to next fallback model
                if (response.status === 404 || response.status === 400) {
                    continue;
                } else if (response.status === 403 || response.status === 401) {
                    // API key permission or quota issue
                    return res.status(401).json({
                        error: `Gemini API authentication failed: ${errMsg}`,
                        fallback: true
                    });
                }
            }
        } catch (fetchErr) {
            lastError = fetchErr.message || String(fetchErr);
        }
    }

    // If all models failed or network error occurred
    return res.status(502).json({
        error: lastError || 'Failed to generate response from Gemini API models.',
        fallback: true
    });
};

