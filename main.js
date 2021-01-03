const Discord = require('discord.js');
const createMessage = require('./messages')
const ytdl = require("ytdl-core")
const bot=new Discord.Client();

const TOKEN=process.env.TOKEN



bot.on('ready',()=>{
    bot.user.setActivity('Vs code  !yardım', { type: 'PLAYING' });
    console.log("bot çalışmaya başladı.")
    bot.guilds.cache.forEach(guild=>{console.log(`starting on ${guild.name} members:${guild.memberCount}`)})    
})

bot.on("message",msg=>{
    if(msg.content.startsWith("!test")){
    msg.channel.send("şuan aktifim.")
    msg.channel.send(":yum:")
    }

    if(msg.content.startsWith("!kaanbot")){
    msg.channel.send("şuan aktifim.")
    msg.channel.send(":yum:")
    }
    if(msg.content.startsWith("!ağla")){
    user = msg.mentions.users.first();
    msg.channel.send(`${user.username} ağla.`)
    }
    if(msg.content.startsWith("!sa")){
    msg.channel.send(`ve Aleyküm selam ${msg.member.user.tag}`)
    }
    if(msg.content.startsWith("!role")){
    arg=msg.content.split(" ")[1]
    if(arg=="admin"){msg.channel.send("bu rolü alamassın."); return;}
    if(arg=="moderatör"){msg.channel.send("bu rolü alamassın.");return;}
    role= msg.member.guild.roles.cache.find(role => role.name === arg);
    if(!role) return;
    if(!msg.member._roles.includes(role.id)){
    msg.member.roles.add(role.id)
    msg.channel.send(`Tebrikler @${arg} rolünü aldınız.`)
    }
    else{
     msg.channel.send("bu role zaten sahipsin.")  
    }   
}
if(msg.content.startsWith("!remove")){
    arg=msg.content.split(" ")[1]
    role= msg.member.guild.roles.cache.find(role => role.name === arg);
    if(!role) return;
    if(msg.member._roles.includes(role.id)){
       msg.member.roles.remove(role.id)
       msg.channel.send(`@${arg} rolü kaldırıldı.`)          
    }
    else{
        msg.channel.send("bu role zaten sahip değilsin.")  
    }

}
if(msg.content.startsWith("!clear")){

    arg=msg.content.split(" ")[1]
    msg.channel.bulkDelete(arg)
}
if(msg.content.startsWith("!ban")){

    args=msg.content.split(" ");
    const user = msg.mentions.users.first();
    admin= msg.member.guild.roles.cache.find(role => role.name === "admin");
    moderatör= msg.member.guild.roles.cache.find(role => role.name === "moderatör");
    bots= msg.member.guild.roles.cache.find(role => role.name === "bots");
    if(user){
      const member = msg.guild.member(user);
      if(!member){msg.reply("kullanıcı bulunamadı");return;}
      if(msg.member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id)){
      if(member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id) ||  msg.member._roles.includes(bots.id)){msg.channel.send("bir yetkili banlayamazsın seni gerizekalı.");return}
            member.ban({reason:'Kurallara aykırı davranma'}).then(()=>{msg.reply(`${user.tag} kullanıcısını banladınız.`)})
            .catch(error=>
            {
                msg.reply("hata oluştu")
                console.log(error)
            }
            )
     }else{msg.channel.send(`bu yetkiye sahip değilsin ${msg.member.user.tag}`)}
    }
}

if(msg.content.startsWith("!kick")){
    args=msg.content.split(" ");
    const user = msg.mentions.users.first();
    admin= msg.member.guild.roles.cache.find(role => role.name === "admin");
    moderatör= msg.member.guild.roles.cache.find(role => role.name === "moderatör");
    bots= msg.member.guild.roles.cache.find(role => role.name === "bots");
    if(user){
      const member = msg.guild.member(user);
      if(!member){msg.reply("kullanıcı bulunamadı");return;}
      if(msg.member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id)){
      if(member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id) ||  msg.member._roles.includes(bots.id)){msg.channel.send("bir yetkili atamazsın seni gerizekalı.");return}
            member.kick({reason:'Kurallara aykırı davranma'}).then(()=>{msg.reply(`${user.tag} kullanıcısını sunucudan attınız.`)})
            .catch(error=>
            {
                msg.reply("hata oluştu")
                console.log(error)
            }
            )
     }else{msg.channel.send(`bu yetkiye sahip değilsin ${msg.member.user.tag}`)}

   }    
}
if(msg.content.startsWith("!myroles")){
    roles=[]
    msg.member._roles.forEach(item=>{
    role=msg.member.guild.roles.cache.find(role => role.id ===item);
    roles.push(role)
    })
    roles.forEach(role=>{
        msg.channel.send(role.name)
    })
}
if(msg.content.startsWith("!dm")){
   admin= msg.member.guild.roles.cache.find(role => role.name === "admin");
   moderatör= msg.member.guild.roles.cache.find(role => role.name === "moderatör");
   if(msg.member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id)){
   options=msg.content.split(" ")[1]
   user = msg.mentions.users.first()
   user.send(createMessage(JSON.parse(options.replace(/'/g,"\""))))
   }
}
if(msg.content.startsWith("!duyuru")){
    admin= msg.member.guild.roles.cache.find(role => role.name === "admin");
    moderatör= msg.member.guild.roles.cache.find(role => role.name === "moderatör");
    if(msg.member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id)){
    options=msg.content.split(" ")[1]
    bot.users.cache.forEach(user => {
        user.send(createMessage(JSON.parse(options).replace(/'/g,"\"")))
        console.log(user.username)
    })
}
}
 
 if(msg.content.startsWith("!play")){
    url=msg.content.split(" ")[1]
    const stream=ytdl(url,{
        filter:"audioonly",
        quality:"highestaudio"
        
    })
    msg.member.voice.channel.join().then(connection=>{
        connection.play(stream)
    })
    }
    if(msg.content.startsWith("!stop")){
        msg.member.voice.channel.leave();
    }

if(msg.content.startsWith("!davet")){
url="https://discord.com/api/oauth2/authorize?client_id=791997554635309067&permissions=8&scope=bot";
image="https://instagram.fayt2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120929233_378816783146613_4152190279759171459_n.jpg?_nc_ht=instagram.fayt2-1.fna.fbcdn.net&_nc_ohc=JWNa_wHaN3MAX_s9Psl&tp=1&oh=88504ec914fbb730cd3a14af1d9a8c87&oe=601CB3FF"
msg.channel.send(createMessage({color:"blue",title:"kaanbot davet linki",fieldTitle:"kaanbot",fieldin:url,titleUrl:url,desc:"kaan botu sizde burdan kendi sunucunuza kurabilirsiniz.",footer:{title:"kaan karakoç",image:image},image:image}))
}
})

bot.login(TOKEN)

