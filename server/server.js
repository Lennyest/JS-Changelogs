import express from 'express';
import cors from 'cors';
import { Octokit } from 'octokit';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const octokit = new Octokit({
  auth: process.env.GITHUB
})

// We don't want to show everything, so we ignore commits with certain keywords.
function showCommit(message) {
  return !(message.toLowerCase().startsWith("merge") || message.toLowerCase().startsWith("!"))
}

app.get('/commits', async (_, res) => {
  const data = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: process.env.OWNER,
    repo: process.env.REPO,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  // Quality of life variable.
  const list = data.data

  // Initialize our arrays
  let authors = []
  let commits = []

  // Loop through our data and grab fitting.
  list.forEach( element => {
    // We only want the username once and not to fill up the entire array several times, so we check if it contains it.
    const contains = authors.some(item => item[0] === element.commit.committer.name)
    
    // GitHub runs some commits for us by default, ignoring them.
    if (!contains && element.commit.committer.name != "GitHub") {
      authors.push([element.commit.committer.name, element.author.avatar_url])
    }

    // Check if we should see this commit.
    if (showCommit(element.commit.message)) {
      commits.push([element.commit.message, element.commit.committer.name, element.commit.committer.date])
    }
  });

  res.send({commits, authors});
});


app.listen(8080, () => {
  console.log("Listening on port http://localhost:8080");
});