---
title: "KISS: How I Built LinkDown and My Philosophy of Software"
dateFormatted: April 6th, 2026
date: "2026-04-06"
description: "Back in the “good old days,” when I was still using Windows and was in middle school, I created this software..."
permalink: /posts/2026/04/kiss-linkdown/
tags:
  - windows
  - automation
  - github-actions
  - inno-setup
  - software-design
  - cli
  - youth
---
Back in the “good old days,” when I was still using Windows and was in middle school, I created this software—now the flagship project of my organization, LinkScape—called LinkDown. Today, I want to talk about the entire experience of developing this software, along with my philosophy of software development.

## History

I started coding back when I was in Grade 4, and my first-ever programming project was to compile an OpenWrt firmware for the NanoPi R2S through GitHub Actions, a free online CI/CD service.

And then in Grade 6, I saw this post https://www.runningcheese.com/onekey-video-download (unfortunately, the original post is in Chinese) about video downloading on Windows by a Chinese blogger, [@RunningCheese](https://www.runningcheese.com), whom I have long followed. It took me a whole hour to configure everything: it consisted of a now-broken Chrome extension named [Open With](https://github.com/darktrojan/openwith) (which was originally intended for opening the current browser tab in other browsers), downloading and adding [yt-dlp](https://github.com/yt-dlp/yt-dlp) (an enhanced version of [youtube-dl](https://github.com/ytdl-org/youtube-dl), and the only difference between them is that yt-dlp is much faster), [Lux](https://github.com/iawia002/lux) (basically a Chinese version of youtube-dl), [FFmpeg](https://www.ffmpeg.org/), and ffprobe.

The final experience was enjoyable: with a single right-click on a webpage, you can download videos to your computer instantly in mp4 format. However, the time to configure everything made it not worth it.

