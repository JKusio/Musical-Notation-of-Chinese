# Musical Notation of Chinese - MNC
Interpreter of chinese language that translates it into musical notation of basic chinese tones.

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