// In pages/api/scrape.ts 
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1. ---  SCRAPING LOGIC   ---

    const scrapedData = { /* ... my live data ... */ };

    // 2. --- CACHING IMPLEMENTATION ---

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    // 3. --- SEND THE RESPONSE ---
    res.status(200).json(scrapedData);

  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
}