---
title: "\"I am not what I am.\" — Homebrew Python PIP"
date: 2026-01-31
excerpt: "Unfortunately, it's neither William Shakespeare nor Iago who said it this time. It's Homebrew Python."
permalink: /posts/2026/01/homebrew-python/
tags:
  - python
  - homebrew
  - pip
  - macos

---
Unfortunately, it's neither William Shakespeare nor Iago who said it this time. It's Homebrew Python.

## What Happened

I was simply trying to run:

```zsh
pip install check50
```

and he greeted me with:

> error: externally-managed-environment
>
> × This environment is externally managed
> ╰─> To install Python packages system-wide, try brew install
> xyz, where xyz is the package you are trying to
> install.
>
> If you wish to install a Python library that isn't in Homebrew,
> use a virtual environment:
>
> ``` zsh
> python3 -m venv path/to/venv
> source path/to/venv/bin/activate
> python3 -m pip install xyz
> ```
>
> If you wish to install a Python application that isn't in Homebrew,
> it may be easiest to use 'pipx install xyz', which will manage a
> virtual environment for you. You can install pipx with
>
> ```zsh
> brew install pipx
> ```
>
> You may restore the old behavior of pip by passing
> the '`--break-system-packages`' flag to pip, or by adding
> '`break-system-packages = true`' to your pip.conf file. The latter
> will permanently disable this error.
>
> If you disable this error, we STRONGLY recommend that you additionally
> pass the '`--user`' flag to pip, or set '`user = true`' in your pip.conf
> file. Failure to do this can result in a broken Homebrew installation.
>
> Read more about this behavior here: <https://peps.python.org/pep-0668/>

**Praise the Homebrew Python, with all your heart, and with all your mind, and with all your soul.**

## The Problem

1. I don't want to create a venv. I would've created one if I needed to. I wanted to install it **globally**.
2. The package isn't available in Homebrew (and so do most other packages).
3. The message is **terribly** written. It sounds like bypassing it will cause a heart attack (or even worse).
4. Setting `user = true` and `--break-system-packages` in my pip.conf didn't work. I had to pass the flags manually every time. (That might be on my side, but I can't figure it out, unfortunately.)

## Why It Happened

A maintainer of pip requested Homebrew to adopt this behavior in accordance with [PEP 668](https://peps.python.org/pep-0668/) (see https://github.com/orgs/Homebrew/discussions/3404).

And that caused Homebrew Python's pip to start barking ever since.

I **do** understand the purpose. It's completely acceptable: 

Some Homebrew formulas rely on specific Python package versions, and letting users mess up the global environment can absolutely break those formulas.

And the Homebrew Python was intended for Homebrew packages, unlike me who was using Homebrew for Python.

But the message was **still** terrible, as I've just said.

## The Solution

**Don't** use Homebrew's Python. Instead, use **pyenv**, which could be installed using Homebrew:

```zsh
brew install pyenv
```

For the rest of the installation, go to https://github.com/pyenv/pyenv. Me rewriting it here would simply create more confusion.

## Before We End

Readers probably know that I intentionally keep my blog posts short. But I want to quote [@mlindner](https://github.com/orgs/Homebrew/discussions/3404)'s comment from the Homebrew discussion thread above:

> This is a garbage... Now this even extends to making Python unable to use its own package manager.

That comment was marked as disruptive and later drew responses from multiple Homebrew maintainers. I'm not here to attack anyone, but to [@mlindner](https://github.com/orgs/Homebrew/discussions/3404): I agree.

The error message is exactly the kind of writing I **hated**, and most readers of this blog probably would, too.

It **doesn't** state the problem, **doesn't** explain why, and **doesn't** give an actual solution. I've seen countless Reddit posts complaining about this exact same issue. And it could've been avoided by simply adding "use `pyenv`".

Done.