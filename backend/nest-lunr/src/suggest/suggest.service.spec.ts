import { Test, TestingModule } from '@nestjs/testing';
import { SuggestService } from './suggest.service';
import big = require('../../test/big.json');
import PERF1 = require('../../test/perf1');
import PERF2 = require('../../test/perf2');

function quality(name) {
  var dict      = new SuggestService()
    , n         = 0
    , bad       = 0
    , unknown   = 0
    , tests     = (name === '2') ? PERF2 : PERF1
    , target
    , start
    , exported
    ;

  dict.load(big);
  exported = dict['export']().corpus;

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
describe('SuggestService', () => {
  let service: SuggestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestService],
    }).compile();

    service = module.get<SuggestService>(SuggestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#load()', function(){

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
    });

    it('Should be export the load', function() {
      service.load("I am going to the park with Theo today. It's going to be the bomb.");

      var exported = service.export().corpus;
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
      service.load(
          { "I"     : 1
          , "am"    : 1
          , "going" : 1
          , "to"    : 2
          , "the"   : 1
          , "park"  : 1
          }
      );

      const exported = service.export().corpus;
      expect(exported.i).toEqual(1);
      expect(exported.am).toEqual(1);
      expect(exported.going).toEqual(1);
      expect(exported.to).toEqual(2);
      expect(exported.the).toEqual(1);
      expect(exported.park).toEqual(1);
    });

    it('Should load without reseting', function() {
      service.load("One Two Three.");
      service.load("four", {"reset": false });

      const exported = service.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should load and export should work together', function() {
      service.load();
      const another = new SuggestService();
      another.load({}, service.export());
      expect(another.export()).toEqual(service.export());
    });

    it('Should load with reseting', function() {
      service.load("One Two Three.");
      service.load("four", {"reset": true });

      const exported = service.export().corpus;
      expect(exported.one).not.toEqual(1);
      expect(exported.two).not.toEqual(1);
      expect(exported.three).not.toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should load with first param string', function() {
      service.load("One Two Three.");
      service.load("four", {"reset": false });

      const exported = service.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });
  });

  describe('#addWord()', function(){

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
    });

    it('Basic usage', function() {
      service.load("One Two Three.");
      service.addWord("Four");
      const exported = service.export().corpus;
      expect(exported.one).toEqual(1);
      expect(exported.two).toEqual(1);
      expect(exported.three).toEqual(1);
      expect(exported.four).toEqual(1);
    });

    it('Should setting score', function() {
      service.addWord("Four", {score: 500});
      const exported = service.export().corpus;
      expect(exported.four).toEqual(500);
    });

    it('Should add word with integer', function() {
      service.addWord("test", 500);
      const exported = service.export().corpus;
      expect(exported.test).toEqual(500);
    });

    it('Should add word with string', function() {
      service.addWord("test", "500");
      const exported = service.export().corpus;
      expect(exported.test).toEqual(500);
    });
  });

  describe('#removeWord()', function(){

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
    });

    it('Should removing word', function() {
      service.load('the game');
      service.removeWord("the");
      const exported = service.export().corpus;
      expect(exported.game).toEqual(1);
      expect(exported.the).toEqual(undefined);
    });
  });

  describe('#reset()', function(){

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
    });

    it('Reset should clean contents of dict', function() {
      service.load("I am going to the park with Theo today. It's going to be the bomb.");
      service.reset();
      const exported = JSON.stringify(service.export().corpus);
      expect(exported).toEqual('{}');
    });
  });

  describe('#suggest()', function(){

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
      service.load("I am going to the park with Theo today. It's going to be the bomb.");
    });

    it('Should `suggest` `the` for `thew`', function() {
      var suggest = service.suggest("thew");
      expect(suggest[0].word).toEqual("the");
      expect(suggest[0].score).toEqual(2);
      expect(suggest[1].word).toEqual("theo");
      expect(suggest[1].score ).toEqual(1);
    });
    it('Should correct word that exists should return the word', function(){
      var suggest = service.suggest("the");
      expect(suggest[0].word).toEqual("the");
      expect(suggest[0].score).toEqual(2);
      expect(suggest.length).toEqual(1);
    });
    it('Should first `suggest` should match `lucky`', function(){
      const suggest = service.suggest("thew");
      const lucky   = service.lucky("the");
      expect(suggest[0].word  ).toEqual(lucky);
    });
    it('Should be able to suggest w/ customer alphabets', function () {
      var npm     = new SuggestService();
      npm.load({"uglify": 1, "uglify-js": 1});
      const suggest = npm.suggest('uglifyjs',
        "abcdefghijklmnopqrstuvwxyz-".split(""));
      expect(suggest[0].word).toEqual('uglify-js');
      expect(suggest[0].score).toEqual(1);
    });
  });

  describe('#lucky()', function(){
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
    });

    it('Should work with empty dict', function() {
      const lucky = service.lucky("testing");
      expect(lucky).toBeUndefined();
    });
  });

  describe('#storage', function () {

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
    });

    it('Should be able to store and load from storage', function(){

      let testSpell: any = {};
      const storage = {
        get: function () {
          try         { return JSON.parse(testSpell); }
          catch (err) { return {}; }
        },
        store: function (dict) {
          try          { testSpell = JSON.stringify(dict); }
          catch (err)  { return {}; }
        }
      };

      const dict = new SuggestService();
      dict.setStorage(storage);
      dict.load("tucano second skin", {store: true});
      const dictClone     = new SuggestService();
      dictClone.setStorage(storage);
      const dictNotClone = new SuggestService();
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
      const module: TestingModule = await Test.createTestingModule({
        providers: [SuggestService],
      }).compile();
  
      service = module.get<SuggestService>(SuggestService);
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
