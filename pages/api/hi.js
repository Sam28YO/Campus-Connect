export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { task, date, time } = req.body;
      if (!task || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      try {
        console.log( { task, date, time });
        return res.status(201).json({ message: 'task created successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    } 
  }
  