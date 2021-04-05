const Discord = require('discord.js');
const client = new Discord.Client();
const { env } = require("process")
require("dotenv").config();
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.once('ready', () => {
    console.log('Ready!');
    console.log("Use the Discord developer portal to get your bot's invite link.")
    console.log("The prefix is: " + env.BOTPREFIX)
});
client.login(env.BOTTOKEN);
client.on('message', message => {
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(env.BOTPREFIX)})\\s*`); // allow the prefix or mentioning
    if (!prefixRegex.test(message.content) || message.author.bot) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "datetoday":
            message.channel.send('Pong!');
            break;
        default:
            break;
    }
});
