# MyShortBIZ Project Scope Summary

## Overview

MyShortBIZ is a creator-focused business platform built as a full-stack web application. At a high level, the project aims to give creators and small businesses a single place to manage identity, content, monetization, AI-assisted marketing tools, and experimental business automation workflows.

The repository is not just a thesis demo. It contains:

- A React/Vite frontend with public marketing pages and authenticated creator tools
- A FastAPI backend with authentication, billing, content APIs, AI generation endpoints, and telephony/thesis features
- A local voice cloning subsystem used by the Barrett thesis workflow
- Payment and credit infrastructure used to meter AI features
- A mix of fully implemented modules, partially integrated tools, and UI placeholders for future creator features

## Product Direction

The product is positioned as an all-in-one creator/business suite. The main idea is to reduce tool fragmentation by combining:

- Public-facing landing pages
- Creator profile and page-building tools
- Link management and analytics
- AI content-generation tools
- Billing, subscriptions, and credits
- Experimental AI voice and telephony automation

The homepage and creator dashboard both reflect this positioning: creators are meant to manage pages, offers, content, and automation from one account.

## Primary Frontend Areas

### 1. Public Marketing Site

The public site is built in React and includes:

- Home
- About
- Features
- Solutions
- Pricing
- Resources
- Contact

These pages communicate the product vision as a creator-business platform with pages, products, analytics, and integrated workflows.

### 2. Authentication and Account Access

The frontend includes:

- Sign in
- Register
- Protected routes
- Auth context for token/session handling

Authenticated users are routed into the creator dashboard and tool-specific pages.

### 3. Creator Dashboard

The main authenticated dashboard is `src/CreatorHome/CreatorHome.tsx`. It acts as the hub for the platform and links users to:

- CV
- Link
- Settings
- Shop
- Store
- Studio
- Blog
- Social
- Video
- Thesis
- Bio

This dashboard also surfaces subscription plan and available credit balance from the billing system.

### 4. CV / Resume Tools

The CV area includes:

- A resume/CV builder UI
- Portfolio-oriented CV pages
- AI CV generation through the backend

The CV builder collects structured resume data and sends it to `/ai/cv/generate`, where OpenAI is used to return ATS-friendly Markdown output.

### 5. Bio Generator

The Bio page provides a structured form for generating polished bios tailored to:

- Platform
- Tone
- Profession/niche
- Audience
- Achievements
- Skills

This is backed by `/ai/bio/generate`.

### 6. Social Copy Generator

The Social page generates short-form social posts based on:

- Platform
- Topic
- Tone
- Audience
- CTA
- Hashtag preference

This is backed by `/ai/social/generate`.

### 7. Blog Generator

The Blog interface is one of the richer creator tools. It supports:

- Topic and keyword input
- Description/instruction input
- Target word count
- Optional content styles such as bullets, numbered sections, Q&A, charts, and meta descriptions

The backend generates Markdown blog content and stores blog records for the user. The service also supports refinement/editing flows.

### 8. Video Generation and Prompt Building

The Video area supports two related workflows:

- Direct AI video prompt submission
- Structured campaign inputs that are converted into richer prompts

The backend includes:

- A video prompt builder service for prompt packaging
- An AI video router for job creation and job refresh
- Persistent `VideoJob` records

The project is designed around Runway as the video provider.

### 9. Link Hub / Short Links / Analytics

The Link section combines two concepts:

- A creator page or "link in bio" style hub
- AI-assisted short-link generation and analytics

Frontend pages include:

- Link home
- Link creation
- Links list
- Analytics
- Disappearing notes
- View note
- Blockchain verification

Not every screen is deeply wired yet, but the backend does contain real support for:

- AI-generated short-link metadata
- Short-code redirects
- Click analytics
- Creator page blocks
- Public page views and click tracking

### 10. Thesis / AI Voice / Telephony

The thesis area is the most specialized subsystem in the repository. It implements a guided workflow for:

- Reference audio upload
- Consent acknowledgment
- Voice profile generation
- Business agent configuration
- Vapi phone setup
- Test-call review
- Live browser conversation

This is the Barrett honors thesis vertical slice and the most advanced feature in the repo from a systems perspective.

### 11. Placeholder or Early-Stage Creator Modules

Some routed creator pages exist mostly as scaffolding or placeholders at the moment, especially:

- Shop
- Store
- Studio

These are part of the intended platform direction, but in the current repository they are not as fully implemented as the AI content, billing, link, and thesis systems.

## Backend Architecture

The backend is a FastAPI application in `server/main.py`. It is structured around:

- Core routers always loaded at startup
- Optional routers loaded dynamically when available
- SQLAlchemy models and SQLite persistence
- Environment-driven integrations for AI, payments, and telephony

Core always-on routers:

- `auth`
- `contact`
- `pricing`
- `payments`
- `content`
- `thesis`
- `vapi`

Optional routers:

- `blog`
- `dashboard`
- `ai_cv`
- `ai_bio`
- `ai_social`
- `ai_link`
- `ai_video`
- `video_prompt_builder`

This means the app is architected as one shared backend with modular features rather than separate microservices.

## Core Backend Capability Areas

### Authentication and Users

The auth system includes:

- Registration
- Login
- JWT access tokens
- Current-user retrieval
- Basic profile updates

