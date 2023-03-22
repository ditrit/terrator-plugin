# terrator-plugin

Plugin for managing Terraform files in [Leto-Modelizer](https://github.com/ditrit/leto-modelizer).

## Build your plugin

```
npm run build
```

## Grammar

We use the grammar from the [official antlr4 grammar repository](https://github.com/antlr/grammars-v4/tree/master/terraform).

## Development

### Generate the parser

We use antlr4 to generate the Terraform parser. Follow [these steps](https://github.com/antlr/antlr4/blob/master/doc/getting-started.md#unix) from the official antlr4 repository to install it.

Make sure your `CLASSPATH` environment variable is set. 

The default antlr4 executable path is set to `/usr/local/lib/antlr-4.11.0-complete.jar` on Linux and `C:\Javalib\antlr-4.11.0-complete.jar` on Windows. 

You  can use the `ANTLR4_PATH` environment variable to specify your own antlr4 executable path. For example, on Linux:


```
export ANTLR4_PATH="/usr/local/lib/antlr-4.11.0-complete.jar"
```


You can then run:

```
npm run parser:generate
```

### How to release

We use [Semantic Versioning](https://semver.org/spec/v2.0.0.html) as guideline for the version management.

Steps to release:
- Create a new branch labeled `release/vX.Y.Z` from the latest `main`.
- Improve the version number in `package.json`, `package-lock.json` and `changelog.md`.
- Verify the content of the `changelog.md`.
- Commit the modifications with the label `Release version X.Y.Z`.
- Create a pull request on github for this branch into `main`.
- Once the pull request validated and merged, tag the `main` branch with `vX.Y.Z`
- After the tag is pushed, make the release on the tag in GitHub

### Git: Default branch

The default branch is main. Direct commit on it is forbidden. The only way to update the application is through pull request.

Release tag are only done on the `main` branch.

### Git: Branch naming policy

`[BRANCH_TYPE]/[BRANCH_NAME]`

* `BRANCH_TYPE` is a prefix to describe the purpose of the branch. Accepted prefixes are:
  * `feature`, used for feature development
  * `bugfix`, used for bug fix
  * `improvement`, used for refacto
  * `library`, used for updating library
  * `prerelease`, used for preparing the branch for the release
  * `release`, used for releasing project
  * `hotfix`, used for applying a hotfix on main
* `BRANCH_NAME` is managed by this regex: `[a-z0-9._-]` (`_` is used as space character).
