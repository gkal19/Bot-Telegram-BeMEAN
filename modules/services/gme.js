import url from 'url'

const execute = (bot, msg) => {
  const cmd = msg.text.replace(/gme /ig, '')
  const _url = `http://pt-br.lmgtfy.com/?q=${encodeURIComponent(cmd)}`
  bot.sendMessage(msg.chat.id, _url).catch(console.log)
}

export default {
  execute
}
