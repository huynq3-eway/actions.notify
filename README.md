# Tham khảo
- [![act](https://github.com/nektos/act)
- [![act document](https://nektosact.com/)
- [![Re-Engineering CI/CD pipelines for SciPy](https://labs.quansight.org/blog/2021/10/re-engineering-cicd-pipelines-for-scipy)
- [![Debugging GitHub Actions workflows effectively](https://blog.harshcasper.com/debugging-github-actions-workflows-effectively)
- [![Accessing contextual information about workflow runs](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs)

# Command
```shell
# list jobs
act -l --container-architecture linux/amd64

# run a job with act
act -j test-failed-workflow --container-architecture linux/amd64
act -j test-custom-action --container-architecture linux/amd64 --secret LARK_BOT_NOTIFY_WEBHOOK=...
```

# TODO:
- [x] Document
- [ ] Unit test