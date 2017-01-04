'use strict';
const snoowrap = require('snoowrap');
const creds = require('./snoowrap-secrets.js');

// NOTE: The following examples illustrate how to use snoowrap. However, hardcoding
// credentials directly into your source code is generally a bad idea in practice (especially
// if you're also making your source code public). Instead, it's better to either (a) use a separate
// config file that isn't committed into version control, or (b) use environment variables.

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
// Alternatively, just pass in a username and password for script-type apps.
const r = new snoowrap(creds);

// That's the entire setup process, now you can just make requests.

// Submitting a link to a subreddit
// r.getSubreddit('test').submitLink({
//   title: 'Mt. Cameramanjaro',
//   url: 'https://i.imgur.com/n5iOc72.gifv'
// });

// Printing a list of the titles on the front page
// r.getHot('all').map(post => post.title).then(console.log);

// Extracting every comment on a thread
// r.getSubmission('4j8p6d').expandReplies({limit: 2, depth: Infinity}).then(console.log);

// Automating moderation tasks
// r.getSubreddit('some_subreddit_name').getModqueue({limit: 100}).filter(someRemovalCondition).forEach(flaggedItem => {
//   flaggedItem.remove();
//   flaggedItem.subreddit.banUser(flaggedItem.author);
// });

// // Automatically creating a stickied thread for a moderated subreddit
// r.getSubreddit('some_subreddit_name')
//   .submitSelfpost({title: 'Daily thread', text: 'Discuss things here'})
//   .sticky()
//   .distinguish()
//   .approve()
//   .assignFlair({text: 'Daily Thread flair text', css_class: 'daily-thread'})
//   .reply('This is a comment that appears on that daily thread');
//   // etc. etc.
//
// // Printing the content of a wiki page
// r.getSubreddit('AskReddit').getWikiPage('bestof').content_md.then(console.log);


r.getInbox().then(console.log);
