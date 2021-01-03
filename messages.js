const Discord = require('discord.js');

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
    if(typeof config.footer!=='undefined'){message.setFooter(`${config.footer.title}`,`${config.footer.image}`);}
    return message
}
module.exports=createMessage;