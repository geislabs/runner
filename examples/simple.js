// Test

export const run = ({ partition, browse, string, cast }) =>
    partition([1, 2, 3], (value) =>
        browse('https://github.com/geislabs/geis', function* (session) {
            yield {
                author: cast(session['span.author'], string),
                author: cast(session['span.author'], string),
                author: cast(session['span.author'], string),
                author: cast(session['span.author'], string),
            }
        })
    )
