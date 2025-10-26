# 🌙 Slumberland - Dream Journal with 12 Agentic Gods

A mystical dream journal app powered by AI analysis, featuring the 12 Jungian archetypes (agentic gods) system for dream interpretation.

## Features

- ✨ **AI-Powered Dream Analysis** - Dream symbols analyzed using OpenRouter AI
- 🏛️ **12 Agentic Gods (Archetypes)** - Symbols matched to Jungian archetypes:
  - The Shadow
  - The Anima/Animus
  - The Hero
  - The Wise Old Man/Woman
  - The Great Mother
  - The Trickster
  - The Magician
  - The Destroyer
  - The Child
  - The Maiden
  - The Father
  - The Self
- 🌍 **Multi-Cultural Lenses** - Interpretations from:
  - Jungian Psychology
  - Yoruba spirituality
  - Chinese philosophy
  - Hindu traditions
  - Native American beliefs
  - Aboriginal Dreamtime
- 🎯 **Dream Circles** - Share dreams in private communities
- 🕯️ **Rituals** - Create and track dream-related rituals
- 🔊 **Voice Transcription** - Record dreams, auto-transcribe
- 📊 **Pattern Detection** - AI detects recurring themes
- 🏆 **Gamification** - Streaks, achievements, quests
- 🛍️ **Marketplace** - Dream products and subscriptions

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up database
pnpm db:push

# Seed archetypes and cultural lenses
# (Will run automatically with setup script)

# Start development server
pnpm dev
```

Visit: http://localhost:3000

## Deployment

Already configured for:
- ✅ Vercel
- ✅ Railway
- ✅ Render

Just push to GitHub and deploy!

```bash
./deploy.sh
```

## Environment Variables

See `env.example` for all required variables:
- OpenRouter API key (for AI analysis)
- Stripe keys (for payments)
- Database connection
- MinIO setup

## Technology Stack

- **Frontend:** React, TanStack Router, TanStack Query
- **Backend:** tRPC, Prisma
- **Database:** PostgreSQL
- **AI:** OpenRouter (GPT-4, Claude)
- **Storage:** MinIO
- **Deployment:** Docker, Vercel, Railway, Render

## The 12 Agentic Gods System

Every dream symbol gets matched to one of the 12 core archetypes, providing deep psychological insights through multiple cultural lenses.

**Built with 💜 and dreams**

