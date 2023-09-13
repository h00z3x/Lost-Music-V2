import {ApplicationCommandOptionType} from "discord.js";
import {Command} from "../../structures/index.js";

export default class Add extends Command {
    constructor(client) {
        super(client, {
            name: "add",
            description: {
                content: "Adds a song or a queue to the playlist",
                examples: ["add <playlist> <song|queue>"],
                usage: "add <playlist> <song|queue>"
            },
            category: "playlist",
            aliases: ["add"],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: []
            },
            slashCommand: true,
            options: [
                {
                    name: "playlist",
                    description: "The playlist you want to add",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "song",
                    description: "The song you want to add",
                    type: ApplicationCommandOptionType.String,
                    choices: [{name: 'queue', value: 'queue'}],
                    required: true
                }
            ]
        });
    }

    async run(client, ctx, args) {
        const playlist = args[0];
        const song = args[1];
        if (!playlist)
            return ctx.sendMessage({
                embeds: [{
                    description: "Please provide a playlist",
                    color: client.color.red
                }]
            });
        if (!song)
            return ctx.sendMessage({
                embeds: [{
                    description: "Please provide a song or type queue",
                    color: client.color.red
                }]
            });
        const playlistData = await client.prisma.playlist.findFirst({
            where: {
                name: playlist,
                userId: ctx.author.id
            }
        });
        if (!playlistData)
            return ctx.sendMessage({
                embeds: [{
                    description: "That playlist doesn't exist",
                    color: client.color.red
                }]
            });
        if (song !== 'queue') {
            const res = await client.queue.search(song);
            if (!res)
                return ctx.sendMessage({
                    embeds: [{
                        description: "No songs found",
                        color: client.color.red
                    }]
                });
            const trackStrings = res.tracks.map(track => JSON.stringify(track))[0];
            await client.prisma.playlist.update({
                where: {
                    id: playlistData.id
                },
                data: {
                    songs: JSON.stringify([...JSON.parse(playlistData.songs), ...trackStrings])
                },
            });
            return await ctx.sendMessage({
                embeds: [{
                    description: `Added 1 song to ${playlistData.name}`,
                    color: client.color.green
                }]
            });
        } else {
            const player = client.queue.get(ctx.guild.id);
            let res = [];
            if (player.queue.length === 0 || player.queue.length > 0) {
                res.push(player.current);
            } else {
                return await ctx.sendMessage({
                    embeds: [{
                        description: `The queue is empty`,
                        color: client.color.red
                    }]
                });
            }
            if (player.queue.length > 0) player.queue.map(track => res.push(track));

            const trackStrings = res.map(track => JSON.stringify(track));
            await client.prisma.playlist.update({
                where: {
                    id: playlistData.id
                },
                data: {
                    songs: JSON.stringify([...JSON.parse(playlistData.songs), ...trackStrings])
                },
            });
            return await ctx.sendMessage({
                embeds: [{
                    description: `Added ${trackStrings.length} song to ${playlistData.name}`,
                    color: client.color.green
                }]
            });
        }

    }
}
