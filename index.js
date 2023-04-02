/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

// Required
require('dotenv').config()
const { Client, Events, GatewayIntentBits } = require('discord.js')
const command_prefix = '!!'

// Discord intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

// Ready
client.once(Events.ClientReady, () => {
  console.log('Bot is Ready')
})

// Check Messages
client.on('messageCreate', message => {
  if (message.author.bot) return
  if (checkCommand(message)) runCommand(message)
})

// Check if message is a command
const checkCommand = message => {
  const firstTwoChars = message.content.slice(0, 2)

  if (firstTwoChars !== command_prefix) {
    return false
  } else {
    return true
  }
}

// Run command list
const runCommand = message => {
  const command = message.content.replace(command_prefix, '')

  switch (command) {
    case 'hi':
      commands.hi(message)
      break
    case 'ping':
      commands.ping(message)
      break
    default:
      commands.invalid(message)
  }
}

// Commands
const commands = {
  hi: message => {
    message.channel.send(
      'Hello, I am your private ChatGPT + Midjourney bot. I am here to help you make the best graphics.'
    )
  },

  ping: message => {
    message.channel.send('Pong!')
  },

  invalid: message => {
    message.channel.send('Invalid command.')
  },
}

// Start discord bot
client.login(process.env.DISCORD_AUTH_TOKEN)
