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
