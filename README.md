# PMOS - Product Manager Operating System

A tool that generates a personalized set of instructions for how you want an AI assistant (Claude, ChatGPT, or similar) to work with you as a PM.

**Live: [ashutosh-nagaria.github.io/pmos](https://ashutosh-nagaria.github.io/pmos)**

## How to use it

1. Open [ashutosh-nagaria.github.io/pmos](https://ashutosh-nagaria.github.io/pmos)
2. Set your working style depth (Skip, Light, or Heavy) for each category: Discovery, Strategy, Documents, Metrics, Execution, Communication, Go-to-Market
3. Select the tools you use
4. Check off the daily habits you want your assistant to follow
5. Optionally turn on design principles or auto documentation
6. Watch the markdown build live in the preview panel on the right
7. Click "Download pmos.md" to save the file to your computer
8. Paste the file's content into your assistant's custom instructions, for example a Claude Project's custom instructions, a ChatGPT custom GPT's instructions, or a `CLAUDE.md` file if you use Claude Code
9. From then on, that assistant follows your working style in every conversation with it

## What it does

Every PM works differently. Some are PRD heavy, some are execution heavy, some live in metrics, some barely touch documents. Most AI tools give every PM the same generic prompts.

PMOS asks you to configure your own working style, tools, and daily habits, then generates a single markdown file. You paste that file into your assistant's custom instructions (a Claude Project, a ChatGPT custom GPT, a `CLAUDE.md` file, etc.) and it behaves according to your actual working style from that point on.

## How it works

Everything runs in your browser. There is no backend, no account, no data sent anywhere.

1. Set depth (Skip / Light / Heavy) for seven working style categories: Discovery, Strategy, Documents, Metrics, Execution, Communication, Go-to-Market
2. Select the tools you use
3. Pick daily habits you want as standing instructions (morning check-ins, escalation flags, end of day summaries, etc.)
4. Optionally add design principles or an auto-documentation habit
5. Download `pmos.md`
6. Paste it into your assistant's custom instructions

## Important limitation

This file only contains instructions. It does not connect to your email, Slack, or calendar itself. Whether a habit like "summarize my overnight email" actually works depends on whether your assistant already has that connector set up on your end. Scheduled behavior (like a fixed 9am trigger) depends on whether your surface supports scheduled tasks, the file itself cannot force a clock trigger.

## Roadmap

- v1 (this version): static generator, download and paste manually
- v2: one click export of a generated PRD or document directly to Google Drive, for users who connect their own account
- v3: a daily agent version that actually runs on a schedule and proactively checks email, Slack, and metrics

v1 is intentionally the scope here. v2 and v3 require OAuth, hosting, and handling other people's account access, which is a different kind of product and a different level of responsibility.

## Local development

Static site, no build step. Open `index.html` in a browser, or serve the folder with any static file server.

## Built by

Ashutosh Nagaria
