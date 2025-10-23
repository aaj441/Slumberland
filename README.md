# 🌊💤 Slumberland - Full Stack Application

**AI-Powered Influencer Marketing Discovery Platform**

Slumberland is a complete full-stack application that helps you discover untapped market opportunities and match them with the perfect influencers using a 4-agent AI council system.

## 🎯 What's Included

### Frontend (React + D3.js)
- Interactive force-directed graph visualization
- 3-tab filter sidebar (Markets, Creators, AI Agents)
- Market Opportunity Modal with 5 comprehensive tabs
- Influencer Detail Modal with 4 comprehensive tabs
- Chakra UI theming and components
- Zustand state management
- Beautiful loading screen

### Backend (Node.js + Express)
- RESTful API with Express.js
- Market and Influencer endpoints
- Filtering capabilities
- CORS enabled
- Comprehensive mock data

## 📦 Project Structure

```
Slumberland/
├── slumberland-ui/          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── DreamCanvas/
│   │   │   ├── FilterSidebar/
│   │   │   ├── MarketOpportunityModal/
│   │   │   └── InfluencerDetailModal/
│   │   ├── store/
│   │   ├── theme/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── server/                   # Node.js backend
    ├── src/
    │   ├── controllers/
    │   │   ├── marketsController.js
    │   │   └── influencersController.js
    │   ├── routes/
    │   │   ├── markets.js
    │   │   └── influencers.js
    │   ├── data/
    │   │   └── mockData.js
    │   └── server.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Terminal/Command Line

### Option 1: Run with Mock Data (Frontend Only)

```bash
# Navigate to frontend
cd slumberland-ui

# Install and start
npm install
npm start
```

Opens at `http://localhost:3000`

### Option 2: Run Full Stack (Recommended)

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm start
```
Server runs at `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd slumberland-ui
npm install
npm start
```
App opens at `http://localhost:3000`

## 🔌 API Endpoints

### Markets

```bash
# Get all markets
GET /api/markets

# Get single market
GET /api/markets/:id

# Get filtered markets
GET /api/markets?blueOcean=true&minScore=85&category=Technology
```

### Influencers

```bash
# Get all influencers
GET /api/influencers

# Get single influencer
GET /api/influencers/:id

# Get filtered influencers
GET /api/influencers?platform=TikTok&minFollowers=400000&minEngagement=7

# Get influencers by market
GET /api/influencers/market/:marketId
```

### Test the API

```bash
# Health check
curl http://localhost:5000/health

# Get all markets
curl http://localhost:5000/api/markets | jq

# Get all influencers
curl http://localhost:5000/api/influencers | jq

# Filter blue ocean markets
curl "http://localhost:5000/api/markets?blueOcean=true" | jq
```

## 📊 Mock Data

### Markets (3)
1. **AI Music Production Tools** - 92% score, Blue Ocean, $2.4B market
2. **Sustainable Gaming Peripherals** - 85% score, Blue Ocean, $1.8B market
3. **Micro-Learning for Musicians** - 88% score, $3.1B market

### Influencers (5)
1. **Sarah "BeatsByAI" Chen** - TikTok, 485K followers, 94 score
2. **Marcus "EcoGamer" Thompson** - YouTube, 320K followers, 87 score
3. **Luna "5MinMusic" Rodriguez** - Instagram, 267K followers, 91 score
4. **DJ Pulse** - TikTok, 412K followers, 89 score
5. **GreenStream Gaming** - Twitch, 198K followers, 84 score

## ⚙️ Configuration

### Frontend Environment Variables

Create `slumberland-ui/.env`:

```env
REACT_APP_API_URL=/api
REACT_APP_USE_MOCK_DATA=true
```

- `REACT_APP_API_URL` - API endpoint URL
- `REACT_APP_USE_MOCK_DATA` - Use local data (true) or fetch from API (false)

### Backend Environment Variables

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
```

## 🎨 Features

### Interactive Visualization
- D3.js force-directed graph
- Drag nodes to rearrange
- Zoom and pan controls
- Hover effects
- Click to view details
- Real-time filter updates

### Market Analysis
- Opportunity scoring (0-100%)
- Blue Ocean identification
- Trend analysis charts
- Key insights and pain points
- Target audience profiles
- Action plan checklists

### Influencer Matching
- 4-agent AI council ratings
  - 🎵 Musical DNA
  - ✨ Vibe Check
  - 👥 Audience Intel
  - 📈 Trendmaster
- Detailed demographics
- Collaboration ideas
- Cost estimates

## 🛠️ Tech Stack

### Frontend
- React 18
- D3.js 7.8.5 (visualizations)
- Chakra UI 2.8.2 (components)
- Zustand 4.4.6 (state management)
- Framer Motion 10.16.4 (animations)

### Backend
- Node.js
- Express 4.18.2
- CORS 2.8.5
- Morgan 1.10.0 (logging)
- Dotenv 16.3.1 (environment)

## 📝 Development

### Frontend Development

```bash
cd slumberland-ui

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Backend Development

