//
// (C) 2019 MilkyVishra <lushe@live.jp>
//
//  Updated on 2019-10-24
//

let C, GuildID, TwitchCH, LineID;

module.exports.templates = function (c) {
  C = c;
  GuildID  = C.discord.devel.guild;
  TwitchCH = C.twitch.devel.chatChannel;
  LineID   = C.line.devel.userID; 
  return {
    Discord: dbDiscord(),
     Twitch: dbTwitch(),
       Line: dbLine()
  };
}
function dbDiscord () {
  //
  const joinCHmsg = `まず「#<chAgree>」に目を通して下さいね。`;
  //
  const joinDMmsg = `.
<gdName> へようこそ!!

わたしは、👆でお仕事をしてるボットです。

まず「#<chAgree>」に目を通してから「#<chWelcom>」に自己紹介の投稿をお願いします。

**👀管理者が確認すると所定の権限が割り当てられます。**

ただし、リアルな仕事等の都合上、常にチェックしている訳ではありません。
場合によっては大変時間がかかる事がありますので気長にお待ち下さい。

\`※権限が割り当てられると、利用できるチャンネルが増えます。\`

それでは、今後とも宜しくお願い致します。
`;
  //
  return {
    channels: {
      devel: '( [ID] Channel used for development. )',
      agree: '( [ID] Channel where you can view the agreement. )',
      guest: '( [ID] Channels available to guests. )'
    },
    join: { // join the guild.
      color: 0x2d4fe4,
      chMsg: joinCHmsg,
      dmMsg: joinDMmsg,
      LogCH: '610174166712451092' // Logging channel ID.
  },
    exit: { // Exit the guild.
      color: 0x9f5520,
      LogCH: '610174357502951425' // Logging channel ID.
  },
toTwitch: {
       toCH: TwitchCH,
     fromCH: '579199949233717268', // Linked channel ID.
    message: 'HolidayOrnament <name>：<message>'
  },
toLine: {
   tokens: {
      '( [ID] From discord channel. )': '( [ID] To Line group. )'
    }
  },
    CRON: {
  RSSreader: {
          toCH: '613717562936655872', // News channel ID.
         sites: [
{ url: '( RSS URL No.1 )' },
{	url: '( RSS URL No.2 )' },
{ url: '( RSS URL No.2 )' }
        ]
      }
    },
webhooks: {
     devel: {
    id: '( First half of webhook URL separated by '/' )',
 token: '( Second half of webhook URL separated by '/' )' 
      },
twitchLive: {
    id: '( First half of webhook URL separated by '/' )',
 token: '( Second half of webhook URL separated by '/' )' 
      },
teamVishra: {
    id: '( First half of webhook URL separated by '/' )',
 token: '( Second half of webhook URL separated by '/' )' 
      }
    }
  };
}
function dbTwitch () {
  return {
     chat: {
 ignoreNames: [C.twitch.chat.loginID.toLowerCase()]
    },
toDiscord: {
    webhook: `%Discord:WH(${GuildID}.twitchLive)`,
    message: '>**<name>**：<message> -Twitch'
    }
  };
}
function dbLine () {
  return {
toDiscord: {
  '( Group ID or user ID ...etc )': {
      webhook: `%Discord:WH(${GuildID}.teamVishra)`
      }
    }
  };
}
