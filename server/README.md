# 🌊💤 Slumberland API Server

RESTful API backend for the Slumberland influencer marketing discovery platform.

## Features

- RESTful API with Express.js
- Market opportunity endpoints
- Influencer discovery endpoints
- Filtering and search capabilities
- CORS enabled for frontend integration
- Comprehensive mock data

## Quick Start

```bash
npm install
npm start
```

Server runs at `http://localhost:5000`

## API Endpoints

### Root & Health

```bash
GET /              # API info and available endpoints
GET /health        # Health check
```

### Markets

```bash
GET /api/markets                    # Get all markets
GET /api/markets/:id                # Get single market by ID
GET /api/markets?blueOcean=true     # Filter blue ocean markets
GET /api/markets?minScore=85        # Filter by minimum score
GET /api/markets?category=Gaming    # Filter by category
```

### Influencers

```bash
GET /api/influencers                       # Get all influencers
GET /api/influencers/:id                   # Get single influencer by ID
GET /api/influencers?platform=TikTok       # Filter by platform
GET /api/influencers?minFollowers=400000   # Filter by follower count
GET /api/influencers?minEngagement=7       # Filter by engagement rate
GET /api/influencers?niche=AI%20Music%20Production  # Filter by niche
GET /api/influencers/market/:marketId      # Get influencers for a market
```

## Example Requests

### Using cURL

```bash
# Get all markets
curl http://localhost:5000/api/markets

# Get blue ocean markets with score above 85
curl "http://localhost:5000/api/markets?blueOcean=true&minScore=85"

# Get TikTok influencers with 400K+ followers
curl "http://localhost:5000/api/influencers?platform=TikTok&minFollowers=400000"

# Get influencers matched to a specific market
curl http://localhost:5000/api/influencers/market/market-1
```

### Using JavaScript

```javascript
// Fetch all markets
const response = await fetch('http://localhost:5000/api/markets');
const data = await response.json();
console.log(data);

// Response format:
// {
//   "success": true,
//   "count": 3,
//   "data": [ ... markets array ... ]
// }
```

## Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
```

## Project Structure

```
server/
├── src/
│   ├── controllers/
│   │   ├── marketsController.js       # Market business logic
│   │   └── influencersController.js   # Influencer business logic
│   ├── routes/
│   │   ├── markets.js                 # Market routes
│   │   └── influencers.js             # Influencer routes
│   ├── data/
│   │   └── mockData.js                # Mock data (3 markets, 5 influencers)
│   └── server.js                      # Main server file
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Mock Data

### Markets (3)

1. **AI Music Production Tools** (`market-1`)
   - Opportunity Score: 92%
   - Blue Ocean: Yes
   - Market Size: $2.4B
   - Growth: 34% YoY
   - Matched Influencers: 3

2. **Sustainable Gaming Peripherals** (`market-2`)
   - Opportunity Score: 85%
   - Blue Ocean: Yes
   - Market Size: $1.8B
   - Growth: 28% YoY
   - Matched Influencers: 2

3. **Micro-Learning for Musicians** (`market-3`)
   - Opportunity Score: 88%
   - Blue Ocean: No
   - Market Size: $3.1B
   - Growth: 41% YoY
   - Matched Influencers: 2

### Influencers (5)

1. **Sarah "BeatsByAI" Chen** (`inf-1`) - TikTok, 485K, Score: 94
2. **Marcus "EcoGamer" Thompson** (`inf-2`) - YouTube, 320K, Score: 87
3. **Luna "5MinMusic" Rodriguez** (`inf-3`) - Instagram, 267K, Score: 91
4. **DJ Pulse** (`inf-4`) - TikTok, 412K, Score: 89
5. **GreenStream Gaming** (`inf-5`) - Twitch, 198K, Score: 84

## Development

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
npm start
```

### Development Mode (Auto-reload)

```bash
npm install -D nodemon
npm run dev
```

## Testing

### Test All Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Root
curl http://localhost:5000/

# Markets
curl http://localhost:5000/api/markets
curl http://localhost:5000/api/markets/market-1
curl "http://localhost:5000/api/markets?blueOcean=true"

# Influencers
curl http://localhost:5000/api/influencers
curl http://localhost:5000/api/influencers/inf-1
curl "http://localhost:5000/api/influencers?platform=TikTok"
curl http://localhost:5000/api/influencers/market/market-1
```

### Using Postman

Import this collection:

```json
{
  "info": {
    "name": "Slumberland API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Markets",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/markets"
      }
    },
    {
      "name": "Get All Influencers",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/influencers"
      }
    }
  ]
}
```

## Deployment

### Heroku

```bash
# Create Heroku app
heroku create slumberland-api

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Railway

1. Connect your Git repository
2. Set root directory to `/server`
3. Add environment variables
4. Deploy

### AWS EC2

1. SSH into your EC2 instance
2. Install Node.js
3. Clone the repository
4. Install dependencies: `npm install`
5. Install PM2: `npm install -g pm2`
6. Start server: `pm2 start src/server.js --name slumberland-api`

## Dependencies

```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // Cross-origin resource sharing
  "dotenv": "^16.3.1",       // Environment variables
  "morgan": "^1.10.0"        // HTTP request logger
}
```

## API Architecture

```
Request → CORS → Logger → Router → Controller → Data → Response
```

1. **CORS Middleware** - Allows cross-origin requests
2. **Morgan Logger** - Logs all HTTP requests
3. **Router** - Routes requests to appropriate controllers
4. **Controller** - Business logic and filtering
5. **Data Layer** - Mock data (ready to be replaced with database)
6. **Response** - JSON formatted response

## Error Handling

The API includes comprehensive error handling:

- **404**: Route not found
- **500**: Server errors
- **Custom Errors**: Validation and business logic errors

## Security

Current setup (development):
- CORS enabled for all origins
- Basic error handling
- No authentication

For production, add:
- [ ] Rate limiting
- [ ] Authentication (JWT)
- [ ] Input validation
- [ ] API key requirement
- [ ] HTTPS enforcement
- [ ] Request sanitization

## Future Enhancements

- [ ] Database integration (PostgreSQL)
- [ ] Authentication & authorization
- [ ] Pagination for large datasets
- [ ] Advanced search and filtering
- [ ] Caching (Redis)
- [ ] Real-time updates (WebSockets)
- [ ] API versioning
- [ ] OpenAPI/Swagger documentation

## Troubleshooting

### Port already in use

```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)
```

### Dependencies issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors

Make sure CORS is enabled in `src/server.js`:

```javascript
const cors = require('cors');
app.use(cors());
```

## License

MIT

---

**Part of the Slumberland full-stack application** 🌊💤
