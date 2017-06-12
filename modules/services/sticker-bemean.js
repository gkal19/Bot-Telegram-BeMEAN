const sticker = 'BQADAQADGgADt-CfBCZz7J0kak9nAg'
import s from '../settings';

const execute = (bot, msg) => {
  const reply = { 'reply_to_message_id': msg.message_id }
  s.get(msg.chat.id, 'stickers', (err, data) => {
    if (data == 'true') bot.sendSticker(msg.chat.id, sticker, reply).catch(console.log)
  })
}

export default {
  execute
};
