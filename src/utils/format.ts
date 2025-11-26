/**
 * `formatNumber` function formats a number to a string with commas.
 */
export const formatNumber = (num: number | undefined) => {
  if (num == undefined) return '0';
  return num.toLocaleString();
};

export const humanFileSize = (size: number | undefined) => {
  if (size == undefined) return '0 B';
  let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

/**
 * Format YSON (Yorkie Serialized Object Notation) with proper indentation and newlines.
 * YSON is an extended JSON format that includes special CRDT types like Counter(), Text(), Tree().
 */
export const formatYSON = (yson: string, indent = 2): string => {
  let result = '';
  let level = 0;
  let inString = false;
  let inType = false; // tracking if we're inside a type constructor like Counter(...)
  let typeStack: string[] = []; // stack to track nested type constructors
  const spaces = ' '.repeat(indent);

  // Check if current position starts a YSON type
  const isYSONType = (str: string, pos: number): string | null => {
    const types = ['Counter', 'Text', 'Tree', 'Int', 'Long', 'BinData', 'Date'];
    for (const type of types) {
      if (str.substr(pos, type.length) === type && str[pos + type.length] === '(') {
        return type;
      }
    }
    return null;
  };

  for (let i = 0; i < yson.length; i++) {
    const char = yson[i];
    const nextChar = yson[i + 1];
    const prevChar = i > 0 ? yson[i - 1] : '';

    // Handle string literals
    if (char === '"' && prevChar !== '\\') {
      inString = !inString;
      result += char;
      continue;
    }

    if (inString) {
      result += char;
      continue;
    }

    // Check for YSON type constructors
    const ysonType = isYSONType(yson, i);
    if (ysonType) {
      typeStack.push(ysonType);
      inType = true;
      result += ysonType;
      i += ysonType.length - 1;
      continue;
    }

    switch (char) {
      case '{':
      case '[':
        result += char;
        // Don't add newline if it's an empty object/array
        if (nextChar !== '}' && nextChar !== ']') {
          level++;
          result += '\n' + spaces.repeat(level);
        }
        break;

      case '}':
      case ']':
        if (prevChar !== '{' && prevChar !== '[' && prevChar !== '\n') {
          level--;
          result += '\n' + spaces.repeat(level);
        } else if (prevChar === '\n') {
          level--;
          result = result.trimEnd() + '\n' + spaces.repeat(level);
        }
        result += char;
        break;

      case '(':
        result += char;
        // Check if this opens a compound type (not primitive like Int(10))
        const currentType = typeStack[typeStack.length - 1];
        if (currentType === 'Text' || currentType === 'Tree') {
          if (nextChar !== ')') {
            level++;
            result += '\n' + spaces.repeat(level);
          }
        }
        break;

      case ')':
        // Check if we're closing a compound type
        const closingType = typeStack[typeStack.length - 1];
        if (closingType === 'Text' || closingType === 'Tree') {
          if (prevChar !== '(' && prevChar !== '\n') {
            level--;
            result += '\n' + spaces.repeat(level);
          } else if (prevChar === '\n') {
            level--;
            result = result.trimEnd() + '\n' + spaces.repeat(level);
          }
        }
        result += char;
        if (typeStack.length > 0) {
          typeStack.pop();
        }
        if (typeStack.length === 0) {
          inType = false;
        }
        break;

      case ',':
        result += char;
        // Add newline after comma unless we're in a simple type like Int(1) or in an inline object
        const peek = yson.substr(i + 1, 20);
        const isSimpleValue = peek.match(/^\s*(Int|Long)\(/);
        if (!isSimpleValue && nextChar !== ' ' && nextChar !== '\n') {
          result += '\n' + spaces.repeat(level);
        } else if (nextChar === ' ') {
          // skip the space after comma
          i++;
          result += '\n' + spaces.repeat(level);
        }
        break;

      case ':':
        result += char + ' ';
        if (nextChar === ' ') i++; // skip space after colon
        break;

      case ' ':
      case '\n':
      case '\t':
      case '\r':
        // Skip whitespace, we're managing it ourselves
        break;

      default:
        result += char;
    }
  }

  return result;
};
