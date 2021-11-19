/*

import Array exposing (toList)
import Dict exposing (toList)
import Set exposing (toList)

*/


// LOG

var _Extra_log__PROD = F2(function(tag, value)
{
    return value;
});

var _Extra_log__DEBUG = F2(function(tag, value)
{
    console.log(tag + ': ' + _Extra_toString(value));
    return value;
});


// TODOS

function _Extra_todo(moduleName, region)
{
    return function(message) {
        _Extra_crash(8, moduleName, region, message);
    };
}

function _Extra_todoCase(moduleName, region, value)
{
    return function(message) {
        _Extra_crash(9, moduleName, region, value, message);
    };
}


// TO STRING

function _Extra_toString__PROD(value)
{
    return '<internals>';
}

function _Extra_toString__DEBUG(value)
{
    return _Extra_toAnsiString(false, value);
}

function _Extra_toAnsiString(ansi, value)
{
    if (typeof value === 'function')
    {
        return _Extra_internalColor(ansi, '<function>');
    }

    if (typeof value === 'boolean')
    {
        return _Extra_ctorColor(ansi, value ? 'True' : 'False');
    }

    if (typeof value === 'number')
    {
        return _Extra_numberColor(ansi, value + '');
    }

    if (value instanceof String)
    {
        return _Extra_charColor(ansi, "'" + _Extra_addSlashes(value, true) + "'");
    }

    if (typeof value === 'string')
    {
        return _Extra_stringColor(ansi, '"' + _Extra_addSlashes(value, false) + '"');
    }

    if (typeof value === 'object' && '$' in value)
    {
        var tag = value.$;

        if (typeof tag === 'number')
        {
            return _Extra_internalColor(ansi, '<internals>');
        }

        if (tag[0] === '#')
        {
            var output = [];
            for (var k in value)
            {
                if (k === '$') continue;
                output.push(_Extra_toAnsiString(ansi, value[k]));
            }
            return '(' + output.join(',') + ')';
        }

        if (tag === 'Set_elm_builtin')
        {
            return _Extra_ctorColor(ansi, 'Set')
                + _Extra_fadeColor(ansi, '.fromList') + ' '
                + _Extra_toAnsiString(ansi, __Set_toList(value));
        }

        if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
        {
            return _Extra_ctorColor(ansi, 'Dict')
                + _Extra_fadeColor(ansi, '.fromList') + ' '
                + _Extra_toAnsiString(ansi, __Dict_toList(value));
        }

        if (tag === 'Array_elm_builtin')
        {
            return _Extra_ctorColor(ansi, 'Array')
                + _Extra_fadeColor(ansi, '.fromList') + ' '
                + _Extra_toAnsiString(ansi, __Array_toList(value));
        }

        if (tag === '::' || tag === '[]')
        {
            var output = '[';

            value.b && (output += _Extra_toAnsiString(ansi, value.a), value = value.b)

            for (; value.b; value = value.b) // WHILE_CONS
            {
                output += ',' + _Extra_toAnsiString(ansi, value.a);
            }
            return output + ']';
        }

        var output = '';
        for (var i in value)
        {
            if (i === '$') continue;
            var str = _Extra_toAnsiString(ansi, value[i]);
            var c0 = str[0];
            var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
            output += ' ' + (parenless ? str : '(' + str + ')');
        }
        return _Extra_ctorColor(ansi, tag) + output;
    }

    if (typeof DataView === 'function' && value instanceof DataView)
    {
        return _Extra_stringColor(ansi, '<' + value.byteLength + ' bytes>');
    }

    if (typeof File !== 'undefined' && value instanceof File)
    {
        return _Extra_internalColor(ansi, '<' + value.name + '>');
    }

    if (typeof value === 'object')
    {
        var output = [];
        for (var key in value)
        {
            var field = key[0] === '_' ? key.slice(1) : key;
            output.push(_Extra_fadeColor(ansi, field) + ' = ' + _Extra_toAnsiString(ansi, value[key]));
        }
        if (output.length === 0)
        {
            return '{}';
        }
        return '{ ' + output.join(', ') + ' }';
    }

    return _Extra_internalColor(ansi, '<internals>');
}

function _Extra_addSlashes(str, isChar)
{
    var s = str
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t')
        .replace(/\r/g, '\\r')
        .replace(/\v/g, '\\v')
        .replace(/\0/g, '\\0');

    if (isChar)
    {
        return s.replace(/\'/g, '\\\'');
    }
    else
    {
        return s.replace(/\"/g, '\\"');
    }
}

function _Extra_ctorColor(ansi, string)
{
    return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Extra_numberColor(ansi, string)
{
    return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Extra_stringColor(ansi, string)
{
    return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Extra_charColor(ansi, string)
{
    return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Extra_fadeColor(ansi, string)
{
    return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Extra_internalColor(ansi, string)
{
    return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Extra_toHexDigit(n)
{
    return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Extra_crash__PROD(identifier)
{
    throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Extra_crash__DEBUG(identifier, fact1, fact2, fact3, fact4)
{
    switch(identifier)
    {
        case 0:
            throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

        case 1:
            throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

        case 2:
            var jsonErrorString = fact1;
            throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

        case 3:
            var portName = fact1;
            throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

        case 4:
            var portName = fact1;
            var problem = fact2;
            throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

        case 5:
            throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

        case 6:
            var moduleName = fact1;
            throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

        case 8:
            var moduleName = fact1;
            var region = fact2;
            var message = fact3;
            throw new Error('TODO in module `' + moduleName + '` ' + _Extra_regionToString(region) + '\n\n' + message);

        case 9:
            var moduleName = fact1;
            var region = fact2;
            var value = fact3;
            var message = fact4;
            throw new Error(
                'TODO in module `' + moduleName + '` from the `case` expression '
                + _Extra_regionToString(region) + '\n\nIt received the following value:\n\n    '
                + _Extra_toString(value).replace('\n', '\n    ')
                + '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
            );

        case 10:
            throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

        case 11:
            throw new Error('Cannot perform mod 0. Division by zero error.');
    }
}

function _Extra_regionToString(region)
{
    if (region.__$start.__$line === region.__$end.__$line)
    {
        return 'on line ' + region.__$start.__$line;
    }
    return 'on lines ' + region.__$start.__$line + ' through ' + region.__$end.__$line;
}
