import { Command } from '../../structures/index.js';
import { updateSetup } from '../../utils/SetupSystem.js';
export default class Leave extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            description: {
                content: 'Leaves the voice channel',
                examples: ['leave'],
                usage: 'leave',
            },
            category: 'music',
            aliases: ['dc'],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: true,
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
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (player) {
            ctx.sendMessage({
                embeds: [
                    embed.setColor(this.client.color.main).setDescription(`Left <#${player.player.connection.channelId}>`),
                ],
            });
            player.destroy();
            await updateSetup(client, ctx.guild);
        }
        else {
            ctx.sendMessage({
                embeds: [embed.setColor(this.client.color.red).setDescription(`I'm not in a voice channel`)],
            });
        }
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
