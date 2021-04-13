import { Suggest } from './suggest';
import { Storage, Dictionary } from './types';
import * as big from '../../test/big.json';
import * as PERF1 from '../../test/perf1.json';
import * as PERF2 from '../../test/perf2.json';

function quality(name: string) {
  const dict      = new Suggest();
  let n         = 0;
  let bad       = 0;
  let unknown   = 0;
  let tests: {[word: string]: string}     = (name === '2') ? PERF2 : PERF1;
  let target: string;
  let exported: Dictionary;

  dict.load(big);
  exported = dict.export().corpus;

  for (target in tests) {
    if (tests.hasOwnProperty(target)) {
      var wrongs = tests[target];
      wrongs.split(/\s+/).forEach(function(wrong) {
        n++;
        var w = dict.lucky(wrong);
        if (w !== target) {
          bad++;
          if (!exported.hasOwnProperty(target)) {
            unknown++;
          }
        }
      });
    }
  }

  return { "bad": bad, "n": n, "unknown" : unknown };
}

// See https://github.com/dscape/spell/blob/master/test/spell.js
describe('Suggest', () => {
  let dict: Suggest;

  beforeEach(async () => {
    dict = new Suggest();
  });

  it('should be defined', () => {
    expect(dict).toBeDefined();
  });

  describe('#load()', function(){

    beforeEach(async () => {
      dict = new Suggest();
    });

    it('Should be export the load', function() {
      dict.load("I am going to the park with Theo today. It's going to be the bomb.");

      var exported = dict.export().corpus;
      expect(exported.i).toEqual(1);
      expect(exported.am).toEqual(1);
      expect(exported.going).toEqual(2);
      expect(exported.to).toEqual(2);
      expect(exported.the).toEqual(2);
      expect(exported.park).toEqual(1);
      expect(exported.be).toEqual(1);
      expect(exported.bomb).toEqual(1);
      expect(exported.theo).toEqual(1);
      expect(exported["with"]).toEqual(1);
    });

    it('Should be able to read json', function() {
      dict.load(
          { "I"     : 1
          , "am"    : 1
          , "going" : 1
          , "to"    : 2
          , "the"   : 1
          , "park"  : 1
          }
      );

      const exported = dict.export().corpus;
      expect(exported.i).toEqual(1);
      expect(exported.am).toEqual(1);
      expect(exported.going).toEqual(1);
      expect(exported.to).toEqual(2);
      expect(exported.the).toEqual(1);
      expect(exported.park).toEqual(1);
    });

    it('Should load without reseting', function() {
      dict.load("One Two Three.");
      dict.load("four", {reset: false });

      const exported = dict.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should not reset by default', function() {
      dict.load("One Two Three.");
      dict.load("four");

      const exported = dict.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should load and export should work together', function() {
      dict.load();
      const another = new Suggest();
      another.load({}, dict.export());
      expect(another.export()).toEqual(dict.export());
    });

    it('Should load with reseting', function() {
      dict.load("One Two Three.");
      dict.load("four", {reset: true });

      const exported = dict.export().corpus;
      expect(exported.one).not.toEqual(1);
      expect(exported.two).not.toEqual(1);
      expect(exported.three).not.toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should load with first param string', function() {
      dict.load("One Two Three.");
      dict.load("four", {reset: false });

      const exported = dict.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });
  });

  describe('#addWord()', function(){

    beforeEach(async () => {
      dict = new Suggest();
    });

    it('Basic usage', function() {
      dict.load("One Two Three.");
      dict.addWord("Four");
      const exported = dict.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should setting score', function() {
      dict.addWord("Four", {score: 500});
      const exported = dict.export().corpus;
      expect(exported.four).toEqual(500);
    });

    it('Should add word with integer', function() {
      dict.addWord("test", 500);
      const exported = dict.export().corpus;
      expect(exported.test).toEqual(500);
    });

    it('Should add word with string', function() {
      dict.addWord("test", "500");
      const exported = dict.export().corpus;
      expect(exported.test).toEqual(500);
    });
  });

  describe('#removeWord()', function(){

    beforeEach(async () => {
      dict = new Suggest();
    });

    it('Should removing word', function() {
      dict.load('the game');
      dict.removeWord("the");
      const exported = dict.export().corpus;
      expect(exported.game).toEqual(1);
      expect(exported.the).toEqual(undefined);
    });
  });

  describe('#reset()', function(){

    beforeEach(async () => {
      dict = new Suggest();
    });

    it('Reset should clean contents of dict', function() {
      dict.load("I am going to the park with Theo today. It's going to be the bomb.");
      dict.reset();
      const exported = JSON.stringify(dict.export().corpus);
      expect(exported).toEqual('{}');
    });
  });

  describe('#suggest()', function(){

    beforeEach(async () => {
      dict = new Suggest();
      dict.load("I am going to the park with Theo today. It's going to be the bomb.");
    });

    it('Should `suggest` `the` for `thew`', function() {
      var suggest = dict.suggest("thew");
      expect(suggest[0].word).toEqual("the");
      expect(suggest[0].score).toEqual(2);
      expect(suggest[1].word).toEqual("theo");
      expect(suggest[1].score ).toEqual(1);
    });
    it('Should correct word that exists should return the word', function(){
      var suggest = dict.suggest("the");
      expect(suggest[0].word).toEqual("the");
      expect(suggest[0].score).toEqual(2);
      expect(suggest.length).toEqual(1);
    });
    it('Should first `suggest` should match `lucky`', function(){
      const suggest = dict.suggest("thew");
      const lucky   = dict.lucky("the");
      expect(suggest[0].word  ).toEqual(lucky);
    });
    it('Should be able to suggest w/ customer alphabets', function () {
      var npm     = new Suggest();
      npm.load({"uglify": 1, "uglify-js": 1});
      const suggest = npm.suggest('uglifyjs',
        "abcdefghijklmnopqrstuvwxyz-".split(""));
      expect(suggest[0].word).toEqual('uglify-js');
      expect(suggest[0].score).toEqual(1);
    });
  });

  describe('#lucky()', function(){

    beforeEach(async () => {
      dict = new Suggest();
    });

    it('Should work with empty dict', function() {
      const lucky = dict.lucky("testing");
      expect(lucky).toBeUndefined();
    });
  });

  describe('#storage', function () {

    it('Should be able to store and load from storage', function(){

      let testSpell: string = "";
      const storage: Storage = {
        get: function () {
          try         { return JSON.parse(testSpell); }
          catch (err) { return {}; }
        },
        store: function (dict) {
          try          { testSpell = JSON.stringify(dict); }
          catch (err)  { return {}; }
        }
      };

      const dict = new Suggest(storage);
      dict.load("tucano second skin", {store: true});
      const dictClone     = new Suggest(storage);
      const dictNotClone = new Suggest();
      const exported           = dictClone.export().corpus;
      const exportedNotClone = dictNotClone.export().corpus;
      expect(exported.tucano).toEqual(1);
      expect(exported.second).toEqual(1);
      expect(exported.skin).toEqual(1);
      expect(exportedNotClone.tucano).not.toEqual(1);
      expect(exportedNotClone.second).not.toEqual(1);
      expect(exportedNotClone.skin).not.toEqual(1);
    });
  });

  describe('#quality', function(){

    beforeEach(async () => {
      dict = new Suggest();
    });

    it('[perf1] less than 68 bad, 15 unknown', function() {
      var results = quality('1');
      expect(results.bad).toBeLessThan(69);
      expect(results.unknown).toBeLessThan(16);
      expect(results.n).toEqual(270);
    });
    it('[perf2] less than 130 bad, 43 unknown', function() {
      var results = quality('2');
      expect(results.bad).toBeLessThan(131);
      expect(results.unknown).toBeLessThan(44);
      expect(results.n).toEqual(400);
    });
  });

});
