module.exports = {
  "no-switch-with-less-than-max-lines": {
    meta: {
      type: "suggestion",
      docs: {
        description:
          "Disallow usage of switch statements with fewer than a specified number of cases",
        category: "Best Practices",
        recommended: true,
      },
      fixable: "code",
      schema: [
        {
          type: "object",
          properties: {
            maxLines: {
              type: "integer",
              minimum: 0,
            },
          },
          additionalProperties: false,
        },
      ],
    },

    create(context) {
      const maxLines = context.options[0]?.maxLines || 3;

      return {
        SwitchStatement(node) {
          const { cases } = node;
          if (cases.length < maxLines) {
            context.report({
              node,
              message: `Avoid using switch statements with fewer than ${maxLines} cases.`,
              fix(fixer) {
                if (cases.length === 0) {
                  const sourceCode = context.getSourceCode();
                  const sourceText = sourceCode.getText(node);
                  const fixText = sourceText.replace("switch", "if");
                  return fixer.replaceText(node, fixText);
                }

                const caseText = context.getSourceCode().getText(cases[0]);
                return fixer.replaceText(node, caseText);
              },
            });
          }
        },
      };
    },
  },
};
