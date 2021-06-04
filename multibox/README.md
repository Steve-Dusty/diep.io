# 1. Prerequisites
**WARNING!!:** If you ONLY want to use the AFK and NOT the multibox, please skip to the text directly above "2. Using the multibox".

To use the multibox, you need to have `node.js` installed on your computer. If you don't know what it is or are not sure if you have it installed, go to https://nodejs.org/, pick whatever release you want (LTS prefered), and install. If you want to check if you have it installed, open your command line and enter `node -v`. If it says something like `"node" is not recognized`, you need to install it.

`userscript.user.js` is meant to be used for Tampermonkey.

The other file, `server.js`, needs to be downloaded and put in some place you have easy access to. You will need to use the file in order to use multibox feature of the script. AFK will still work without it.

Once you have the file downloaded and put somewhere, you need to decide how you will use it. There are 2 ways:
### 1. Launch it manually from the command line
Open your command line, navigate to the location with the `server.js` file, then run `node server.js`. You can then stop the multibox server by pressing `Ctrl + C` or by closing the terminal.
### 2. Launch it using an executable
Windows: create a new file called `server.bat`, then put the following code inside of it:
```
node server.js
```
Linux: create a new file called `server.sh`, then put the following code inside of it:
```
#!/bin/bash
cd path
node server.js
```
Where "path" **must** be edited to be an absolute path to the location of the `server.js` file. For instance, if I put the `server.js` file at `/home/franek/Downloads/server.js`, the `server.sh` file will be:
```
#!/bin/bash
cd /home/franek/Downloads
node server.js
```
After creating the executable file, all it takes to be able to use multibox is to run the file (for instance by double clicking on it).


Additionally to the above, to not lag in game, it is **strongly recommended** that you also use [this](https://greasyfork.org/en/scripts/418966-eval-packet-overrider) and [that](https://greasyfork.org/en/scripts/420008-unlag). These scripts will improve the game's performance and will greatly increase the number of tanks you will be able to multibox.
It is worth mentioning diep.io certainly runs best on Chrome (or similar chromium-based browsers like Opera or Brave) and on Windows 10. You will have the most pleasant experience with a good browser and a good system. It is **NOT** the script's fault that you experience low frame rates or high ping.
# 2. Using the multibox
If you wish to only use the AFK feature, you absolutely do not need to do the steps mentioned above involving `server.js` and launching it. You don't even need `node.js` then. Only the `userscript.user.js` file to be a userscript in your Tampermonkey.

After launching the game, nothing abnormal is going to happen, no tutorial or anything. The multibox's menu will be closed by default. To open it, press the \` key, aka the **master key** (on most keyboards - to the left of 1, directly above TAB). If you do not have the key or wish to use other one, please open the userscript in your Tampermonkey and edit the 18th line:

![Screenshot from 2021-06-04 20-28-29](https://user-images.githubusercontent.com/47268949/120847212-746acf80-c573-11eb-8a84-05524d7f2ddc.png)

Delete the \` character in between the apostrophes and enter your own one, then **save the userscript** (by `Ctrl + S` or manually). Changes will take effect after you refresh your `diep.io` page.

After pressing the master key, you should see a menu open on the left side of the screen which looks exactly like this:

![Screenshot from 2021-06-04 20-31-02](https://user-images.githubusercontent.com/47268949/120847527-e5aa8280-c573-11eb-9b73-9f5ec9156f70.png)

This is the heart of the multibox. Here you control everything that it does.

You can click on the text to change or trigger the option (these are buttons below the text).

The question marks are basically tips explaining what the given option does, so if you press on them, it should display text in the middle of your screen describing the feature.

The minus signs are placeholders for **keybinds** - assign a key to an option to be able to change it without explicitly clicking on the button. Keybinds last between diep.io sessions (they are persistent), can be changed anytime in game, can be reset too to not activate the option anymore. You need to click on the minus signs to be able to assign a key. Clicking on them will also display a little bit of helpful information.

You can hide the menu anytime by once again pressing the master key. The master key will be locked for use in any keybinds to not create a mess.

# 3. Features
### 1. Pick AFK location:

![Screenshot from 2021-06-04 20-37-00](https://user-images.githubusercontent.com/47268949/120848119-adf00a80-c574-11eb-8a01-a07091446e54.png)

This option allows you to pick a place on the whole map that your tank will stick to if you turn on AFK. It also allows you to reset your AFK position. Why? Explained below.

### 2. Turn AFK on and off:

If you have not previously set an AFK location using the feature above, turning on AFK will cause you to stick to the location you currently are at. That's why reseting AFK position is important - it allows you to stick to right where you are, without needing to have a perfect pixel-wide mouse aiming skills to do it on the minimap.

### 3. Turn multibox on and off:

First step to use the multibox is to run the `server.js` file as mentioned before. After that is done, all tabs will talk to each other via the server and will be capable of synchronising - the whole point of multibox.

The multibox is a very advanced system aiming to make the gameplay of the user as pleasant as possible. The main features are:

1. Flexibility - you can switch between 3 mouse modes and 3 movement modes, along with other options, allowing you to truly customize your experience and shape it to fit your needs,

2. Reliability - the script has been tested throughout months and numerous bugs have been found and fixed. The most notable achievement is making the script fully compatible with retina displays, so MacBook users are not excluded from the fun,

3. Comfort - throughout time, movement of the multiboxed tabs has been evolving to allow for a much better experience. For instance, tabs will try to move out of your way when you are moving, and will try their best to always stick to you, without falling behind.

### Getting started

To be able to multibox tanks, you need to be aware of 3 things:

**1.** If you are on Windows and are using Chrome, you first need to edit a browser flag to be able to multibox. Go to [here](chrome://flags/#calculate-native-win-occlusion) and if at the top there is a setting called "calculate native window occlusion", change its state to **disabled**.

**2.** To multibox at all, your tabs need to not actually be tabs. They need to be **windows**. The same was true for Bela's multibox - you need to take out individual tabs out of your window so that each of them has their own window. **BEHOLD!!:** If your AFK is on and you switch to other tab in the same window, **your diep.io tank might die, because it is not updated** (that's why it's so important to use **windows** and not **browser tabs**).

**3.** If your `server.js` file is not running, turning on multibox in browser will display a "Multibox: ERROR" text on the multibox button. That means nothing else but that you need to run the `server.js` file in order to multibox. It's a reminder.

Additionally, if you are AFK and multibox is on, **AFK is the stronger one.** So if you change tabs, the AFK tab will still be AFK. It will not follow.

# Ending

Knowing all of the above, I guess you are all set to conquer the world with this multibox! There are a few more options, but they are rather understandable, and most of all, you can test them out yourself. They also have a help page once you click the question mark next to them.

I am absolutely **NOT** opened for suggestions. If there are bugs, you can submit an issue, but I might as well not fix it.
