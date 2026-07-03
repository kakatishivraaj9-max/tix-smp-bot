const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Creates the basic TIX SMP server"),

  async execute(interaction) {

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "❌ You must be an Administrator.",
        ephemeral: true
      });
    }

    await interaction.reply({
      content: "⚡ Setting up server...",
      ephemeral: true
    });

    const guild = interaction.guild;

    try {

      // ==========================
      // ROLES
      // ==========================

      const owner = await guild.roles.create({
        name: "👑 Owner",
        permissions: [PermissionFlagsBits.Administrator]
      });

      const admin = await guild.roles.create({
        name: "⚙️ Admin",
        permissions: [
          PermissionFlagsBits.ManageGuild,
          PermissionFlagsBits.ManageChannels,
          PermissionFlagsBits.ManageRoles
        ]
      });

      const moderator = await guild.roles.create({
        name: "🛡️ Moderator",
        permissions: [
          PermissionFlagsBits.KickMembers,
          PermissionFlagsBits.BanMembers,
          PermissionFlagsBits.ManageMessages
        ]
      });

      const member = await guild.roles.create({
        name: "👤 Member"
      });

      // ==========================
      // CATEGORIES
      // ==========================

      const information = await guild.channels.create({
        name: "📢 INFORMATION",
        type: ChannelType.GuildCategory
      });

      const community = await guild.channels.create({
        name: "💬 COMMUNITY",
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
            id: owner.id,
            allow: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: admin.id,
            allow: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: moderator.id,
            allow: [PermissionFlagsBits.ViewChannel]
          }
        ]
      });
