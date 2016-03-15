/**
 * Created by aifb on 15.03.16.
 */


var should = require('should');
var rules = require('../hylar/core/OWL2RL').rules;

var Solver = require('../hylar/core/Logics/Solver');
var Fact = require('../hylar/core/Logics/Fact');

describe('Rule tests', function () {
    it('should order the rule causes (most to least restrictive)', function () {
        var transitiveRule = rules[4],
            mostRestrictiveTransitiveCause = transitiveRule.causes[1];

        transitiveRule.orderCausesByMostRestrictive();
        transitiveRule.causes[0].toString().should.equal(mostRestrictiveTransitiveCause.toString());
    });
});

describe('Solver tests', function() {
    it('should return inference wrt. transitivity rule', function() {
        var facts = [
            new Fact('#parentOf', '#papy', '#papa', [], true),
            new Fact('#parentOf', '#papa', '#fiston', [], true),
            new Fact('http://www.w3.org/1999/02/22-rdf-syntax-ns#type', '#parentOf', 'http://www.w3.org/2002/07/owl#TransitiveProperty', [], true)
        ];

        var consequences = Solver.evaluateRuleSet([rules[4]], facts);
        consequences.length.should.equal(1);
    });
});