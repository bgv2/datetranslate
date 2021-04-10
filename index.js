const Discord = require('discord.js')
const client = new Discord.Client()
const { DateTime, Settings: DateSettings } = require('luxon')
const { env } = require('process')
require('dotenv').config()
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
DateSettings.defaultZoneName = 'utc'
DateSettings.throwOnInvalid = true
client.once('ready', () => {
  console.log('Ready!')
  console.log("Use the Discord developer portal to get your bot's invite link.")
  console.log('The prefix is: ' + env.BOTPREFIX)
})
client.login(env.BOTTOKEN)
client.on('message', message => {
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(env.BOTPREFIX)})\\s*`) // allow the prefix or mentioning
  if (!prefixRegex.test(message.content) || message.author.bot) return

  const [, matchedPrefix] = message.content.match(prefixRegex)
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  switch (command) {
    case 'tdatetoday':
      try {
        const [hour, minute, second, zone] = args
        const dateobj = DateTime.fromObject({ hour, minute, second, zone })
        message.channel.send(new Discord.MessageEmbed().setTimestamp(dateobj.toJSDate()).setColor('GREEN'))
      } catch (e) {
        message.reply(e.toString())
      }
      break
    case 'tdate':
      try {
        const [year, month, day, hour, minute, zone] = args
        const dateobj = DateTime.fromObject({ year, month, day, hour, minute, zone })
        message.channel.send(new Discord.MessageEmbed().setTimestamp(dateobj.toJSDate()).setColor('GREEN'))
        message.delete().catch(() => null)
      } catch (e) {
        message.reply(e.toString())
      }
      break
    case 'tdatenow':
      {
        const footer = args[0] ?? ''
        message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('GREEN').setFooter(footer))
      }
      break
    default:
      break
  }
})
