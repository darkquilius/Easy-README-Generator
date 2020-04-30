const axios = require("axios");
const inquirer = require("inquirer");
const dotenv = require("dotenv");
const fs = require("fs");
const util = require("util")


const questions = [{
        type: "input",
        message: "What is your user name?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your project title?",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "What a description of your project?",
        name: "description"
    },
    {
        type: "input",
        message: "What are the installation needs?",
        name: "install"
    },
    {
        type: "input",
        message: "What are the usages for your app?",
        name: "usage"
    },
    {
        type: "input",
        message: "What license was used?",
        name: "license"
    },
    {
        type: "input",
        message: "Who were the contributors?",
        name: "contributors"
    },
    {
        type: "input",
        message: "What testing was done?",
        name: "test"
    }
];

function promptUser() {
    return inquirer
        .prompt([...questions])
}

const config = { headers: { accept: "application/json" } };

function getInfo(answers) {
    let call = `https://api.github.com/users/${answers.username}`
    return axios.get(call, config)
}

function generateHTML(answers, data) {
    return `![user picture](${data.data.avatar_url})

#### User Email: 
    email@email.com

#### Title: 
    ${answers.projectTitle}
#### Description:
    ${answers.description}
#### Table of Contents:
        -Installation
        -Usage
        -License
        -Contributors
        -Tests
        -Questions


#### Installation:
    ${answers.install}
#### Usage:
    ${answers.usage}
#### License:
    ${answers.license}
#### Contributors:
    ${answers.contributors}
#### Tests:
    ${answers.test}
#### Questions:
    If any questions persist, please direct them to my email: email@email.com

![badge](https://img.shields.io/github/languages/top/nielsenjared/badmath)`
}

async function init() {
    try {
        const answers = await promptUser();
        const data = await getInfo(answers);
        const HTML = await generateHTML(answers, data);
        fs.writeFile("README.md", HTML, function(err) {
            if (err) {
                return
            }
            console.log("Success!");
        })
    } catch (err) {
        console.log(err)
    }
}

init();