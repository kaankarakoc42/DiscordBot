require('dotenv').config();
const {google} = require('googleapis');
const { url } = require('inspector');

function Query(query){
    param=google.youtube("v3").search.list({
    key:process.env.YOUTUBE_TOKEN,
    part:"snippet",
    q:query
    })
    results=param.then(res=>{
    item=res.data.items[0]
    console.log(item)
    video_url="https://www.youtube.com/watch?v="+item.id.videoId;
    var {title,description,channelTitle} =item.snippet;
    return {title:title,description:description,channelTitle:channelTitle,url:video_url}
    }).catch(error=>console.log(error))
    return results
}

if (typeof require !== 'undefined' && require.main === module) {
    Query("teknowar").then(res=>console.log(res))    
}

else{
    module.exports=Query;
}