// parse-commits.js
async function loadAndUseParser() {
  // Dynamically import the entire module
  const conventionalCommitsParser = await import('conventional-commits-parser');

  // Access the parseCommitsStream from the module
  const { parseCommitsStream } = conventionalCommitsParser;

  // Create a stream to parse a sample commit message
  const { Readable } = await import('stream');
  const commitsStream = new Readable({
    read() {
      this.push('refactor!: add README\n');
      this.push(null); // No more data
    }
  });

  // Define parser options
  const options = {
    headerPattern: /^(\w+)(?:\((.*)\))?(!)?: (.*)$/,
    headerCorrespondence: ['type', 'scope', 'breaking', 'subject']
  };

  // Create the stream parser with options
  const parsedStream = commitsStream.pipe(parseCommitsStream(options));

  // Handle parsed data
  parsedStream.on('data', data => {
    console.log('Parsed Commit:', data);
  });

  // Optional: Catch any errors during parsing
  parsedStream.on('error', error => {
    console.error('Error parsing commit:', error);
  });
}

loadAndUseParser();
