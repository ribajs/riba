import { bs4Module } from '@ribajs/bs4';
import { coreModule, Riba } from '@ribajs/core';
import { extrasModule } from '@ribajs/extras';
import { SlideshowModule } from './slideshow.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(SlideshowModule);

riba.bind(document.body, model);
