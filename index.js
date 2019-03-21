#!/usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')

const resume = require('./resume.json')

const prompt = {
  type: 'list',
  name: 'answer',
  message: 'What would you like to know?',
  choices: [...Object.keys(resume), 'Exit']
}

const exitPrompt = {
  type: 'list',
  name: 'exitBack',
  message: 'Go back or Exit?',
  choices: ['Back', 'Exit']
}

const SEPARATOR = '--------------------------------------'

function handler () {
  inquirer.prompt(prompt).then(({ answer }) => {
    if (answer.toLowerCase() === 'Exit') {
      return
    }

    if (resume[`${answer}`]) {
      console.log(chalk.bold.cyan(SEPARATOR))
      resume[`${answer}`].forEach(info => {
        console.log(chalk.bold(info))
      })
      console.log(chalk.bold.cyan(SEPARATOR))
    }

    inquirer.prompt(exitPrompt).then(choice => {
      if (choice.exitBack === 'Back') {
        handler()
      }
    })
  })
}

console.log(`Hi, I'm Tiaan`)
handler()
