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
      // ==========================
      // INFORMATION CHANNELS
      // ==========================

      await guild.channels.create({
        name: "welcome",
        type: ChannelType.GuildText,
        parent: information.id
      });

      await guild.channels.create({
        name: "rules",
        type: ChannelType.GuildText,
        parent: information.id
      });

      await guild.channels.create({
        name: "announcements",
        type: ChannelType.GuildText,
        parent: information.id
      });

      // ==========================
      // COMMUNITY CHANNELS
      // ==========================

      await guild.channels.create({
        name: "general",
        type: ChannelType.GuildText,
        parent: community.id
      });

      await guild.channels.create({
        name: "media",
        type: ChannelType.GuildText,
        parent: community.id
      });

      await guild.channels.create({
        name: "bot-commands",
        type: ChannelType.GuildText,
        parent: community.id
      });

      // ==========================
      // STAFF CHANNELS
      // ==========================

      await guild.channels.create({
        name: "staff-chat",
        type: ChannelType.GuildText,
        parent: staff.id
      });

      await guild.channels.create({
        name: "logs",
        type: ChannelType.GuildText,
        parent: staff.id
      });

      // ==========================
      // VOICE CHANNEL
      // ==========================

      await guild.channels.create({
        name: "General",
        type: ChannelType.GuildVoice,
        parent: community.id
      });
            await interaction.followUp({
        content: "✅ TIX SMP setup completed successfully!"
      });

    } catch (error) {
      console.error(error);

      await interaction.followUp({
        content: "❌ Something went wrong while creating the server."
      });
    }

  }
};
