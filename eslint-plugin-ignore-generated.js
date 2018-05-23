'use strict';

let ignoreFile = null;

const processor = {
  preprocess(text/*, filename*/) {
    if (
      text.includes('@' + 'generated') ||
      text.includes('@' + 'nolint')
    ) {
      ignoreFile = true;
      return [''];
    } else {
      ignoreFile = false;
      return [text];
    }
  },

  postprocess(messages/*, filename*/) {
    if (ignoreFile === true) {
      ignoreFile = null;
      return [];
    } else {
      ignoreFile = null;
      return messages[0];
    }
  },

  supportsAutofix: true,
};

module.exports = {
  processors: {
    '.js': processor,
    '.jsx': processor,
    '.flow': processor,
  },
};
