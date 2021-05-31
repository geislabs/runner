import { string, cast } from '@geislabs/geis'

const plugins = {
    'my-stream': {
        raise: false,
        concurrency: 5,
        create: ({ partition, browse }) =>
            partition(['geis', 'geis', 'geis'], (value) =>
                browse(
                    `https://github.com/geislabs/${value}`,
                    function* (session) {
                        yield {
                            author: cast(session['span.author'], string),
                            author: cast(session['span.author'], string),
                            author: cast(session['span.author'], string),
                            author: cast(session['span.author'], string),
                        }
                    }
                )
            ),
    },
}
