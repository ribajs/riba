# Theme SSR Example
This example demonstrates the use of the `nest-theme` and the `alosaur-theme` module. Both are frameworks for server-side web applications that are relatively similar. However, Nest.js is designed for Node.js and Alosaur for Deno.

# Theme
In the `theme` folder there is a theme developed with Riba. In the folder `theme/config/theme.(js/ts)` is the configuration for the theme. It specifies which template engine should be used, where the templates are located, which routes are available, and so on. This file is loaded by nest-theme or alosaur-theme to render the theme. Thereby SSR is used and Riba can also be used on the server.

# Alosaur
Here you can see how to use the `alosaur-theme` module and how it renders the theme.

# Nest
Here you can see how to use the `nest-theme` module and how it renders the theme.

