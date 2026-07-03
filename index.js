require("dotenv").config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Events
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }
  }
}

// Bot ready
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Slash commands
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "❌ There was an error executing this command.",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "❌ There was an error executing this command.",
        ephemeral: true
      });
    }
  }
});

// Login
client.login(process.env.TOKEN);
