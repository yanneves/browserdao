import lookup from "./lookup.ts";

// Helper function to find a key in the lookup table (as key or value)
function findInLookup(key: string): string | null {
  // Direct lookup
  if (key in lookup) {
    return lookup[key];
  }

  // Reverse lookup (values to keys)
  const lookupValues = Object.values(lookup);
  if (lookupValues.includes(key)) {
    return key;
  }

  return null;
}

export default function xdotoolParse(str: string) {
  const parts = str.split("+");
  let modifier: string | null = null;
  let key: string | null = str;

  // Handle presence of modifier
  if (parts.length > 1) {
    [modifier, key] = parts;
    modifier = findInLookup(modifier);
  }

  if (parts.length > 2) {
    console.warn(`Additional modifiers ignored by xdotool parser "${str}"`);
  }

  // Skip lookup if key matches generic character or function key
  if (!/^([a-zA-Z0-9]|F\d{1,2})$/.test(key)) {
    key = findInLookup(key);

    if (key === null) {
      console.warn(`Failed to parse xdotool key "${str}"`);
    }
  }

  return { modifier, key };
}
