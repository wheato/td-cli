'use strict'

const colors = require('colors')
const exec = require('child_process').exec
const ora = require('ora')
const tpl_map = {
  'normal': 'TD',
  'video': 'tpl_video'
}

let gitUrl = 'https://github.com/TreedomCN/'

module.exports = (name, project) => {
  
  let tpl_name = name || "normal",
      proj_name = project

  if(!proj_name){

    console.error(colors.red('Please input a project name.'))
    return

  }
  
  gitUrl = gitUrl + tpl_map[tpl_name] + '.git'
  
  //get template from github
  let cmd_get_tpl = `git clone ${gitUrl} ${proj_name}`
  let spinner = ora('Start pull template from github')
  let create = exec(cmd_get_tpl)

  spinner.start()
  console.log()
  
  process.stdin.pipe(create.stdin);

  create.stdout.on('data', (data) => {
    console.log(colors.white(data.toString()))
  })

  create.stderr.on('data', (data) => {
    console.log(colors.white(data.toString()))
  })
  
  create.on('exit', () => {
    spinner.succeed()
    console.log(colors.green('Create complete!'))
    process.exit()
  })

}