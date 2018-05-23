'use strict';

let isGenerated = null;

const processor = {
  preprocess(text/*, filename*/) {
    if (text.includes('@' + 'generated')) {
      isGenerated = true;
      return [''];
    } else {
      isGenerated = false;
      return [text];
    }
  },

  postprocess(messages/*, filename*/) {
    if (isGenerated === true) {
      isGenerated = null;
      return [];
    } else {
      isGenerated = null;
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
