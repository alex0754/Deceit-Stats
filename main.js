const Discord = require('discord.js')
const client = new Discord.Client();
const fetch = require('node-fetch')

var prefix = "-"

client.on('ready', () => {
  console.log("The bot is ready")
})

client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  if (message.author.bot) return;

  if (message.content.startsWith(`${prefix}stats`)) {
    if (!args[1]) {
      return message.channel.send('Please, enter your Deceit User Id')
    } else {
      fetch(`https://deceit-live.baseline.gg/stats?userId=${args[1]}`)
        .then(response => response.json())
        .then(data => {
          var wins = data.stats.s_total_wins_inf + data.stats.s_total_wins_inno
          var losses = data.stats.games_played - wins
          let embed = new Discord.MessageEmbed()
            .setColor('#FFFFFE')
            .setThumbnail('https://pbs.twimg.com/profile_images/880804954776141824/nY0ayWz0_400x400.jpg')
            .setTitle(`${data.name}'s Profile`)
            .addField('__Stats :__', `**Prestige : ${data.prestige}\nLevel : ${data.level}\nGame played : ${data.stats.games_played}\nWins : ${wins}\nLosses : ${losses}\nBlood dranked : ${data.stats.s_blood_drank}**`)
          message.channel.send(embed)
        })
        .catch(err => console.error(err))
    }
  }

})

client.login('yourSuperSecretToken')
