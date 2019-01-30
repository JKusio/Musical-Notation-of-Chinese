%lex

%{
    // nothing here
%}

%%
\s+                        return 'WHITESPACE';
[w]                        return 'w';
[y]                        return 'y';
[z]                        return 'z';
[c]                        return 'c';
[s]                        return 's';
[j]                        return 'j';
[q]                        return 'q';
[x]                        return 'x';
[r]                        return 'r';
[h]                        return 'h';
[o]                        return 'o';
[n]                        return 'n';
[g]                        return 'g';
[i]                        return 'i';
[a]                        return 'a';
[u]                        return 'u';
[e]                        return 'e';
.                          return 'REST';
/lex

%left 'w' 'y' 'z' 'c' 's' 'j' 'q' 'x' 'r' 'h' 'o' 'g' 'i' 'a' 'u' 'e' 'n'

%start exp

%%
exp
    : ex {
        yy.content.text = yy.content.text;
        return yy;
    }
    ;

ex
    : pinyin ex {}
    | pinyin {}
    ;

pinyin
    : w {
        yy.content.text += 'ł';
    }
    | y {
        yy.content.text += 'i';
    }
    | z {
        yy.content.text += 'dz';
    }
    | c {
        yy.content.text += 'cs';
    }
    | s {
        yy.content.text += 's';
    }
    | j {
        yy.content.text += 'dzi';
    }
    | q {
        yy.content.text += 'ćsi';
    }
    | x {
        yy.content.text += 'ś';
    }
    | r {
        yy.content.text += 'ż';
    }
    | h {
        yy.content.text += 'h';
    }
    | o {
        yy.content.text += 'o';
    }
    | n {
        yy.content.text += 'n';
    }
    | g {
        yy.content.text += 'g';
    }
    | i {
        yy.content.text += 'i';
    }
    | a {
        yy.content.text += 'a';
    }
    | e {
        yy.content.text += 'e';
    }
    | u {
        yy.content.text += 'u';
    }
    | z h {
        yy.content.text += 'dż';
    }
    | c h {
        yy.content.text += 'czh';
    }
    | s h {
        yy.content.text += 'sz';
    }
    | o n g {
        yy.content.text += 'ung';
    }
    | i a n {
        yy.content.text += 'jen';
    }
    | u e {
        yy.content.text += 'jłue';
    }
    | u a n {
        yy.content.text += 'jłuen';
    }
    | u n {
        yy.content.text += 'jłuen';
    }
    | e r {
        yy.content.text += 'ar';
    }
    | u i {
        yy.content.text += 'uei';
    }
    | REST {
        yy.content.text += $1;
    }
    | WHITESPACE {
        yy.content.text += ' ';
    }
    ;