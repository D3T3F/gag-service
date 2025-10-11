import express from "express";
import cors from "cors";
import cron from "node-cron";
import { sendWebhook, searchForStock } from "./functions.js";

const app = express();

app.use(express.json());
app.use(cors());

cron.schedule('*/2,5 * * * *', async () => {
	try{
		await sendWebhook("Notification service working! ✅", true);
	}
	catch {
		console.log("Error sending status webhook.");
	}

	try {
		await searchForStock();
	}
	catch {
		console.log("Error searching for stock.");

		try {
			await sendWebhook("Error searching for stock. ❌", true);
		} catch {}
	}
});