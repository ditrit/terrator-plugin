# terrator-plugin

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=alert_status)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=reliability_rating)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=sqale_rating)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=security_rating)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=code_smells)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=bugs)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=vulnerabilities)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=sqale_index)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=ncloc)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=coverage)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ditrit_terrator-plugin&metric=duplicated_lines_density)](https://sonarcloud.io/summary/overall?id=ditrit_terrator-plugin)

[![](https://dcbadge.vercel.app/api/server/zkKfj9gj2C?style=flat&theme=default-inverted)](https://discord.gg/zkKfj9gj2C)

Plugin for managing Terraform files in [Leto-Modelizer](https://github.com/ditrit/leto-modelizer).

## Build your plugin

```
npm run build
```

## Grammar

We use the grammar from the [official antlr4 grammar repository](https://github.com/antlr/grammars-v4/tree/master/terraform).


<table>
  <thead>
    <tr>
      <th colspan="2">Legends</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
      <td>Full support</td>
    </tr>
    <tr>
      <td align="center">$\textcolor{orange}{\textsf{〜}}$</td>
      <td>Partial support</td>
    </tr>
    <tr>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
      <td>Not supported but planned</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="6">Functionalities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="5">resource</td>
      <td align="center">$\textcolor{green}{\Large{✓}}$</td>
    </tr>
    <tr>
      <td colspan="5">data</td>
      <td align="center">$\textcolor{green}{\Large{✓}}$</td>
    </tr>
    <tr>
      <td colspan="5">module</td>
      <td align="center">$\textcolor{green}{\Large{✓}}$</td>
    </tr>
    <tr>
      <td colspan="5">provider</td>
      <td align="center">$\textcolor{green}{\Large{✓}}$</td>
    </tr>
    <tr>
      <td colspan="5">output</td>
      <td align="center">$\textcolor{orange}{\textsf{〜}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">value</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">description</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">sensitive</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">depends_on</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td colspan="5">variable</td>
      <td align="center">$\textcolor{orange}{\textsf{〜}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">value</td>
      <td align="center">$\textcolor{orange}{\textsf{〜}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">default</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">sensitive</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">nullable</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">validation</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">type</td>
      <td align="center">$\textcolor{orange}{\textsf{〜}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">string</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">bool</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">number</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">list</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">set</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">map</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">object</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td width="5px" padding="0"></td>
      <td colspan="3">tuple</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td colspan="5">locals</td>
      <td align="center">$\textcolor{orange}{\textsf{〜}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">string</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">bool</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">number</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">list</td>
      <td align="center">$\textcolor{green}{\textbf{\Large{✓}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">set</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">object</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">tuple</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td width="5px" padding="0"></td>
      <td colspan="4">map</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td colspan="5">terraform</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
    <tr>
      <td colspan="5">provisionner</td>
      <td align="center">$\textcolor{red}{\textbf{\textsf{X}}}$</td>
    </tr>
  </tbody>
</table>

## Development

### Generate the parser

We use antlr4 to generate the Terraform parser. Follow [these steps](https://github.com/antlr/antlr4/blob/master/doc/getting-started.md#unix) from the official antlr4 repository to install it.

Make sure your `CLASSPATH` environment variable is set.

The default antlr4 executable path is set to `/usr/local/lib/antlr-4.13.0-complete.jar` on Linux and `C:\Javalib\antlr-4.13.0-complete.jar` on Windows.

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
