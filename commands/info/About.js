import { Command } from '../../structures/index.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
export default class About extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            description: {
                content: 'Shows information about the bot',
                examples: ['about'],
                usage: 'about',
            },
            category: 'info',
            aliases: ['ab'],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks'],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx, args) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('View Website')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://lostisland.gq`),
            new ButtonBuilder()
                .setLabel('Join Our Server')
                .setStyle(ButtonStyle.Link)
                .setURL('https://dsc.gg/lostisland_mc'));
        const embed = this.client
            .embed()
            .setAuthor({
                name: 'Lost Island',
                iconURL: `https://cdn.discordapp.com/icons/1015701743583113247/af60925b2ade41e55f3f14b11f00dde0.webp`,
            })
            .setThumbnail('https://cdn.discordapp.com/icons/1015701743583113247/af60925b2ade41e55f3f14b11f00dde0.webp')
            .setColor(this.client.color.main)
            .addFields([
                {
                    name: 'Creator',
                    value: '[h00z3x](https://github.com/h00z3x)',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: `This bot is dedicated to lost island network and you can enjoy using it!`,
                    inline: true,
                },
            ]);
        return await ctx.sendMessage({
            content: '',
            embeds: [embed],
            components: [row],
        });
    }
}
/**
 * Project: lavamusic
 * Author: Blacky
 * Company: Coders
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
