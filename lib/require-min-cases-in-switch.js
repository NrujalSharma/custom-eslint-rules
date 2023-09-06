"use strict";

module.exports = {
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
          minCases: {
            type: "integer",
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const minCases = context.options[0]?.minCases || 3;

    return {
      SwitchStatement(node) {
        const { cases } = node;
        if (cases.length < minCases) {
          context.report({
            node,
            message: `Avoid using switch statements with fewer than ${minCases} cases.`,
          });
        }
      },
    };
  },
};
