import {Command} from '../../structures/index.js';
import Genius from "genius-lyrics";

export default class Lyrics extends Command {
    constructor(client) {
        super(client, {
            name: 'lyrics',
            description: {
                content: 'Searches song lyrics for you.',
                examples: [
                    'lyircs nf - the search',
                ],
                usage: 'lyrics <song>',
            },
            category: 'music',
            aliases: ['ly'],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ['SendMessages', 'ViewChannel', 'EmbedLinks', 'Connect', 'Speak'],
                user: [],
            },
            slashCommand: true,
            options: [
                {
                    name: 'song',
                    description: 'The song you want to play',
                    type: 3,
                    required: true,
                    autocomplete: false,
                },
            ],
        });
    }

    async run(client, ctx, args) {
        const Client = new Genius.Client("c_pCGV2dipTZAvKmH3u2OunaIVYgIuKAVgy3KpSi183ELJue_CyLo3fR9azKxn9l");
        const song = args.join(' ');
        const searches = await Client.songs.search(song);
        const firstSong = searches[0];
        let lyrics = await firstSong.lyrics();
        let embed = this.client.embed()
        if (!lyrics) {
            return ctx.sendMessage({
                embeds: [
                    embed.setColor(this.client.color.red)
                        .setDescription("Not Found"),
                ]
            })
        }

        lyrics = [lyrics];
        if (lyrics[0].length > 4096) {
            do {
                let lastElement = lyrics[lyrics.length - 1];
                lyrics[lyrics.length - 1] = lastElement.slice(0, 4095);
                lyrics.push(lastElement.slice(4095));
            } while (lyrics[lyrics.length - 1].length > 4096);
        }

        for (let i in lyrics) {
            await ctx.sendMessage({
                embeds: [
                    embed.setColor(this.client.color.main)
                        .setTitle(`Lyrics - Page ${(parseInt(i) + 1).toString()}`)
                        .setThumbnail(firstSong.image)
                        .setDescription(lyrics[i])
                        .setFooter({
                            text: `Lyrics | ${firstSong.fullTitle}`,
                        })
                ]
            })
        }
    }
}