import {
  isKeyframeSelector,
  isStandardSyntaxRule,
  isStandardSyntaxSelector,
  isStandardSyntaxTypeSelector,
  optionsMatches,
  parseSelector,
  report,
  ruleMessages,
  validateOptions,
} from "../../utils"
import htmlTags from "html-tags"
import { isString } from "lodash"
import svgTags from "svg-tags"

export const ruleName = "selector-type-no-unknown"

export const messages = ruleMessages(ruleName, {
  rejected: (selector) => `Unexpected unknown type selector "${selector}"`,
})

// htmlTags includes only "standard" tags. So we augment it with older tags etc.
const nonStandardHtmlTags = new Set([
  "acronym",
  "applet",
  "basefont",
  "big",
  "blink",
  "center",
  "content",
  "dir",
  "font",
  "frame",
  "frameset",
  "hgroup",
  "isindex",
  "keygen",
  "listing",
  "marquee",
  "noembed",
  "plaintext",
  "spacer",
  "strike",
  "tt",
  "xmp",
])

export default function (actual, options) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual }, {
      actual: options,
      possible: {
        ignoreTypes: [isString],
      },
      optional: true,
    })
    if (!validOptions) { return }

    root.walkRules(rule => {
      const { selector, selectors } = rule

      if (!isStandardSyntaxRule(rule)) { return }
      if (!isStandardSyntaxSelector(selector)) { return }
      if (selectors.some(s => isKeyframeSelector(s))) { return }

      parseSelector(selector, result, rule, selectorTree => {
        selectorTree.walkTags(tagNode => {
          if (!isStandardSyntaxTypeSelector(tagNode)) { return }

          if (optionsMatches(options, "ignoreTypes", tagNode.value)) { return }

          const tagName = tagNode.value
          const tagNameLowerCase = tagName.toLowerCase()

          if (htmlTags.indexOf(tagNameLowerCase) !== -1
            || svgTags.indexOf(tagNameLowerCase) !== -1
            || nonStandardHtmlTags.has(tagNameLowerCase)
          ) { return }

          report({
            message: messages.rejected(tagName),
            node: rule,
            index: tagNode.sourceIndex,
            ruleName,
            result,
          })
        })
      })
    })
  }
}
