const Discord = require('discord.js');

const image="https://instagram.fayt2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120929233_378816783146613_4152190279759171459_n.jpg?_nc_ht=instagram.fayt2-1.fna.fbcdn.net&_nc_ohc=JWNa_wHaN3MAX_s9Psl&tp=1&oh=88504ec914fbb730cd3a14af1d9a8c87&oe=601CB3FF"
function createMessage(config){
    var message = new Discord.MessageEmbed()
    if (typeof config.color !== 'undefined'){message.setColor(`${config.color}`)}
    if(typeof config.title !== 'undefined'){message.setTitle(`${config.title}`)}
	if(typeof config.titleUrl !=='undefined'){message.setURL(`${config.titleUrl}`)}
	if(typeof config.authorName!=='undefined'){message.setAuthor(`${config.authorName}`, `${config.authorImage}`,`${config.authorUrl}`)}
	if(typeof config.desc !== 'undefined'){message.setDescription(`${config.desc}`)}
    if(typeof config.thumbnail!=='undefined'){message.setThumbnail(`${config.thumbnail}`)}
	/*.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)*/
	if(typeof config.fieldTitle!=='undefined'){message.addField(`${config.fieldTitle}`, `${config.fieldin}`, true)}
	if(typeof config.image!=='undefined'){message.setImage(`${config.image}`)}
	message.setTimestamp()
    message.setFooter("kaan karakoç",`${image}`);
    return message
}
module.exports=createMessage;
