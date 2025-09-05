import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import config from "./config.json" with { type: "json" };

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/notify-discord", async (req, res) => {
  const { name, email, instagram, message } = req.body;

  const content = `🧪 **Nouveau bêta testeur InkFlow**\n
👤 **Nom** : ${name}
📧 **Email** : ${email}
📸 **Instagram** : ${instagram}
📝 **Message** : ${message || "Aucun message"}`;

  try {
    await axios.post(config.webhook_url, {
      content,
    });
    res.status(200).send("Message envoyé à Discord !");
  } catch (error) {
    console.error("Erreur envoi Discord :", error.message);
    res.status(500).send("Erreur serveur.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend actif sur http://localhost:${PORT}`));