On macOS, you have a near-perfect solution to the problem by using the famous Downie, developed by Charlie Monroe. Although you had to pay for it (or use the cracked version), macOS users at least **had** a solution. But on Windows, there is currently no software that is as easy and nice as Downie. The [@RunningCheese](https://www.runningcheese.com) solution had nearly the same experience, but with higher configuration costs.

## My First Approach: Annie & Danny

My original thought was to write an easy batch script to download all the files and configure the paths automatically. I wrote for around a whole hour only, and finished the first version. And after debugging for three hours, I found that the PATH configuration somehow never worked. After giving up on solving the PATH problem, I decided to release it and called it Annie, which was the previous name of Lux, because Downie was a person’s name too. But after discussing with [@RunningCheese](https://www.runningcheese.com), I decided to change it to Danny.

The software received some feedback in [@RunningCheese](https://www.runningcheese.com)'s WeChat group chat. Many tried using my script, and most users with a technical background responded with positive feedback.

But users unfamiliar with technology brought me more requests. It is hard for an experienced programmer to imagine that someone’s laptop had no Python installed at all, and a user not only doesn’t know how to configure PATH, but doesn’t even know what PATH is. They also didn’t understand how to copy and paste a single line of code into the [Open With](https://github.com/darktrojan/openwith) configurations and place the Native Host files in the correct directory.

After modifying the script multiple times, I decided to try another approach.

## My Second Approach: Anika

I decided that I needed something more powerful. There shouldn’t be any command line involved on the user side, and ~~I'm too lazy to~~ it was too complicated to create a GUI. There are many GUI wrappers out there, and what the user really needs is the same simple browser right-click experience as in Downie.

I knew that most “proper” software (unlike mine) consists of a simple setup.exe, a.k.a. a Setup Wizard, so I decided maybe I should create one?

I followed the tutorials on the internet (ChatGPT didn't even exist back at that time!!!!!!!) and downloaded the enormous Microsoft Visual Studio. I tried creating a setup wizard using that and decided it's not what I wanted.

Later on, I found [Inno Setup](https://jrsoftware.org/isinfo.php) instead. It’s fun to note that [Inno Setup](https://jrsoftware.org/isinfo.php) is written in Pascal, a nearly dead programming language nowadays. I needed to include a Python release for those who don’t have Python, and that’s how I met Edward Hsing, who was developing [BINPython](https://github.com/EdwardLab/binpython), and now the founder of the legendary DigitalPlat Free Domain `us.kg` (he somehow registered a public suffix lol).

After trying it out, I found that [BINPython](https://github.com/EdwardLab/binpython) didn't seem to work with my software perfectly. So I bundled the official AMD64 portable version of Python, along with ffmpeg, ffprobe, Lux, yt-dlp, and BBDown (a CLI specifically for Bilibili, basically the Chinese alternative to YouTube).

Everything was sorted out perfectly. Luckily, I even found `modpath.iss` (see https://www.legroom.net/software/modpath), and it solved the PATH configuration issue perfectly, except for the Native Host MessengerApp configuration (by the way, we switched from [Open With](https://github.com/darktrojan/openwith) to [ContextSearch web-ext](https://github.com/ssborbis/ContextSearch-web-ext)). The Native Host configuration was simplified to a simple batch script, though.

That second go was way better.

Since it was an entire change to the infrastructure, I renamed it Anika.

I even made a server-based online commercial version for Anika (see https://github.com/EdwardLab/anika for details).

## My Third Approach: LinkDown

After founding LinkScape on December 19, 2023 (and oh, I'm now in Grade 7!), I decided to stop maintaining Anika and rename it LinkDown, the flagship of LinkScape. We link things together.

The last change was to integrate LinkDown with a **dedicated** browser extension this time. I vibe coded `LinkDown for Browsers` for both Chrome and Firefox using Cursor (which was the only vibe coding involved in LinkDown as a whole). I also discovered some advanced features in [Inno Setup](https://jrsoftware.org/isinfo.php) to eliminate the use of the batch file to configure MessengerApp.

The whole software structure is insanely simple, stupid, but it works. [Inno Setup](https://jrsoftware.org/isinfo.php) helps set up the registry, MessengerApp, existing video-downloading CLIs, PATH, and the Python distribution. [Inno Setup](https://jrsoftware.org/isinfo.php), a tool that was supposed to set up software, became my software. And the browser extension simply sends a command-line request to the CLI and lets it do the rest.

## My Last Struggle: GitHub Actions

~~Luckily~~ I don't use Windows anymore, and due to academic pressure and swimming stuff, I have no time for software development anymore. I haven’t written a single line of code for nearly 1.5 years since Grade 9, except for AP CSA, on which I undoubtedly got full marks on the FRQ all the time. My lowest score on the whole AP CSA school test was 96, and I almost cried on that day. FRQ was not real coding. You knew you were going to earn full marks, and there was nothing interesting about it at all.

Yesterday I saw an old post about the Downie deleting random files incident on the internet. I bookmarked it and forgot to read it until this morning. And today is the last day of the Ch’ing Ming holiday. So I took two hours to write a GitHub Actions CLI to automatically update and release LinkDown every day, since I don’t use a Windows computer anymore, I don’t have a machine to compile on, and I don’t want to spend my time updating the executables.

Now everything is perfectly solved. I don’t need to do anything about it.

## What to Take Away

This was the longest blog post I wrote by far (none of my previous posts exceeded 500 words). The main purpose was to write down my thoughts so that I don’t forget everything by the time my grandson asks me what Danny is after stalking my GitHub profile, and also to share some thoughts.

**1. Don't make useless software**

There are lots of needs from large groups of users that remain unresolved. So make software that people actually use. A simple criterion is yourself: no one’s gonna use a piece of software if you yourself don’t even use it.

**2. Don't build new things unless necessary**

I could've built a cross-platform 400MB GUI using Electron. But instead I made it as simple as possible, and people still used my software, and things worked perfectly.

Thanks.



# *AND IF YOU USE WINDOWS, PLEASE DOWNLOAD LINKDOWN AT https://github.com/LinkScapeOfficial/LinkDown!!!*