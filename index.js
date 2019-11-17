const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');
const choices = ["Black", "Blue", "red", "Orange", "Purple"];
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function color() {
  return inquirer.prompt([
    {
      type: "rawlist",
      message: "Please select your favorite color?",
      name: "color",
      choices: choices
    }
  ]);
}

async function github() {

  const movieUrl = `https://api.github.com/users/baredh821?`;
  let res = await axios.get(movieUrl);
  console.log(res.data.name);
  console.log(res.data.location);
  console.log(res.data.html_url);
  console.log(res.data.blog);
  console.log(res.data.bio);
  console.log(res.data.public_repos);
  console.log(res.data.followers);
  console.log(res.data.blog);
  console.log(res.data.following);
  // var name = res.data.name;
  return res
}

function generateHTML(userInfo, favColor) {
  console.log(favColor)
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container" style="background-color:${favColor.color}">
    <h1 class="display-4" style="background-color:${favColor.color}">Hi! My name is ${userInfo.data.name}</h1>
    <p class="lead">I am from ${userInfo.data.name}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${userInfo.location}</li>
      <li class="list-group-item">LinkedIn: ${userInfo.blog}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

async function init() {
  console.log("hi");
  try {
    const answers = await color();

    const users = await github();
    console.log(users.data.name, users.data.location, users.data.blog, "here with users")
    const html = generateHTML(users, answers);

    await writeFileAsync("index.html", html);

    var readHtml = fs.readFileSync('index.html', 'utf8');
    var options = { format: 'Letter' };

    pdf.create(readHtml, options).toFile('test.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
    });

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}

init();
