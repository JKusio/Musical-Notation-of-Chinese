// path to the folder in which the files will be stored
const FILE_PATH = './out/';
const fs = require("fs");
// js library used to translate chinese to pinyin
const pinyin = require("pinyin");
// js library which add bison and lex
const jison = require("jison");
var bnf = fs.readFileSync("translator.jison", "utf-8");

var d = new Date();

const OPTIONS = {
    // add number at the end of pinyin which presents the tone number
    style: pinyin.STYLE_TONE2
};

let content = {
    extra: false,

    // normal tones
    tones: [
        "d''4(d''4)",
        "b'8(d''8)",
        "g'8(f'4 c''4)",
        "e''4(g'4)"
    ],
    neutral_tones: [
        "a'4(a'4)",
        "b'4(b''4)",
        "c'4(c''4)",
        "g''4(g'4)"
    ],
    notes: '',
    text: '',
};

var parser = createParser(content);

// creates pareser and pass some values into it
function createParser(content) {
    let parser = new jison.Parser(bnf);
    parser.yy.content = content;
    return parser;
}

// parsing, done in translator.jison files
function translateToPinyin(text) {
    const pin = pinyin(text, OPTIONS);

    let pin_sum = pin.reduce((a, b) => a + b, '');

    return parser.parse(pin_sum).content;
}

// generate .ly file
function generateFile(text) {
    var data = translateToPinyin(text);

    const PATH = FILE_PATH + `mnc_${d.getTime()}.ly`;

    let stream = fs.createWriteStream(PATH);

    stream.once('open', function(fd) {
        stream.write("<score>\n");
        stream.write("{\n");
        stream.write(data.notes + "\n");
        stream.write("}\n");
        stream.write("\\addlyrics {\n");
        stream.write(data.text + "\n");
        stream.write("}\n");
        stream.write("</score>");
        stream.end();
    });

    return PATH;
}

exports.generateFile = generateFile;