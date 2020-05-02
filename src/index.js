#!/usr/bin/env node
const { program } = require('commander')
const { version } = require('../package.json')
const path = require('path')
const fileSystem = require('fs')
const chalk = require('chalk')
const promisify = require('util').promisify
const chmodr = require('chmodr')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const prompt = require('inquirer').createPromptModule()

const fs = {
    exists: promisify(fileSystem.exists),
    mkdir: promisify(fileSystem.mkdir),
    chmodr: promisify(chmodr),
    ncp: promisify(ncp),
    rimraf: promisify(rimraf),
    readFile: promisify(fileSystem.readFile),
    writeFile: promisify(fileSystem.writeFile),
}

const check = async (name) => {
    const projectPath = path.resolve(name)
    if (await fs.exists(projectPath)) {
        return false
    }
    return projectPath
}

const create = async (projectPath) => {
    await fs.mkdir(projectPath, { recursive: true })
    await fs.chmodr(projectPath, 0o755)
}

const generate = async (type, projectPath) => {
    const template = path.join(__dirname, '..', 'template')
    const source = path.resolve(
        template + '/' + (type === 'project' ? 'project' : 'package')
    )
    return await fs.ncp(source, projectPath)
}

const transform = async (answers, projectPath) => {
    const packageJson = path.join(projectPath, 'package.json')
    let content = await fs.readFile(packageJson)
    for (let i in answers) {
        content = content.toString().replace('{' + i + '}', answers[i])
    }
    return await fs.writeFile(packageJson, content)
}

const rollback = async (projectPath) => {
    const exists = await check(projectPath)
    if (exists) {
        fs.rimraf(projectPath)
    }
}

const getDetails = async (name) => {
    const questions = [
        {
            type: 'input',
            name: 'name',
            default: name,
            message: 'Name: ',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description : ',
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author : ',
        },
        {
            type: 'input',
            name: 'version',
            message: 'Version: ',
            default: '1.0.0',
        },
        {
            type: 'input',
            name: 'license',
            message: 'License: ',
            default: 'MIT',
        },
    ]

    return await prompt(questions)
}

const trigger = async (type, name) => {
    try {
        const projectPath = await check(name)
        if (!projectPath) {
            console.log(chalk.red(`Project ${name} already exists`))
            process.exit(0)
        }

        await create(projectPath)
        const answers = await getDetails(name)
        await generate(type, projectPath)
        await transform(answers, projectPath)
    } catch (err) {
        console.log(err)
        //await rollback(projectPath);
    }

    return true
}

program.version(version)
program
    .command('generate <type> <name>')
    .description('This command to generate eith project or package')
    .action(trigger)

program.parse(process.argv)
