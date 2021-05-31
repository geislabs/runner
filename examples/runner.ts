#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

import { config } from '..' // const config = require('@geislabs/geis')
import browser from './browse'
import fetcher from './fetch'

export default config({
    plugins: [browser(), browser(), browser(), fetcher()],
    input: function* ({ browse }) {
        const session = browse('https://github.com/geislabs/geis')
        for (const item of session['.Post']) {
            yield {
                author1: item['span.author'].toString(),
                author2: item['span.author'].toString(),
                author3: item['span.author'].toString(),
                author4: item['span.author'].toString(),
            }
        }
    },
})
