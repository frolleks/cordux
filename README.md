# Cordux

A third-party Discord client that reimplements the Discord API built with React.

## Usage

Cordux tries to look as close as the official Discord client, use it like you would with normal Discord.

## Installation

There's no desktop client at the moment, use the [web app](https://cordux.vercel.app) instead.

## Contributing

### Setting up your development environment

**Prerequisites**
- Git (2.x.x or above)
- Node.js (16.x or above)
- yarn (3.x)

Next, you can clone the repository using Git:

```sh
git clone https://github.com/frolleks/cordux
cd cordux
```

Then, you install the dependencies with yarn:

```sh
yarn
```

After that, you can run Cordux in development mode:

```sh
yarn dev
```

You may also build for production:

```sh
yarn build
```

### Contributing changes to Cordux

Before contributing to Cordux, [create a fork](https://github.com/frolleks/cordux/fork) of the repo first.

Clone your fork, and it's recommended to make a new branch to push your changes to, so that conflicts won't happen. To create a new branch, run:

```sh
git checkout -b ＜new-branch＞
```

You may also create a new branch in GitHub by clicking on the branch name then type the name of your new branch.

If you did it on GitHub after you cloned the repository, pull the changes by running `git pull`.

You can now switch into the branch if you made it in GitHub by running:

```sh
git checkout <new-branch>
```

Congrats! You can now contribute to Cordux.

But, there's a guideline.

You must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your commit messages.

**Submitting changes to the main repo**

You may [open a pull request](https://github.com/frolleks/cordux/compare) and submit it to the main repo.

If you didn't follow the Conventional Commits specification on your commits, we will rename your PR title to follow the spec.

## License

This project is licensed under the [BSD 3-Clause](LICENSE) license.