```bash
cd server

# Start dev server
npm start

# Start with auto-reload (install nodemon first)
npm install -D nodemon
npm run dev
```

## 🚢 Deployment

### Frontend Deployment

Build the frontend:
```bash
cd slumberland-ui
npm run build
```

Deploy the `build/` folder to:
- **Netlify**: Drag & drop or connect Git
- **Vercel**: Import project
- **AWS S3 + CloudFront**: Upload build folder
- **GitHub Pages**: Push to gh-pages branch

### Backend Deployment

Deploy to:
- **Heroku**:
  ```bash
  heroku create slumberland-api
  git subtree push --prefix server heroku main
  ```

- **Railway** (Recommended):
  ```bash
  # See detailed guide: RAILWAY_DEPLOYMENT.md
  # Railway auto-detects configuration from railway.json
  # Just connect your GitHub repo and deploy!
  ```
  Full instructions: See `RAILWAY_DEPLOYMENT.md`

- **AWS EC2/EB**: Package and deploy server folder

### Environment Variables

**Frontend (Production):**
```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_USE_MOCK_DATA=false
```

**Backend (Production):**
```env
PORT=5000
NODE_ENV=production
```

## 📖 Documentation

- **Frontend README**: `slumberland-ui/README.md`
- **Getting Started Guide**: `slumberland-ui/GETTING_STARTED.md`
- **Build Summary**: `slumberland-ui/BUILD_SUMMARY.md`

## 🎮 How to Use

1. **Launch the app** - See the interactive mind map
2. **Apply filters** - Use the sidebar to narrow down options
3. **Click markets (🌊)** - Explore opportunities in detail
4. **Click influencers (⭐)** - View creator profiles
5. **Read AI council ratings** - Understand the match quality
6. **Plan campaigns** - Use action checklists

## 🔍 API Examples

### JavaScript/React

```javascript
// Fetch all markets
const response = await fetch('/api/markets');
const data = await response.json();
console.log(data.data); // Array of markets

// Fetch filtered influencers
const response = await fetch('/api/influencers?platform=TikTok&minEngagement=7');
const data = await response.json();
console.log(data.data); // Filtered array
```

### Python

```python
import requests

# Get all markets
response = requests.get('http://localhost:5000/api/markets')
markets = response.json()['data']

# Get Blue Ocean markets
response = requests.get('http://localhost:5000/api/markets?blueOcean=true')
blue_ocean = response.json()['data']
```

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd slumberland-ui
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend won't start
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port already in use
```bash
# Kill process on port 3000 (frontend)
kill -9 $(lsof -ti:3000)

# Kill process on port 5000 (backend)
kill -9 $(lsof -ti:5000)
```

### CORS errors
Make sure:
1. Backend is running on port 5000
2. Frontend proxy is configured in `slumberland-ui/package.json`
3. CORS is enabled in `server/src/server.js`

## 🎯 Next Steps

### Phase 1: Real Data (Not Built Yet)
- [ ] Connect to YouTube Data API
- [ ] Connect to Instagram Graph API
- [ ] Connect to TikTok API
- [ ] Integrate Last.fm for Musical DNA

### Phase 2: AI Agents
- [ ] Build Python AI agent system
- [ ] Implement Musical DNA agent
- [ ] Implement Vibe Check agent
- [ ] Implement Audience Intel agent
- [ ] Implement Trendmaster agent

### Phase 3: Database
- [ ] Set up PostgreSQL
- [ ] Create database schema
- [ ] Migrate from mock data
- [ ] Add authentication

### Phase 4: Enhanced Features
- [ ] User accounts
- [ ] Saved campaigns
- [ ] Export to PDF/Excel
- [ ] Team collaboration
- [ ] Real-time analytics

## 🤝 Contributing

This is a demo/prototype. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT

## 🙋 Support

- Frontend issues: Check `slumberland-ui/README.md`
- Backend issues: Check API responses
- General questions: See documentation

---

**Built with 💙 for discovering dream opportunities**

May your markets be Blue Ocean and your influencers be perfectly matched! 🌊💤
