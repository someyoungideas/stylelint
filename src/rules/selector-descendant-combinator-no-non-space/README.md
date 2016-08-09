# selector-descendant-combinator-no-non-space

Disallow non-space characters for descendant combinators of selectors.

```css
   .foo .bar .baz { color: pink; }
/**          ↑          ↑
 * These are descendant combinators */
```

This rule ensures that there is only single space for descendant combinators of selectors.

## Options

### `true`

The following patterns are considered warnings:

```css
.foo  .bar {}
```

```css
.foo 
.bar {}
```

The following patterns are *not* considered warnings:

```css
.foo .bar {}
```
