<br/>
<p align="center">
  <a href="https://github.com/h00z3x/Lost-Music-V2">
    <img src="https://cdn.discordapp.com/icons/1015701743583113247/af60925b2ade41e55f3f14b11f00dde0.webp?size=1024" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Lost Island Music V2</h3>

  <p align="center">
    An edited version of <a href="https://github.com/brblacky/lavamusic">LavaMusic</a>.
    <br/>
    <br/>
    <a href="https://github.com/h00z3x/Lost-Music-V2/issues">Report Bug</a>
    .
    <a href="https://github.com/h00z3x/Lost-Music-V2/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/h00z3x/Lost-Music-V2/total) ![Contributors](https://img.shields.io/github/contributors/h00z3x/Lost-Music-V2?color=dark-green) ![Forks](https://img.shields.io/github/forks/h00z3x/Lost-Music-V2?style=social) ![Stargazers](https://img.shields.io/github/stars/h00z3x/Lost-Music-V2?style=social) ![Issues](https://img.shields.io/github/issues/h00z3x/Lost-Music-V2)

## Table Of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

Lost Island Server Music Bot Source. An edited version of LavaMusic.

**Why Lost Music:**
1. Fixed playlist on lavamusic.
2. Changed the mongodb to sqlite for easier use.
3. Added lyrics command.

## Getting Started

You need node.js preferably latest version if it doesn't work!

### Prerequisites

* npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/h00z3x/Lost-Music-V2.git
```

2. Install NPM packages

```sh
npm install
```

3. Edit .ENV FILE

```dotenv
TOKEN="" # Your bot token
PREFIX="-" # Your prefix
OWNER_IDS="id, id, id" # Your ID
CLIENT_ID="clientid" # Your bot client ID
GUILD_ID="" # Your server ID (if you want to use it for a single server)
PRODUCTION="true" # "true" for production
DATABASE_URL="file:./database.db" #DONT CHANGE IT
LAVALINK_URL="" # Your lavalink url
LAVALINK_AUTH="1" # Your lavalink password
LAVALINK_NAME="" # Your lavalink name
LAVALINK_SECURE= "" # true for secure lavalink
BOT_ACTIVITY_TYPE=2 # Activity type is a number from 0 to 5 see more here https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
BOT_STATUS="idle"
BOT_ACTIVITY="Lost Music"
GENIUS_KEY=""
```

4. Generate Prisma
```sh
npx prisma generate
```
5. Generate Database
```sh
npx prisma migrate dev
```

## Usage

Run:
```sh
node index.js
```

## Roadmap

See the [open issues](https://github.com/h00z3x/Lost-Music-V2/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/h00z3x/Lost-Music-V2/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/h00z3x/Lost-Music-V2/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

## Authors

* **h00z3x** - *Developer* - [h00z3x](https://github.com/h00z3x/) - *Lyrics, Database, Fix Playlist*
* **brblacky** - *The Person I respect* - [brblacky](https://github.com/brblacky/) - *almost everything in typescript*

## Acknowledgements

* [LavaMusic](https://github.com/brblacky/lavamusic)