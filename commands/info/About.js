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
                .setLabel('View website')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://snowynetwork.ir`));

        const embed = this.client
            .embed()
            .setAuthor({
                name: 'Snowy Network',
                iconURL: `https://cdn.discordapp.com/icons/1174632788796919818/a_99932c3c663490e2513846cc39701fde.gif?size=640`,
            })
            .setThumbnail('https://cdn.discordapp.com/icons/1174632788796919818/a_99932c3c663490e2513846cc39701fde.gif?size=640')
            .setColor(this.client.color.main)
            .addFields([
                {
                    name: 'Creator',
                    value: '[h00z3x](https://github.com/h00z3x)',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: `This bot is dedicated to the Snowy Network Discord server!`,
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
