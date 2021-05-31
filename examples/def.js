#!/usr/bin/env node

/**
 * @fileOverview
 * This sample code illustrates how to scrape the results of a webpage
 */

const { default: geis } = require('..') // const config = require('@geislabs/geis')
const { puppeteer } = require('../packages/geis-puppeteer/dist')

const source = geis(
    {
        browse: puppeteer(),
        concurrency: {
            browse: 5,
        },
        partition: ['geis', 'geis', 'geis'],
    },
    ({ partition: repo, browse }) =>
        browse(`https://github.com/geislabs/${repo}`, (session) => ({
            author: cast(session['span.author'], string),
            author: cast(session['span.author'], string),
            author: cast(session['span.author'], string),
            author: cast(session['span.author'], string),
            author: cast(session['span.author'], string),
        }))
)
