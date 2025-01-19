export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const { name } = req.body; // Example of parsing JSON body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    res.status(200).json({ message: `Hello, ${name}!` });
  } else if (req.method === 'GET') {
    // Handle a GET request
    res.status(200).json({ message: 'Welcome to the API!' });
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
