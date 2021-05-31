#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: geis, string, cast } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const source = geis(
    {
        browse: puppeteer(),
        scale: 1,
    },
    function* ({ partition: repo, browse }) {
        const session = browse(`https://github.com/geislabs/${repo}`)
        yield {
            author1: cast(session['span.author'], string),
            author2: cast(session['span.author'], string),
            author3: cast(session['span.author'], string),
            author4: cast(session['span.author'], string),
            author5: cast(session['span.author'], string),
        }
    }
)
