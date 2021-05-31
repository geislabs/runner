#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

import { run, config } from '..' // const config = require('@geislabs/geis')
import { browse } from '@geislabs/geis'

export default config({
    input: function* () {
        const session = browse('https://github.com/geislabs/geis')
        yield {
            author1: session['span.author'].toString(),
            author2: session['span.author'].toString(),
            author3: session['span.author'].toString(),
            author4: session['span.author'].toString(),
        }
    },
    output: console.log,
})
