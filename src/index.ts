import path from 'path'

import * as artifact from '@actions/artifact'
import * as cache from '@actions/cache'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'
import * as glob from '@actions/glob'
import * as io from '@actions/io'
import * as toolCache from '@actions/tool-cache'
import axios from 'axios'

import Plat from './plat'

async function run() {
  core.info('Run Notify action')
  try {
    const type = core.getInput('plat_type')
    const notifyTitle = core.getInput('notify_title') || 'Project Update'
    const notifyMessage = core.getInput('notify_message')
    const templateColor = core.getInput('template_color') || 'green'
    const {
      NOTIFY_WEBHOOK,
      NOTIFY_SIGNKEY,
      GITHUB_WORKSPACE: sourceDir = '',
      JOB_FAILURE_STATUS
    } = process.env

    if (!type || !NOTIFY_WEBHOOK) {
      core.setFailed(
        'required args is missing, please check your plat_type or NOTIFY_WEBHOOK setting'
      )
      return
    }

    const notify = new Plat[type](NOTIFY_WEBHOOK, github.context, {
      notifyTitle,
      notifyMessage,
      templateColor,
      signKey: NOTIFY_SIGNKEY
    })

    let msg
    if (type === 'Custom') {
      try {
        const notifyFn = require(
          path.join(sourceDir, '.echo.actions.notify.js')
        )
        msg = await notifyFn.call(
          notify,
          {
            envs: process.env,
            ctx: github.context,
            jobsFailureStatus: JOB_FAILURE_STATUS
          },
          {
            axios,
            core,
            github,
            exec,
            glob,
            cache,
            io,
            toolCache,
            artifact
          }
        )
      } catch (error) {
        core.info('Error when execute notify.')
        core.setFailed(error as Error)
        core.setOutput('error_message', (error as Error).message);
      }
    } else {
      let res: any = {}

      if (JOB_FAILURE_STATUS === 'failure') {
        res = await notify.notifyFailure()
      } else {
        res = await notify.notify()
      }

      msg = `code: ${res.code}, msg: ${res.msg}`
    }

    core.setOutput('msg', `${new Date() + ': ' + msg}`)
  } catch (error) {
    core.info('Error when run.')
    core.setFailed(error as Error)
    core.setOutput('error_message', (error as Error).message);
  }
}

void run()
