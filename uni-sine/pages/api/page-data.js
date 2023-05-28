import path from "path";

export default async function handler(req, res) {
    // if (!req.query.absoluteURL && !req.query.currentRoute)
    //   return res.status(400).json({ error: "invalid parameters" });
    //   const currentRoute = req.query.currentRoute.slice(1);
    //   const url = new URL(req.query.absoluteURL);
    //   const baseUrl = url.origin; 
  
    //   const response1 = await fetch(`${baseUrl}/static/pages-manifest.json`);
    //   const manifest = await response1.json();
    try {

        const formattedData = [null]
    //   const formattedData = await Promise.all(
    //     manifest[currentRoute]._files.map(async (e) => {
    //       const response = await fetch(`${req.query.absoluteURL}/${e}`);
    //       const data = await response.text();
    //       return { [e]: data };
    //     })
    //   );
  
      res.status(200).json(formattedData);
    } catch (error) {

      res.status(500).json({ error: error });
    }
  }