The `User` model also stores token/credit balance and relationships to subscriptions and thesis projects.

### Billing, Credits, and Plans

The billing system is a major part of the platform design. It includes:

- Subscription plans
- Credit ledger
- Billing summaries
- Feature-cost exposure
- Stripe checkout/webhooks
- BTCPay checkout/webhooks
- Subscription activation and tracking

AI features are generally credit-metered, and multiple services use idempotency keys plus refund logic when a generation task fails.

### AI Usage Tracking

The backend records AI usage in `AIUsage`, including:

- Feature name
- Model used
- Prompt/completion/total tokens
- Estimated USD cost

This gives the platform a basis for analytics, billing transparency, and feature metering.

### Content and Page Builder

The content system supports:

- A user-owned page
- Configurable blocks on that page
- Public page retrieval by slug
- View tracking
- Link click tracking

This is the strongest evidence that MyShortBIZ is meant to be more than a collection of AI tools; it is also trying to be a hosted creator-page platform.

### Short Links

The short-link subsystem supports:

- AI-generated short-link records
- Unique short-code enforcement
- Redirect handling
- Per-user short-link listing
- Analytics endpoints

The AI layer generates suggested short code, title, description, and CTA text, then the backend stores the record and serves redirect/analytics flows.

### Blog Generation

The blog subsystem supports:

- AI blog creation
- Refinement/editing
- Feature-based token cost estimation
- Markdown-to-HTML conversion
- Blog persistence per user

This is more than a simple prompt wrapper; it has storage, structured feature flags, and usage accounting.

### AI Bio / CV / Social / Video Prompt Services

These services are consistent in structure:

- They build structured prompts from user input
- Charge credits with idempotency protection
- Call OpenAI
- Log AI usage
- Refund credits if generation fails

This repeated pattern suggests the platform is organized around reusable "AI tool as a product feature" flows rather than one-off experiments.

## Thesis and Telephony Subsystem

The thesis area is a distinct vertical slice inside the larger platform.

It includes:

- `ThesisProject` persisted state
- `TelephonySession` persisted call state
- A local voice-cloning backend using Chatterbox-based models on CPU
- Generated audio preview and telephony PCM caching
- Background generation and warmup jobs
- A Vapi inbound telephony integration
- Browser-based live conversation with the cloned voice

Important thesis principles reflected in the implementation:

- Consent-first workflow
- Disclosure that callers are speaking to an AI agent
- Separation of browser workflow and phone-channel workflow
- Runtime reliability work such as cache warming, cleanup, and health checks

This is the most technically complex feature in the repository and also the most clearly documented one.

## Persistence Layer

The project uses SQLAlchemy models and SQLite databases. Important persisted entities include:

- `User`
- `Plan`
- `Subscription`
- `PaymentEvent`
- `CreditLedger`
- `Page`
- `Block`
- `PageView`
- `LinkClick`
- `ShortLink`
- `Blog`
- `AIUsage`
- `VideoJob`
- `ThesisProject`
- `TelephonySession`

Overall, the schema shows that the app is trying to combine SaaS billing, creator pages, AI feature usage, and thesis experimentation in one persistent data model.

## External Integrations

The current repository integrates with or is structured around:

- OpenAI for text-generation features
- Runway for AI video jobs
- Stripe for card billing
- BTCPay for Bitcoin payments
- Vapi for telephony
- A local voice daemon for CPU-based voice generation
- ngrok/public tunneling for local telephony development

These integrations are environment-variable driven and are part of the intended production-style workflow.

## Developer Workflow and Scripts

The repository includes scripts for:

- Running the full local dev stack
- Starting the voice daemon
- Exposing the backend publicly
- Preparing telephony/Vapi routing
- Warming phone reply caches
- Benchmarking thesis-agent and phone-call flows
- Cleaning the dev stack

This means the repo is not just a front-end prototype. It includes operational tooling for running and validating a multi-service local environment.

## Current State of the Codebase

The repository appears to be a hybrid of:

- Real implemented product features
- Active honors-thesis engineering work
- In-progress creator tools
- Placeholder UI surfaces for future expansion

The most complete end-to-end systems today appear to be:

- Authentication
- Billing/credits/plans
- AI bio/CV/social generation
- Blog generation
- Link/content analytics foundations
- Thesis voice and telephony workflow

Less complete or more UI-shell-oriented areas include:

- Shop
- Store
- Studio
- Some creator-facing navigation surfaces that do not yet map to equally mature backend features

## Best One-Sentence Summary

MyShortBIZ is a creator-business SaaS platform that combines account management, subscription billing, AI-powered content tools, creator-page/link infrastructure, and a Barrett thesis subsystem for consent-first AI voice cloning and business phone automation.

## Best Summary for Another Agent

If another agent needs the shortest practical handoff:

> This repo is a React + Vite frontend and FastAPI backend for a creator-focused SaaS called MyShortBIZ. It includes auth, subscriptions, credits, pricing, contact/content/page APIs, AI tools for bios/CVs/social/blog/video prompts, short-link and analytics infrastructure, and a large Barrett thesis subsystem for local voice cloning plus Vapi telephony. Some creator dashboard modules are fully wired, while others are still UI placeholders. The thesis/telephony feature is the deepest technical area, but it sits inside a broader multi-tool creator platform rather than being the whole product.
