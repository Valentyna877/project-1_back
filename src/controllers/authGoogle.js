import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { createSession, setSessionCookies } from "../services/auth.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const loginGoogle = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ message: "No token" });
  }

  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (!googleResponse.ok) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  const googleUser = await googleResponse.json();

  console.log(googleUser);

  let user = await User.findOne({ email: googleUser.email });

  if (!user) {
    const { name, email } = googleUser;
    const randomPassword = crypto.randomBytes(24).toString("hex");
    const password = await bcrypt.hash(randomPassword, 10);
    user = await User.create({ name, email, password });

    const googleAvatarUrl = googleUser.picture;
    const googleAvatarFile = await fetch(googleAvatarUrl);
    const imgArrayBuffer = await googleAvatarFile.arrayBuffer();
    const imgBuffer = Buffer.from(imgArrayBuffer);
    const cloudinaryData = await saveFileToCloudinary(imgBuffer, user._id);
    const avatar = cloudinaryData.secure_url;
    await User.updateOne({ _id: user._id }, { avatar });
  }

  const newSession = await createSession(user._id);
  await setSessionCookies(res, newSession);

  res.status(201).json(user);
};
