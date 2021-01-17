const Discord = require('discord.js');
const createMessage = require('./messages')
const Query = require('./search')
const ytdl = require("ytdl-core")
const bot=new Discord.Client();

const TOKEN=process.env.TOKEN



bot.on('ready',()=>{
    bot.user.setActivity('Vs code  !help', { type: 'PLAYING' });
    console.log("bot çalışmaya başladı.")
    bot.guilds.cache.forEach(guild=>{console.log(`starting on ${guild.name} members:${guild.memberCount}`)})    
})

bot.on('guildMemberAdd', member => {
    console.log(member)
    member.guild.cache.channels.get('765263753717481472').send(`hoşgeldin ${member.user.tag} rol kanalından !role [rol adı] yazarak istediğin rolü alabilirsin.`); 
});

bot.on("message",msg=>{
  try{
    if(msg.content.startsWith("!test") || msg.content.startsWith("!kaanbot")){
    msg.channel.send("şuan aktifim.")
    msg.channel.send(":yum:")
    }

    if(msg.content.startsWith("!help")){
    text= `
!kick : !kick [kullanıcı adı] sunucudan atarım.
    !ban : !ban [kullanıcı adı] sunucudan banlarım.
    !clear : !clear [mesaj sayısı] mesajları silerim.
    !role-remove : !role [role adı] ve !remove [role adı] rol verip alırım.
    !myroles : !myroles rollerini kanala yazarım.
    !play-stop : !play [youtube video linki]  ve !stop youtube videosu çalarım ve durdurum.
    !duyuru : !duyuru [options] sunucudaki herkese dm atarım.
    !dm : !dm [kullanıcı adı] [options] bir kişiye dm atarım.
    !davet : !davet bot davet linki gönderirim.
    !sa : !sa selamını alırım.
    !ağla : !ağla [kullanıcı adı] kullanıcı kışkırtırım.`
    msg.channel.send(text)
    }
    
    if(msg.content.startsWith("!ağla")){
    user = msg.mentions.users.first();
    msg.channel.send(`${user.username} ağla.`)
    }
    if(msg.content.split(" ")[0]=="sa"||msg.content.split(" ")[0]=="Sa"){
    msg.channel.send(`ve Aleyküm selam ${msg.member.user.tag}`)
    }
    if(msg.content.split(" ").length==1&&(msg.content.split(" ")[0]=="günaydın"||msg.content.split(" ")[0]=="Günaydın")){
    msg.channel.send(`Sanada günaydın ${msg.member.user.tag}`)
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
if(msg.content.startsWith("!github")){
    msg.channel.send(createMessage({color:"blue",title:"github hesabım",titleUrl:"https://github.com/kaankarakoc42",desc:"beni takip ederseniz sevinirim arkadaşlar:)",image:"https://avatars3.githubusercontent.com/u/56826739?s=460&u=feec3a5ac9b48b5ed05449fb6f21c734f62cc1c1&v=4"}))
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
   options=msg.content.split("_")[1]
   user = msg.mentions.users.first()
   user.send(createMessage(JSON.parse(options.replace(/'/g,"\""))))
   }
}
if(msg.content.startsWith("!duyuru")){
    admin= msg.member.guild.roles.cache.find(role => role.name === "admin");
    moderatör= msg.member.guild.roles.cache.find(role => role.name === "moderatör");
    if(msg.member._roles.includes(admin.id) || msg.member._roles.includes(moderatör.id)){
    options=msg.content.split("_")[1]
    bot.users.cache.forEach(user => {
        user.send(createMessage(JSON.parse(options).replace(/'/g,"\"")))
        console.log(user.username)
    })
}
}
  if(msg.content.startsWith("!play")){
    url=msg.content.replace("!play","")
    if(url.startsWith("https://")){
    const stream=ytdl(url,{
        filter:"audioonly",
        quality:"highestaudio"
        
    })
    msg.member.voice.channel.join().then(connection=>{
        connection.play(stream)
    })
    }
    else{
    Query(url).then(res=>{
    const stream=ytdl(res.url,{
        filter:"audioonly",
        quality:"highestaudio"
        
    })
    msg.member.voice.channel.join().then(connection=>{
        image="https://instagram.fayt2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120929233_378816783146613_4152190279759171459_n.jpg?_nc_ht=instagram.fayt2-1.fna.fbcdn.net&_nc_ohc=JWNa_wHaN3MAX_s9Psl&tp=1&oh=88504ec914fbb730cd3a14af1d9a8c87&oe=601CB3FF"
        msg.channel.send(createMessage({color:"blue",title:res.title,titleUrl:res.url,footer:{title:"kaan karakoç",image:image},desc:`${msg.member.user.tag} tarafından.`}))
        connection.play(stream)
    })
    })
    }
    }

    if(msg.content.startsWith("!stop")){
        msg.member.voice.channel.leave();
    }

if(msg.content.startsWith("!davet")){
url="https://discord.com/api/oauth2/authorize?client_id=791997554635309067&permissions=8&scope=bot";
image="https://instagram.fayt2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120929233_378816783146613_4152190279759171459_n.jpg?_nc_ht=instagram.fayt2-1.fna.fbcdn.net&_nc_ohc=JWNa_wHaN3MAX_s9Psl&tp=1&oh=88504ec914fbb730cd3a14af1d9a8c87&oe=601CB3FF"
msg.channel.send(createMessage({color:"blue",title:"kaanbot davet linki",fieldTitle:"kaanbot",fieldin:url,titleUrl:url,desc:"kaan botu sizde burdan kendi sunucunuza kurabilirsiniz.",footer:{title:"kaan karakoç",image:image},image:image}))
}
}
catch(e){}
})

bot.login(TOKEN)


