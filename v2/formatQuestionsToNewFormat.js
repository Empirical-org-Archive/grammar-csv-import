var _ = require('underscore');
module.exports = function(conceptsWithQuestions) {
  return _.map(conceptsWithQuestions, function(c) {
    c.questions = _.map(c.questions, function(q) {
      return {
        instructions: q.instructions,
        prompt: q.prompt,
        answers: _.map(q.body, function(value) {
          return {text: value};
        })
      };
    });
    return c;
  });
};
