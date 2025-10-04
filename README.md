# DearRegards ✉️

AI-Powered Professional Email Tone Converter — From Rage to Respect

1. Overview

We’ve all written emails in frustration, only to regret them later.
DearRegards ensures that never happens again.

This intelligent, full-stack application transforms angry or unprofessional drafts into polished, respectful, and effective messages — without losing your original intent.

Problem: Harsh emails damage credibility and relationships.

Solution: Use Generative AI to automatically rewrite drafts into professional alternatives.

Live Demo:

🔗 Backend → https://dearregards.onrender.com

🔗 Frontend → https://dear-regards.vercel.app/

Try it out now!
use the following test email:
Email: lalala@gmail.com
Password: lalala

2. ✨ Key Features

🤖 Generative AI Engine — Rewrite angry drafts into professional versions using advanced AI models.

🔐 User Authentication — Secure registration and login.

📩 OTP Verification — Email-based one-time password verification for new accounts.

🎭 Customizable Tone — Choose from Professional, Diplomatic, Formal, or Casual.

🎙 Voice-to-Text Input — Dictate emails via microphone; instantly transcribed and rewritten.

📧 Direct Gmail Integration — Open your AI-polished email directly as a Gmail draft.

✅ All features are live and working — try them now!

3. Core Implementation Concepts
3.1 Prompt Engineering

Zero/One/Multi-shot prompting for reliable rewrites.

Dynamic prompting adjusts based on detected anger intensity.

System/User prompts maintain consistent politeness.

Chain-of-thought prompting improves accuracy of tone conversion.

3.2 Output Formatting

Clean, structured JSON output:

{
  "original": "...",
  "polite": "..."
}


Stop sequences ensure output contains only the polished draft.

3.3 Sampling & Tokenization

Temperature:

Low → safer, consistent tone

High → creative alternatives

Top-K / Top-P sampling for diverse but controlled responses.

3.4 Embeddings & Vector Database

Embeddings represent emails as semantic vectors.

Vector DB (Pinecone/Faiss) stores past conversions for retrieval.

Similarity measures (cosine, dot product, L2 distance) ensure meaning is preserved.

3.5 Function Calling

Built-in check_politeness() verifies tone score before output.

3.6 Evaluation & Testing

Dataset: 50+ angry → polite test pairs.

Benchmarks:

Correctness → preserves meaning

Efficiency → <2s per conversion

Scalability → 10k+ daily conversions

4. Example

Input (Angry):

You people messed up AGAIN. I can’t believe how useless your service is!


Output (Polite):

{
  "original": "You people messed up AGAIN. I can’t believe how useless your service is!",
  "polite": "I noticed an issue with my service again and would really appreciate your help in resolving it quickly."
}

5. Deployment & DevOps (Coming Soon 🚀)

We are building a CI/CD pipeline using GitHub Actions and DevOps best practices for seamless integration and delivery.
This will enable continuous updates and professional-grade deployment. Stay tuned!

6. Tech Stack

Frontend: React.js (Vercel deployment)

Backend: Node.js + Express.js (Render deployment)

AI/LLM: OpenAI GPT models

Database: MongoDB + Vector DB (Pinecone / Faiss)

7. Author

👩‍💻 Project by Manya Behl

✨ With DearRegards, every email you send leaves the right impression.