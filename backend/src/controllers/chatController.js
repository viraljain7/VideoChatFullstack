import { getStreamToken } from "../lib/stream.js";

const chatController = {
    getStreamToken: async (req, res) => { 
        try {
            const token = await getStreamToken(req.user.id);
            res.status(200).json({ success: true, token });
        } catch (error) {
            console.error("Error in getStreamToken controller", error);
            res.status(500).json({ message: "Internal Server error." });
        }
    }

}



export default chatController;