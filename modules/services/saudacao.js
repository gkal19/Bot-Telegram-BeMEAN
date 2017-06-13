const messages = {
  'ok': 'Opa, b%ao% %pr%, jovem!',
  'wrongPeriod': 'B%ao% %pu%, jovem? Agora são %horas%h%minutos%! Você devia regular seus horários!'
}

import s from '../settings'

const execute = (bot, msg, match) => {
  s.get(msg.chat.id, 'greetings', (err, data) => {
    if (data == 'true') {
      const date = new Date()
      const _horas = date.getUTCHours() - 3
      const horas = _horas < 0 ? _horas + 24 : _horas
      let minutos = date.getMinutes()
      const ending = match[1].toLowerCase()
      minutos = minutos < 10 ? `0${minutos}` : minutos
      const pu = match[2]
      let pr = ''
      if (horas < 12) {
        pr = 'dia'
      } else if (horas >= 12 && horas < 18) {
        pr = 'tarde'
      } else if (horas >= 18) {
        pr = 'noite'
      }

      if (pr == pu.toLowerCase()) {
        bot.sendMessage(msg.chat.id, messages.ok.replace('%ao%', ending).replace('%pr%', pr), { 'reply_to_message_id': msg.message_id }).catch(console.log)
      } else {
        bot.sendMessage(msg.chat.id, messages.wrongPeriod.replace('%ao%', ending).replace('%pu%', pu).replace('%horas%', horas).replace('%minutos%', minutos), { 'reply_to_message_id': msg.message_id }).catch(console.log)
      }
    }
  })
}

export default {
  execute
}
