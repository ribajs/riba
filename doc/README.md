# Riba Documentation Files
Official documentation files for Riba

## Contributing

The doc files can be build to a Shopify theme, there are some npm scripts for that:

### Watch Source files
* run `npm run watch` to run all watchers 

* run `npm run watch:sass` to watch changes on sass files
* run `npm run watch:pug` to watch changes on pug files
* run `npm run watch:ts` to watch changes on typescript files
* run `npm run watch:theme` to watch changes build theme files to auto deploy them to the docs theme

### Build Source Files for Production
* run `npm run build` to run all production build tasks 

* run `npm run build:prod:sass` to build and auto prefix sass files
* run `npm run build:prod:pug` to build the template pug files
* run `npm run build:prod:ts` to build the typescript files (javascript asset files)

### Build Source Files for Development
* run `npm run build:dev` to run all development build tasks 

* run `npm run build:dev:sass` to build and auto prefix sass files
* run `npm run build:dev:pug` to build the template pug files
* run `npm run build:dev:ts` to build the typescript files (javascript asset files)

### Deploy the Shopify Theme
* run `npm run zip` to create a zipped file of the theme that can be uploaded to Shopify 

* run `npm run deploy` to deploy all theme files directly to Shopify
* run `npm run deploy:sass` to build and deploy style files directly to Shopify
* run `npm run deploy:pug` to build and deploy template files directly to Shopify
* run `npm run deploy:ts` to deploy the built javascript files directly to Shopify

### Tests
* run `npm run test` to run the tests
