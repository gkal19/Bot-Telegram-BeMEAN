import url from 'url'
import md5 from 'md5'

const execute = (bot, msg, match) => {
  const query = match.input.replace('MD5', 'md5').split('md5 ')[1]
  bot.sendMessage(msg.chat.id, `MD5: ${md5(query)}`).catch(console.log)
  console.log('query', query)
}

export default {
  execute
}
