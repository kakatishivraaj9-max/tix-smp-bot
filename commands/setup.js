const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Create the TIX SMP server structure")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.reply({
      content: "🚀 Setting up TIX SMP... This may take a few seconds.",
      ephemeral: true
    });

    const guild = interaction.guild;

    // Create categories
    const information = await guild.channels.create({
      name: "📢 INFORMATION",
      type: ChannelType.GuildCategory
    });

    const community = await guild.channels.create({
      name: "💬 COMMUNITY",
      type: ChannelType.GuildCategory
    });

    // Create channels
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
      name: "general",
      type: ChannelType.GuildText,
      parent: community.id
    });

    await interaction.followUp("✅ Basic TIX SMP server created!");
  }
};
