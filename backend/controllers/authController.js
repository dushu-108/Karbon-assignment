import axios from "axios";
import { oauth2client } from "../utils/googleConfig.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.body; 
        
        if (!code) {
            return res.status(400).json({ message: "Authorization code is required" });
        }

        const googleRes = await oauth2client.getToken(code);
        const tokens = googleRes.tokens;
        oauth2client.setCredentials(tokens);
        
        const userResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`
                }
            }
        );
        
        const { email, name, picture } = userResponse.data;
        
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                image: picture,
            });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email, picture: user.image },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(200).json({
            message: "Success",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ 
            message: "Authentication failed",
            error: error.message 
        });
    }
};