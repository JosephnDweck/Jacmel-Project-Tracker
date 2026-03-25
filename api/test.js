export default async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ status: 'ERROR', message: 'ANTHROPIC_API_KEY is not set' });
  }
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 20,
        messages: [{ role: 'user', content: 'Say OK' }]
      })
    });
    const data = await response.json();
    if (data.content) {
      return res.status(200).json({ status: 'SUCCESS', message: 'API key works', response: data.content[0].text });
    } else {
      return res.status(200).json({ status: 'ERROR', message: 'API returned error', detail: data });
    }
  } catch (e) {
    return res.status(200).json({ status: 'ERROR', message: e.message });
  }
}
