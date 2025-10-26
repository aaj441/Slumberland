// Vercel Serverless Function entry point
export default async function handler(req, res) {
  // This handles the tRPC API
  const { trpc } = await import('../server/trpc/handler');
  
  // Handle tRPC requests
  if (req.method === 'POST' && req.url?.includes('/trpc/')) {
    // Import and use your tRPC handler
    return res.status(200).json({ message: 'tRPC handler' });
  }
  
  return res.status(404).json({ error: 'Not found' });
}

