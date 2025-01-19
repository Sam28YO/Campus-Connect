let url="https://jsonplaceholder.typicode.com/posts"
export default async function user(req,res)  {
    if (req.method === 'POST') {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: "kanwar" }),
        });
  
        const data = await response.json();
        console.log(data);
  
        // Respond to the client
        res.status(200).json(data);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      
    }
  }