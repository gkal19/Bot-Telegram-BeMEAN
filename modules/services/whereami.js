import GoogleMapsAPI from 'googlemaps';
const config = {
  key: 'AIzaSyBnsCuuS0N0Akc1I3WEifbNoBCQ1iZ4a9g', // Não tente usar a chave, ela só aceita requests do meu server =)
  secure: true
}
const api = new GoogleMapsAPI(config)
import monitutils from '../utils/monitutils';

const localeNotFound = (bot, msg, query, result) => {
  bot.sendMessage(msg.chat.id, 'Então... Tem certeza que esse lugar existe? Pq procurei ele no Google Maps, e não achei, não :/').catch(console.log)
}

import s from '../settings';

const _execute = (bot, msg) => {
  let reverseParams = {
    'latlng': `${msg.location.latitude},${msg.location.longitude}`,
    'language': 'pt-BR',
    'location_type': 'APPROXIMATE'
  }

  api.reverseGeocode(reverseParams, (err, result) => {
    if (err) {
      bot.sendMessage(msg.chat.id, errMsg).catch(console.log)
      monitutils.notifySharedAccount(bot, `Erro no service do whereami:\nerr: \`${JSON.stringify(err)}\``)
      return
    }

    if (result.status !== 'OK' || !result) {
      if (result.status == 'ZERO_RESULTS') {
        localeNotFound(bot, msg, query, result)
      } else {
        bot.sendMessage(msg.chat.id, errMsg).catch(console.log)
      }
      return
    }

    if (!result.results[0]) {
      localeNotFound(bot, msg, query, result)
      return
    }

    if (result.results[0]) {
      let info = result.results[0]
      let name = info.formatted_address

      bot.sendMessage(msg.chat.id, `Segundo o Google Maps, você está nesse endereço: \`${name}\``, { 'parse_mode': 'Markdown' }).catch(console.log)
    }
  })
}

const execute = (bot, msg) => {
  s.get(msg.chat.id, 'location', (err, data) => {
    if (data == 'true') _execute(bot, msg)
  })
}

export default {
  execute
};
