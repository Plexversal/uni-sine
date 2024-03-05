import clientPromise from "../../../lib/connectDb.js";

export default async function handler(req, res) {

    if(req.method !== 'GET') return res.status(405).json({ message: "Method not allowed" });

    const client = await clientPromise;
    const db = client.db("uni-sine_master_db");

    const bannerData = await db
        .collection("siteConfig")
        .findOne({ _id: "siteBanner" });
    
    if(bannerData) {
        return res.status(200).json(bannerData.data)
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
