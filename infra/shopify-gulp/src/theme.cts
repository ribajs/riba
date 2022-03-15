import gulp from "gulp";
import {
  getStoresThemesByRole,
  print,
  getOldestEnvTheme,
  getYoungestEnvTheme
} from "./includes/theme.cjs";

gulp.task("themes:list:live", async () => {
  const themesByEnv = await getStoresThemesByRole("main");
  for (const env in themesByEnv) {
    const theme = themesByEnv[env][0];
    print(env, theme);
    // console.log(theme);
  }
});

gulp.task("themes:list:oldest", async () => {
  const themesByEnv = await getOldestEnvTheme();
  for (const env in themesByEnv) {
    const theme = themesByEnv[env];
    print(env, theme);
  }
});

gulp.task("themes:list:youngest", async () => {
  const themesByEnv = await getYoungestEnvTheme();
  for (const env in themesByEnv) {
    const theme = themesByEnv[env];
    print(env, theme);
  }
});
