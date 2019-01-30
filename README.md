# Musical Notation of Chinese - MNC
Interpreter of chinese language that translates it into musical notation of chinese tones.

<div align="center">
    <a href="https://github.com/KusioDev/drag.js">
        <img src="https://i.imgur.com/pCDlIiG.png" height="125px">
    </a>
</div>

## Functionality
MNC is able to:
- translate chinese into pinyin with musical notation
- add pinyin lyrics to musical notation
- add chinese lyrics to musical notation
- transcript pinyin to polish phonetics

## Test
You can visit this site to test MNC
http://mnc-mnc.7e14.starter-us-west-2.openshiftapps.com/

## Main components
### server.js
It is the main file of this application.
`server.js` contains all setting of the application, like used modules, default port etc.
It runs the server, and takes care of all HTTP requests.
It also runs the function from my own module called `mnc`.

### mnc.js
It contains all functions that takes care of translating the text.
At the top we have `pinyin` and `jison` declared.
These are MIT licensed modules.
`pinyin` is used to translate chinese symbols to pinyin.
You can read more about it here - https://github.com/hotoo/pinyin (however the whole site is in chinese)

`jison` is an module that adds parsers into JavaScript. It uses the same structures like Flex and Bison.
You can read more about it here - https://github.com/zaach/jison

Later we have declared `OPTIONS` for pinyin
- `style: pinyin.STYLE_TONE2` translates chinese into pinyin with the number representing tone at the end of the string.
For example: 拼音 => pin1 yin1

Next variable is `content` which is used in parser.
It contains basic options of the parser, like musical representation of tones (syntax for <a href="http://lilypond.org/"> LilyPond </a>).

There are 3 functions declared in this file:
- `function createParser(content, parser_path)` which creates parser based on the `content` we want to use in the parser (which later we'll be able to use outside the parser) and `path` which is the path to the .jison file
- `function translateToPinyin(text)` which translates the chinese into the tones and lyrics in basic pinyin (not polish translated)
- `function generateFile(text, extra, to_polish)` which runs the `translateToPinyin` function and based on the output creates the file
If certain options are set, it translate the text into polish phonetics or add extra chinese text below the pinyin one.

### translator.jison
Main jison file. It translates the pinyin into musical notation.
The way it works is really easy. First the lexer is looking for either `TEXT` or `NUMBER` which are expressed with those regular expressions:
- `TEXT` - ([a-z]|[A-Z])+
- `NUMBER` - [1-4]

Then parser is recursively looking for either a lone `TEXT` or `TEXT` with `NUMBER` for example:
- pin
- pin1
- xiang4

Based on the number it chooses the right notes from the `content` variable declared before and adds it into the variable `notes`.
It also adds the `TEXT` into the variable `text`.

It returns the notes and lyrics that are later used in the application.

### polish.jison
Jison file that is used to make phonetic transcription of pinyin to polish.

Lexer in this jison file has much more declarations, one for each letter, which are later made into groups or left single.

The parser is looking for a groups or single letter and translates it so it will suit polish language more.
For example:
- `sh` is translated into `sz`
- `x` is translated into `ś`
- `ch` is translated into `cz`

It returns the modified text. Later in the program there is an if statement that checks if user wanted to have polish text.

## Other information
This project uses <a href="https://pugjs.org">`pug`</a> which is a high-performance template engine.
It simplifies the HTML syntax and adds new options like `if` statements or `for` loops.

This project contains 3 .pug files:
- `main_page.pug` - used to render the main page
- `form.pug` - used for the form on the main page
- `translate.pug` - used to render the translation page

All styles are in the `main.css` file located in the views->styles


## Run
To run the project first you have to install all dependencies by writing `npm install` in command line.
When you have everything installed, type `node server.js` to run this application.

The server runs on the `localhost:8080`.

