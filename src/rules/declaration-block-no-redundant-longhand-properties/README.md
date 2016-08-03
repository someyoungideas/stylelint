# declaration-block-no-redundant-longhand-properties

Disallow longhand properties that can be combined into one shorthand property.

```css
a {
    padding-top: 1px;
    padding-right: 1px;
    padding-bottom: 1px;
    padding-left: 1px; }
/** ↑
 *  These longhand properties */
```

The longhand properties in the example above can be more concisely written as:

```css
a {
  padding: 1px;
}
```

This rule will only warn if you've used the longhand equivalent of *all* the properties that the shorthand will set. As missing values are replaced by their initial value, it is impossible to allow inheritance of individual properties by omitting them and use shorthand property.

This rule warns when the following shorthand properties can be used:

- `padding`
- `margin`
- `background`
- `font`
- `border`
- `border-top`
- `border-bottom`
- `border-left`
- `border-right`
- `border-width`
- `border-style`
- `border-color`
- `border-radius`
- `transition`

## Options

### `true`

The following patterns are considered warnings:

```css
a {
  margin-top: 1px;
  margin-bottom: 2px;
  margin-left: 3px;
  margin-right: 4px;
}
```

```css
a {
  font-style: italic;
  font-variant: normal;
  font-weight: bold;
  font-size: .8em;
  font-family: Arial;
  line-height: 1.2; font-stretch: normal;
}
```

```css
a {
  -webkit-transition-delay: 0.5s;
  -webkit-transition-duration: 2s;
  -webkit-transition-property: top;
  -webkit-transition-timing-function: ease;
}
```

The following patterns are *not* considered warnings:

```css
a {
  margin-top: 1px;
  margin-right: 2px;
}
```

```css
a {
  margin-top: 1px;
  margin-right: 2px;
  margin-bottom: 3px;
}
```

```css
a {
  margin-top: 1px;
  margin-right: 2px;
  margin-bottom: 3px;
  padding-left: 4px;
}
```

## Optional options

### `ignoreShorthands: ["/regex/", "string"]`

Given:

```js
["padding", "/border/"]
```

The following patterns are *not* considered warnings:

```css
a { 
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 30px;
  padding-left: 10px;
}
```

```css
a {
  border-top-width: 1px; 
  border-bottom-width: 1px; 
  border-left-width: 1px; 
  border-right-width: 1px;
}
```

```css
a {
  border-top-width: 1px; 
  border-bottom-width: 1px; 
  border-left-width: 1px; 
  border-right-width: 1px;
}
```

```css
a {
  border-top-color: green;
  border-top-style: double;
  border-top-width: 7px;
}
```
