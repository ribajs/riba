
/* eslint-disable no-undef */
// source, author and copyright (MIT License): https://github.com/luciddesign/Bootstrapify-4

const fs = require("fs");

/*
  If file contains @import
    Loop files contents
      collect imports
      find file
      recurse
  Else return files path
  
*/

const SassImport = function (target) {
  this.paths = [];
  this.target = target;
  this.pwd = this._get_pwd(target);

  this._collect_from(this.target, this.pwd);
  return this.paths;
};

SassImport.prototype._collect_from = function (path, pwd) {
  const data = fs.readFileSync(path, "utf8");
  this._read_data(data, pwd);
};

SassImport.prototype._read_data = function (data, pwd) {
  data = data.split("\n");
  for (let i in data) {
    const line = data[i];
    if (this._is_import(line)) {
      let path = this._get_path(line);
      path = this._complete_path(path, pwd);

      if (this._has_imports(path)) {
        const current_pwd = this._get_pwd(path);
        this._collect_from(path, current_pwd);
      } else {
        this.paths.push(path);
      }
    }
  }
};

SassImport.prototype._is_import = function (str) {
  return /^@import(?! *url)/.test(str); // @import without 'url'
};

SassImport.prototype._has_imports = function (path) {
  const data = fs.readFileSync(path, "utf8");
  return /@import(?! *url)/.test(data); // @import without 'url'
};

SassImport.prototype._get_path = function (str) {
  return /('|")(.+)('|")/.exec(str)[2];
};

SassImport.prototype._get_pwd = function (str) {
  return /(.+\/)/.exec(str)[1];
};

SassImport.prototype._complete_path = function (path, pwd) {
  // Bootstrap imports don't include file type or leading underscore when importing
  // TODO: make this less of a hack

  const tmp_path = pwd + path;
  if (!fs.existsSync(tmp_path) || fs.lstatSync(tmp_path).isDirectory()) {
    // check for missing file type
    if (fs.existsSync(tmp_path + ".scss")) path += ".scss";
    if (fs.existsSync(tmp_path + ".sass")) path += ".sass";

    // check for missing leading underscore
    const path_parts = path.split("/");
    const fname = path_parts.pop();
    const underscored_path = path_parts.join("/") + "/_" + fname;
    if (fs.existsSync(pwd + underscored_path)) path = underscored_path;

    // check for missing both
    if (fs.existsSync(pwd + underscored_path + ".scss"))
      path = underscored_path + ".scss";
    if (fs.existsSync(pwd + underscored_path + ".sass"))
      path = underscored_path + ".sass";
  }
  return pwd + path;
};

module.exports = SassImport;
