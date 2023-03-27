import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
    if(!req.query.absoluteURL && !req.query.currentRoute) return  res.status(400).json({ error: 'invalid parameters' });
    console.log(process.cwd())
    try {
    const currentRoute = req.query.currentRoute;
    const paths1 = await fs.readdir(path.join(process.cwd(), "pages", currentRoute));
    const paths = paths1
        .map((e) => e.replace(/\.[^/.]+$/, ""))
        .filter((e) => e !== "index");

    const formattedData = await Promise.all(
        paths.map(async (e) => {
            const response = await fetch(`${req.query.absoluteURL}/${e}`);
            const data = await response.text();
            return { [e]: data };
        })
    );

    res.status(200).json(formattedData);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}
