import type { CaseStudy } from "../CaseStudy";

/** Floont (first shipped as Fluently): a speaking-practice web app. Written as a case study; facts match the shipped app. */
export const floont: CaseStudy = {
    lead:
        "A web app that helps people speak without filler words. You answer a question out loud, and it shows every \"um\", every pause in the middle of a sentence, and every phrase you repeat, then scores the answer. Speech is turned into text inside your browser, so your audio stays on your own device unless you choose to save it.",

    liveLink: "https://floont.com",
    codeNote: "The GitHub repository is private.",

    glance: [
        { term: "Role", text: "Solo" },
        { term: "Status", text: "Live, in active development" },
        { term: "Pricing", text: "Free, or $5 a month for Plus" },
    ],

    sections: [
        {
            id: "overview",
            title: "Overview",
            blocks: [
                {
                    p: "Fillers like \"um\", \"like\", and \"you know\" make a speaker sound less sure of themselves, and they are hard to notice in your own speech. The usual fix is to record yourself and listen back. That takes time, and most people never do it.",
                },
                {
                    p: "Floont makes that loop take seconds. Pick a question, press Start talking, and answer. When you stop, you see your answer as a transcript and on a timeline, with each mistake marked and a score out of 100. You can play back the exact moment of any mistake, then try the same question again or move on to the next one.",
                },
                {
                    p: "It started as a personal project called Fluently. As it grew into a real product, I renamed it, moved it to its own domain, and added accounts, billing, and email.",
                },
                {
                    figure: {
                        src: "/assets/images/floont_landing.png",
                        alt: "Floont landing page with the headline Speak with confidence and a sample answer with fillers, a pause, and a repeat marked",
                        caption: "The landing page. The sample answer on the right marks each kind of mistake Floont checks for.",
                    },
                },
            ],
        },
        {
            id: "problem",
            title: "The problem",
            blocks: [
                { p: "I set four requirements before writing any code:" },
                {
                    list: [
                        { term: "Instant feedback.", text: "Results within seconds of finishing an answer, with the mistakes marked on what you said." },
                        { term: "Private by default.", text: "Practice recordings are personal. Audio should not leave the device unless the user asks for that." },
                        { term: "Useful for free, cheap to run.", text: "The core checks had to work for everyone without a subscription, and without paid speech or AI services behind them." },
                        { term: "Fair judgment.", text: "\"Like\" is a filler in \"it was, like, fine\" but not in \"I like pizza\". A tool that flags both gets ignored quickly." },
                    ],
                },
                {
                    p: "The last two pull against each other. Cloud speech and language APIs are the easy way to get accurate results, but they cost money and send audio to someone else's servers. Most of the design work went into getting good results without them.",
                },
            ],
        },
        {
            id: "features",
            title: "What it does",
            blocks: [
                {
                    list: [
                        { term: "Three checks.", text: "Filler words; pace, which separates pauses between thoughts (good) from pauses in the middle of a phrase (a mistake); and redundancy, which catches repeated hedges like \"I think\", crutch words like \"basically\", and phrases that say the same thing twice." },
                        { term: "719 questions, picked for you.", text: "Behavioral, technical, meeting, presentation, casual, and storytelling questions across 19 fields, from software engineering and information systems to law and healthcare. Your role picks your field, and some questions are worded for it, for example \"Why do you want to work as an ICU nurse?\"" },
                        { term: "Fitted to your career level.", text: "Early-career, mid-level, senior, and manager questions go only to people at that level. Software engineers also get system design, concepts like object-oriented programming, and coding problems to talk through." },
                        { term: "Your own questions.", text: "Add questions you want to practice, or paste a job description to get suggestions from it." },
                        { term: "Learns your habits.", text: "Questions you answer come up more, and ones you skip come up less. Names you correct in a transcript are fed back to the speech engine so it spells them right next time." },
                        { term: "13 drills and mock interviews.", text: "A filler-free streak that ends at your first filler, reading a passage with marked pauses, STAR stories, 45-second elevator pitches, tough questions with three seconds to prepare, and a five-question mock interview whose last question follows your career level." },
                        { term: "Community exercises.", text: "Users can publish their own question sets for others to practice, with reporting and automatic hiding of reported sets." },
                    ],
                },
                {
                    figure: {
                        src: "/assets/images/floont_practice.png",
                        alt: "Practice page showing a question, a question type menu, focus toggles for fillers, pace, and redundancy, and a Start talking button",
                        caption: "Practice. Choose a kind of question and the checks you want scored, then answer out loud.",
                    },
                },
            ],
        },
        {
            id: "results",
            title: "The results page",
            blocks: [
                {
                    p: "The results page answers three questions in order: how did I do, where did it go wrong, and what did I actually say.",
                },
                {
                    list: [
                        { term: "Score.", text: "Every answer starts at 100, and each mistake costs 5 points. The list under the score shows each deduction and when it happened." },
                        { term: "Timeline.", text: "The whole answer as one strip, with each filler, pause, and repeat marked where it happened. It is also the audio player: click a mark to hear that moment, or drag along the strip to scrub." },
                        { term: "Transcript.", text: "Each tab marks its own kind of mistake in the text. Words the analyzer is unsure about get a dashed outline, and you decide whether they count." },
                        { term: "Fix it yourself.", text: "If the speech engine misheard a word, you can edit the transcript and the score updates." },
                    ],
                },
                {
                    figure: {
                        src: "/assets/images/floont_results.png",
                        alt: "Results page with a score of 70 out of 100, a list of deductions, a timeline of marks, and the transcript with fillers highlighted",
                        caption: "Results for a sample answer: the score and deductions, the timeline, and the transcript with fillers marked. A dashed outline means Floont is not sure.",
                    },
                },
            ],
        },
        {
            id: "architecture",
            title: "How it works",
            blocks: [
                { p: "Everything that touches audio runs in the browser. The server only stores what the user chooses to save." },
                {
                    steps: [
                        { term: "Record.", text: "The browser records the answer with the MediaRecorder API." },
                        { term: "Transcribe.", text: "OpenAI's Whisper model (base.en) runs on the device through transformers.js, in a Web Worker so the page stays responsive. The model downloads once (about 80 MB) and is cached. It returns each word with a start and end time." },
                        { term: "Analyze.", text: "Rule-based analyzers in TypeScript read those words. Fillers are judged with part-of-speech tags from the compromise library, so the verb \"like\" is not flagged. Pace is judged from the gaps between word timestamps. Redundancy is judged from repeated phrases over a time window." },
                        { term: "Score and save.", text: "The score is computed on the device. If the user is signed in, the transcript and results are saved to their account." },
                    ],
                },
                {
                    list: [
                        { term: "Frontend.", text: "React 19, TypeScript, and Vite, hosted on Vercel." },
                        { term: "Backend.", text: "Supabase: Postgres, auth (email and Google), file storage for opt-in recordings, scheduled jobs, and Deno Edge Functions for the AI check, billing, reminder emails, and account deletion." },
                        { term: "Speech.", text: "Whisper base.en through transformers.js, with a prompt that keeps fillers in the transcript; by default Whisper tends to clean them out." },
                        { term: "Payments and email.", text: "Stripe for subscriptions and Resend for email, with their secret keys kept only on the server." },
                    ],
                },
            ],
        },
        {
            id: "privacy",
            title: "Privacy and security",
            blocks: [
                { p: "Privacy shaped the architecture, not only the settings page." },
                {
                    list: [
                        { term: "Audio stays local.", text: "Recordings are uploaded only if the user turns on saving recordings, which is off by default. They go to a private storage bucket, one folder per user, and can all be deleted from Settings." },
                        { term: "Row Level Security on every table and bucket.", text: "A SQL test signs in as two users and checks that neither can read or change the other's data. It is extended whenever a table is added." },
                        { term: "Strict Content Security Policy.", text: "No inline scripts or styles. Transcripts are rendered as plain text, never as HTML, so nothing a user says can inject markup." },
                        { term: "Adults only.", text: "Each account answers a one-time age and country check. Only whether the person is 18 or older is stored, never the birth date." },
                        { term: "Abuse limits.", text: "Sign-up is protected by Cloudflare Turnstile, and AI requests are rate-limited per user in the database." },
                        { term: "Plain-language policies.", text: "I wrote the Privacy Policy and Terms of Use to match exactly what the code does, with a summary at the top of each." },
                    ],
                },
            ],
        },
        {
            id: "ai",
            title: "Optional AI feedback",
            blocks: [
                {
                    p: "Rules can tell how you spoke, but not whether what you said was any good. So I added an optional second opinion from Google's Gemini. It is off by default. When it is on, only the transcript and the question are sent, never the audio.",
                },
                {
                    list: [
                        { term: "Sharper delivery checks.", text: "Gemini reads for meaning, so it makes better filler calls and catches talking in circles: saying the same idea again without adding anything." },
                        { term: "Content feedback.", text: "Whether the answer fits the question, is correct, is well structured, specific, and complete, with what worked, what to fix, and an outline of a stronger answer." },
                        { term: "Never trusted blindly.", text: "Every word span Gemini returns is checked in the browser against the real transcript before it is shown. Content feedback never changes the score." },
                        { term: "Always a fallback.", text: "If Gemini is slow, rate-limited, or down, the answer is checked by the browser's rules as before, with no error shown." },
                    ],
                },
                {
                    figure: {
                        src: "/assets/images/floont_content.png",
                        alt: "Content tab with a one-line summary, verdicts for on topic, structure, specific, and complete, what worked, what to fix, and an outline of a stronger answer",
                        caption: "The Content tab for a sample answer: a verdict for each criterion, what worked, what to fix, and an outline of a stronger answer.",
                    },
                },
            ],
        },
        {
            id: "product",
            title: "Turning it into a product",
            blocks: [
                {
                    p: "The checks that run in the browser cost nothing per user, so they stay free. Gemini is the one feature with a real per-use limit, which made it the natural line between the free plan and a paid one.",
                },
                {
                    list: [
                        { term: "Floont Plus.", text: "Free accounts get three Gemini-checked answers a day; Plus is $5 a month with no daily cap beyond fair use. Stripe Checkout takes the payment, a webhook keeps each subscription in step, and the plan is only ever checked on the server." },
                        { term: "Creator referrals.", text: "Creators get a link, code, and QR code that give their audience a 7-day trial. An admin page shows sign-ups and conversions per creator as counts only, never who signed up." },
                        { term: "Reminder emails.", text: "An hourly job can email someone when a streak of three days or more is about to end, or when their weekly goal is slipping. They are opt-in and off by default, sent in the user's own evening, with a one-click unsubscribe." },
                    ],
                },
            ],
        },
        {
            id: "engagement",
            title: "Building a habit",
            blocks: [
                {
                    p: "A practice tool only helps if people come back to it. The home page turns each day into a short path: a warm-up, two focused answers, one answer with everything checked, and a drill. Points, streaks, daily quests, and leaderboards give a light reason to return. Leaderboards show first name and last initial only, and users can opt out.",
                },
                {
                    figure: {
                        src: "/assets/images/floont_home.png",
                        alt: "Home page with a daily path of five steps, a streak and points card, a leaderboard, daily quests, and the week's progress",
                        caption: "Home, with sample data: today's path on the left, and the streak, points, leaderboard, quests, and activity on the right.",
                    },
                },
                {
                    figure: {
                        src: "/assets/images/floont_history.png",
                        alt: "History page with filters on the left, totals, a line chart of score rising over twelve answers, and a list of past answers",
                        caption: "History, with sample data: score over time, with past answers to search, filter, and reopen.",
                    },
                },
                {
                    figure: {
                        src: "/assets/images/floont_exercises.png",
                        alt: "Exercises page with search, focus, progress, and sort controls above sideways rows of drills grouped by fillers and pace",
                        caption: "Drills that target one habit at a time, in sideways rows by skill, plus a Community tab for exercises other users publish.",
                    },
                },
            ],
        },
        {
            id: "challenges",
            title: "Challenges",
            blocks: [
                {
                    list: [
                        { term: "Telling a filler from a real word.", text: "\"Like\", \"so\", and \"just\" are fillers only some of the time. The analyzer marks a word as certain only when the grammar settles it; otherwise it marks it as possible and the speaker decides. Those decisions are remembered, and after two of the same call Floont makes it for them." },
                        { term: "A large model in a browser tab.", text: "Running Whisper on the device meant a one-time 80 MB download, a Web Worker to keep the page responsive, and a progress bar so the first wait is clear." },
                        { term: "Browser quirks.", text: "Chrome saves recordings without a duration, which breaks seeking in the audio player. The player works around it by seeking past the end once so the browser computes the duration, then jumping back." },
                        { term: "AI on a free tier.", text: "Early on, Gemini requests timed out. I split delivery and content into separate requests, capped output length, limited the model's reasoning effort, and moved the content check to the background so results show right away." },
                        { term: "Counting a free allowance fairly.", text: "Splitting those requests meant one answer made two calls, and limiting them separately let a free account get a fourth answer checked. The limit now counts each transcript once per day, using a hash and a database lock so simultaneous requests can't slip past it." },
                    ],
                },
            ],
        },
        {
            id: "practices",
            title: "How I built it",
            blocks: [
                {
                    list: [
                        { term: "Small pull requests.", text: "Every change goes through a feature branch and a pull request. GitHub Actions run tests, linting, and a production build, and Vercel builds a preview of each one." },
                        { term: "Real transcripts as tests.", text: "When the analyzer gets a real recording wrong, that exact transcript becomes a regression test before the rule is fixed." },
                        { term: "Pure logic, tested.", text: "Scoring, question picking, pause classification, and filler rules are pure functions, separate from the UI, covered by nearly 500 unit tests." },
                        { term: "Notes alongside the code.", text: "Decisions, module notes, and status are kept in a linked notes vault, so the reasons behind a choice are written down." },
                    ],
                },
            ],
        },
        {
            id: "next",
            title: "What's next",
            blocks: [
                {
                    list: [
                        "Offering Gemini in the EEA, Switzerland, and the UK, which its free tier doesn't allow.",
                        "More questions, shaped by what users skip and answer.",
                        "More drills, such as spotting your own fillers and clean transitions between points.",
                    ],
                },
            ],
        },
    ],
};
