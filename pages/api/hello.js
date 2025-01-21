export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    try {
      console.log( { name, email, contact });
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } 
}
