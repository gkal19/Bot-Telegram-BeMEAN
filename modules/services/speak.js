import fs from 'fs'
import execSync from 'exec-sync'

const execute = (bot, msg) => {
  const _txt = msg.text.replace(/['"\\]/g, '')
  const fileName = `${Math.random().toString()}.mp3`
  bot.sendMessage(msg.chat.id, `Enviando audio: ${fileName}`).catch(console.log)
}

export default {
  execute
}
