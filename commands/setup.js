const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup the entire TIX SMP server"),

  async execute(interaction) {

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "❌ You need Administrator permission.",
        ephemeral: true
      });
    }

    await interaction.reply({
      content: "🚀 Building TIX SMP...",
      ephemeral: true
    });

    const guild = interaction.guild;

    // ==========================
    // ROLES
    // ==========================

    const owner = await guild.roles.create({
      name: "👑 Owner",
      color: "#ff0000",
      permissions: [PermissionFlagsBits.Administrator]
    });

    const admin = await guild.roles.create({
      name: "⚙️ Admin",
      color: "#ff6600",
      permissions: [
        PermissionFlagsBits.ManageGuild,
        PermissionFlagsBits.ManageChannels,
        PermissionFlagsBits.ManageRoles,
        PermissionFlagsBits.KickMembers,
        PermissionFlagsBits.BanMembers
      ]
    });

    const mod = await guild.roles.create({
      name: "🛡️ Moderator",
      color: "#0099ff",
      permissions: [
        PermissionFlagsBits.KickMembers,
        PermissionFlagsBits.ManageMessages,
        PermissionFlagsBits.TimeoutMembers
      ]
    });

    const helper = await guild.roles.create({
      name: "💬 Helper",
      color: "#00ff99"
    });

    const developer = await guild.roles.create({
      name: "💻 Developer",
      color: "#9900ff"
    });

    const media = await guild.roles.create({
      name: "📸 Media",
      color: "#ff66cc"
    });

    const booster = await guild.roles.create({
      name: "🚀 Booster",
      color: "#ff73fa"
    });

    const member = await guild.roles.create({
      name: "👤 Member",
      color: "#2ecc71"
    });

    // ==========================
    // CATEGORIES
    // ==========================

    const info = await guild.channels.create({
      name: "📢 INFORMATION",
      type: ChannelType.GuildCategory
    });

    const community = await guild.channels.create({
      name: "💬 COMMUNITY",
      type: ChannelType.GuildCategory
    });

    const smp = await guild.channels.create({
      name: "⛏️ SMP",
      type: ChannelType.GuildCategory
    });

    const support = await guild.channels.create({
      name: "🎫 SUPPORT",
      type: ChannelType.GuildCategory
    });

    const staff = await guild.channels.create({
      name: "👑 STAFF",
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: admin.id,
          allow: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: mod.id,
          allow: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: owner.id,
          allow: [PermissionFlagsBits.ViewChannel]
        }
      ]
    });

    // ==========================
    // INFORMATION CHANNELS
    // ==========================

    await guild.channels.create({
      name: "👋welcome",
      type: ChannelType.GuildText,
      parent: info.id
    });

    await guild.channels.create({
      name: "📜rules",
      type: ChannelType.GuildText,
      parent: info.id
    });

    await guild.channels.create({
      name: "📢announcements",
      type: ChannelType.GuildText,
      parent: info.id
    });

    await guild.channels.create({
      name: "📅updates",
      type: ChannelType.GuildText,
      parent: info.id
    });

    // ==========================
    // COMMUNITY CHANNELS
    // ==========================

    await guild.channels.create({
      name: "💬general",
      type: ChannelType.GuildText,
      parent: community.id
    });

    await guild.channels.create({
      name: "😂memes",
      type: ChannelType.GuildText,
      parent: community.id
    });

    await guild.channels.create({
      name: "📸media",
      type: ChannelType.GuildText,
      parent: community.id
    });

    await guild.channels.create({
      name: "🤖bot-commands",
      type: ChannelType.GuildText,
      parent: community.id
    });

    // Continue in Part 2...
    // ==========================
    // SMP CHANNELS
    // ==========================

    const ipChannel = await guild.channels.create({
      name: "🌍server-ip",
      type: ChannelType.GuildText,
      parent: smp.id
    });

    const tradingChannel = await guild.channels.create({
      name: "💰trading",
      type: ChannelType.GuildText,
      parent: smp.id
    });

    const showcaseChannel = await guild.channels.create({
      name: "🏠build-showcase",
      type: ChannelType.GuildText,
      parent: smp.id
    });

    const leaderboardChannel = await guild.channels.create({
      name: "🏆leaderboards",
      type: ChannelType.GuildText,
      parent: smp.id
    });

    const giveawayChannel = await guild.channels.create({
      name: "🎁giveaways",
      type: ChannelType.GuildText,
      parent: smp.id
    });

    // ==========================
    // SUPPORT
    // ==========================

    const ticketChannel = await guild.channels.create({
      name: "🎫create-ticket",
      type: ChannelType.GuildText,
      parent: support.id
    });

    const reportChannel = await guild.channels.create({
      name: "🚨report-player",
      type: ChannelType.GuildText,
      parent: support.id
    });

    // ==========================
    // STAFF CHANNELS
    // ==========================

    await guild.channels.create({
      name: "📋staff-chat",
      type: ChannelType.GuildText,
      parent: staff.id
    });

    await guild.channels.create({
      name: "📊logs",
      type: ChannelType.GuildText,
      parent: staff.id
    });

    await guild.channels.create({
      name: "🛡️mod-chat",
      type: ChannelType.GuildText,
      parent: staff.id
    });

    // ==========================
    // VOICE
    // ==========================

    await guild.channels.create({
      name: "🎤 General",
      type: ChannelType.GuildVoice
    });

    await guild.channels.create({
      name: "🎮 Gaming",
      type: ChannelType.GuildVoice
    });

    await guild.channels.create({
      name: "😴 AFK",
      type: ChannelType.GuildVoice
    });

    // ==========================
    // SEND DEFAULT MESSAGES
    // ==========================

    await ipChannel.send({
      content:
`# 🌍 TIX SMP

**Server IP**
play.tixsmp.net

**Version**
1.21+

Enjoy your stay!`
    });

    await tradingChannel.send({
      content:
`# 💰 Trading

Trade fairly.

No scams.
No dupes.
Respect other players.`
    });

    await showcaseChannel.send({
      content:
`# 🏠 Build Showcase

Show off your best creations!

Use screenshots and keep chat positive.`
    });

    await leaderboardChannel.send({
      content:
`# 🏆 Leaderboards

Top Kills
Top Balance
Top Playtime

(Coming Soon)`
    });

    await giveawayChannel.send({
      content:
`# 🎁 Giveaways

All giveaways will be posted here.

Good luck!`
    });

    await ticketChannel.send({
      content:
`# 🎫 Support

Open a ticket by pinging staff or using the future ticket bot.`
    });

    await reportChannel.send({
      content:
`# 🚨 Report a Player

Explain:

• Username
• What happened
• Evidence`
    });

    // Continue in Part 3...    
    const welcomeChannel = guild.channels.cache.find(
      c => c.name === "👋welcome"
    );

    const rulesChannel = guild.channels.cache.find(
      c => c.name === "📜rules"
    );

    if (welcomeChannel) {
      await welcomeChannel.send({
        content: `# 👋 Welcome to TIX SMP!

Welcome to **TIX SMP**!

Please:
✅ Read the rules
✅ Have fun
✅ Respect everyone

Enjoy your adventure!`
      });
    }

    if (rulesChannel) {
      await rulesChannel.send({
        content: `# 📜 TIX SMP Rules

1. Be respectful
2. No cheating
3. No exploiting bugs
4. No spam
5. No hate speech
6. Listen to staff
7. Keep chat appropriate
8. Have fun!

Breaking these rules may result in punishment.`
      });
    }

    await interaction.followUp({
      content:
        "✅ **TIX SMP setup complete!**\n\nRoles, channels and categories have been created successfully."
    });

  }
};
