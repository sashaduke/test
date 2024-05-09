// parse-commits.mjs
async function parseCommitMessage(commitMessage) {
  const { default: parser } = await import('conventional-commits-parser');
  const { Readable } = await import('stream');

  const readable = new Readable({
    read() {}
  });

  // Push your commit message to the stream and then end it
  readable.push(commitMessage + '\n'); // Ensure the message ends with a newline
  readable.push(null);

  const parserOpts = {
    headerPattern: /^(\w+)(?:\((.*)\))?(!)?: (.*)$/,
    headerCorrespondence: ['type', 'scope', 'breaking', 'subject'],
  };

  // Create the conventional commits parser stream
  const commitStream = readable.pipe(parser(parserOpts));

  commitStream.on('data', (data) => {
    console.log('Parsed Commit:', data);
  });

  commitStream.on('error', (error) => {
    console.error('Error parsing commit:', error);
  });
}

// Example commit message
parseCommitMessage('refactor!: add README');
