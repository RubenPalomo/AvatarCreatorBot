import TelegramBot from "node-telegram-bot-api";
import md5 from "md5";

const token = "YOUR-TOKEN";
const bot = new TelegramBot(token, { polling: true });

/*

      * * * FUNCTIONS * * *

*/

// Function for styling the text to be used in other functions
const stylizeText = (string) => string.toLowerCase().replaceAll(" ", "");

// Function to generate random colors
const randomColor = () => {
  let color = "";
  const symbols = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++)
    color = color + symbols[Math.floor(Math.random() * 16)];

  return color;
};

// Function to generate avatars by a name
const generateAcronym = (string) => {
  const arrayTxt = string.split(" ");

  return `https://ui-avatars.com/api/?name=${arrayTxt[1]}+${
    arrayTxt[2]
  }&background=${randomColor()}&color=${randomColor()}&bold=true&size=512`;
};

// Function to generate gravatar
const generateGravatar = (mode, string) =>
  `https://www.gravatar.com/avatar/${md5(string)}?d=${mode}&f=y&s=512`;

/*

      * * * COMMANDS * * *

*/

// Command to generate an avatar by a name
bot.onText(/^\/generateAcronym(.+)/, (msg, match) => {
  const arrayImg = [];
  for (let i = 0; i < 6; i++)
    arrayImg.push({
      type: "photo",
      media: generateAcronym(match[1]),
      caption: `Acronym avatar generated from text: ${match[1]}`,
    });
  bot.sendMediaGroup(msg.chat.id, arrayImg);
});

// Command to generate a identicon gravatar
bot.onText(/^\/generateIdenticon(.+)/, (msg, match) => {
  const string = stylizeText(match[1]);
  bot.sendPhoto(msg.chat.id, generateGravatar("identicon", string), {
    caption: `Identicon avatar generated from text: ${string}`,
  });
});

// Command to generate a monster gravatar
bot.onText(/^\/generateMonster(.+)/, (msg, match) => {
  const string = stylizeText(match[1]);
  bot.sendPhoto(msg.chat.id, generateGravatar("monsterid", string), {
    caption: `Monster avatar generated from text: ${string}`,
  });
});

// Command to generate a wavatar gravatar
bot.onText(/^\/generateWavatar(.+)/, (msg, match) => {
  const string = stylizeText(match[1]);
  bot.sendPhoto(msg.chat.id, generateGravatar("wavatar", string), {
    caption: `Wavatar generated from text: ${string}`,
  });
});

// Command to generate a retro gravatar
bot.onText(/^\/generateRetro(.+)/, (msg, match) => {
  const string = stylizeText(match[1]);
  bot.sendPhoto(msg.chat.id, generateGravatar("retro", string), {
    caption: `Retro avatar generated from text: ${string}`,
  });
});

// Command to generate a robogravatar
bot.onText(/^\/generateRobot(.+)/, (msg, match) => {
  const string = stylizeText(match[1]);
  bot.sendPhoto(msg.chat.id, generateGravatar("robohash", string), {
    caption: `Roboavatar generated from text: ${string}`,
  });
});

// Start command
bot.onText(/^\/start/, (msg) =>
  bot.sendMessage(
    msg.chat.id,
    `Hi ${msg.from.first_name}, nice to meet you!\nI'm your *Avatar Generator bot*❤️\n\n` +
      "Use the _/about_ command to learn more about me.\n" +
      "Use the _/help_ command to get all the different commands to create your avatars.",
    {
      parse_mode: "Markdown",
    }
  )
);

// About command
bot.onText(/^\/about/, (msg) =>
  bot.sendMessage(
    msg.chat.id,
    "*About the bot*\nBot created by *@RubenPal*🗿. " +
      "Its function is to create fully customized avatars given a user-defined text. " +
      "There are different types of avatars that you can access using different commands. " +
      "Each avatar is unique and is defined by the text you have chosen to use.\n" +
      "To access the list of commands use the _/help_ command.",
    {
      parse_mode: "Markdown",
    }
  )
);

// Help command
bot.onText(/^\/help/, (msg) =>
  bot.sendMessage(
    msg.chat.id,
    "*Commands for the bot:*\n" +
      "1. Use _/generateAcronym_ followed by your name to generate 6 differents avatars with your acronym and random colors.\n" +
      "2. Use _/generateIdenticon_ followed by a text to generate a identicon avatar with the text id.\n" +
      "3. Use _/generateMonster_ followed by a text to generate a monster avatar with the text id.\n" +
      "4. Use _/generateWavatar_ followed by a text to generate a wavatar with the text id.\n" +
      "5. Use _/generateRetro_ followed by a text to generate a retro avatar with the text id.\n" +
      "6. Use _/generateRobot_ followed by a text to generate a robot avatar with the text id.\n" +
      "\nIf you have any issues or questions type to *@RubenPal*✏️",
    { parse_mode: "Markdown" }
  )
);

// Command for tests
bot.onText(/^\/test/, (msg) => {});

/*
    Bot available soon in telegram ( @XXXXX )
    Created by: Rubén Palomo Fontán
    LinkedIn: https://www.linkedin.com/in/ruben-palomo-fontan/
    Contact: ruben.palomof@gmail.comS
 
 */
