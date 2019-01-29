%lex

%{
    yy.prev_tons;
%}

%%
\s+                        // ignore white spaces
([a-z]|[A-Z])+             return 'TEXT';
[1-4]                      return 'NUMBER';
.                          // ignore any other character
/lex

%start exp

%%
exp
    : e {
        return yy;
    }
    ;

e
    : pinyin e {}
    | pinyin {}
    ;

pinyin
    : TEXT {
        yy.content.notes += yy.content.neutral_tones[yy.prev_tone - 1] + ' ';
        yy.content.text += $1 + ' ';
    }
    | TEXT NUMBER {
        yy.content.notes += yy.content.tones[Number($2) - 1] + ' ';
        yy.content.text += $1 + ' ';
        yy.prev_tone = Number($2);
    }
    ;