import { translate } from "@vitalets/google-translate-api";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
// Link for the BOT: //! https://t.me/translatorenglishtohindibot

async function translateIt(input) {
	try {
		const { text } = await translate(input, {
			from: "en",
			to: "hi",
		});
		return text;
	} catch (error) {
		console.error("Translation error:", error);
		return "Translation failed. Please try again later.";
	}
}

bot.start((ctx) => {
	const firstName = ctx.from.first_name;
	const username = ctx.from.username;

	if (username) {
		ctx.reply(`Hello, @${username}! Welcome to the bot.`);
	} else {
		ctx.reply(`Hello, ${firstName}! Welcome to the bot.`);
	}
	ctx.reply(
		`What ever message you send here that will be tranlated in Hindi.
        For eg: How are you? Translated text: आप कैसे हैं?
        (If you provide something that is not in English, Bot will return the same message or अपरिभाषित)
        `
	);
});

// Translate any message sent by the user
bot.on("message", async (ctx) => {
	const textToTranslate = ctx.message.text;
	const translatedText = await translateIt(textToTranslate);
	ctx.reply(translatedText);
});

bot.launch();
