<div align="center">

# ShareMe

Visual inspiration. Shared.

Create, discover, and save beautiful ideas with a fast, modern visual sharing experience.

</div>

## Why ShareMe

- Effortless creation: Post images, add titles, descriptions, and links in seconds.
- Curated discovery: Explore trending boards and personalized feeds that learn your taste.
- Save what sparks joy: Collect pins into boards you’ll actually revisit.
- Join the conversation: Comments and reactions keep great ideas moving.
- Lightning-fast experience: Instant search, smooth masonry layouts, and responsive UI.

## Features at a Glance

- Google sign-in for one-tap onboarding
- Create, edit, and delete pins (images with metadata)
- Save pins to custom boards and view your collections
- Rich search by keywords, categories, and users
- Detailed pin view with comments and related content
- Modern responsive UI with masonry grid

## Product Shots

> Replace with your own screenshots or video GIFs

| Home Feed | Pin Detail | Profile |
|---|---|---|
| ![Home](./ShareMe_Frontend/public/screenshots/home.png) | ![Pin](./ShareMe_Frontend/public/screenshots/pin.png) | ![Profile](./ShareMe_Frontend/public/screenshots/profile.png) |

## How It Works

1. Sign in with Google to create your profile.
2. Explore the feed or search for what you need.
3. Create and save pins to your boards; comment to collaborate.

## What’s Inside (Tech)

- Frontend: React (Vite), Tailwind CSS, React Router, Google OAuth
- Backend (content): Sanity Studio + APIs (schema-driven, real-time)
- Media: Sanity asset pipeline with dynamic image URLs

## Roadmap

- Team boards and roles
- Drag-and-drop board organization
- Advanced recommendations and creator analytics
- Scheduled posts and collaboration workflows

## Try It Now

- Live demo: https://your-live-demo-url
- Request a guided tour: hello@yourdomain.com

## Run Locally (Optional)

If you’d like to explore the code or customize the experience:

```bash
# Studio (content backend)
cd ShareMe_Backend && npm install && npm run dev

# Web app (frontend)
cd ShareMe_Frontend && npm install && npm run dev
```

Environment variables (create ShareMe_Frontend/.env):

```bash
VITE_SANITY_PROJECT_ID=u5c2pve1
VITE_SANITY_TOKEN=your_sanity_token
VITE_REACT_APP_GOOGLE_API_TOKEN=your_google_oauth_client_id
```

## Support

- Issues & feedback: open a GitHub issue
- Partnerships & enterprise: hello@yourdomain.com

— Made with ❤️ for creators and teams
