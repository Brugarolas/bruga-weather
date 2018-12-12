const fs = require('fs');
const util = require('util');
const download = require('download');

const CACHE_FOLDER = process.cwd() + '/node_modules/.cache/pack-remote-file-plugin/';
const FS = {
  mkdir: util.promisify(fs.mkdir),
  access: util.promisify(fs.access),
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile)
}

/** Cache File Aux Class **/
class CacheRemoteFile {
  constructor (option) {
    this.useCache = option.cache;
    this.filename = option.filepath;
    this.remoteUrl = option.url;
    this.filepath = CACHE_FOLDER + this.filename;
  }

  async fileExistsInCache () {
    try {
      await FS.access(this.filepath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async shouldReadFileFromCache () {
    return this.useCache && await this.fileExistsInCache();
  }

  async readFileFromCache () {
    return await FS.readFile(this.filepath);
  }

  async remoteDownload () {
    let data = await download(this.remoteUrl);
    if (this.useCache) {
      this._writeFileToCache(data);
    }
    return data;
  }

  async getData() {
    let shouldReadFileFromCache = await this.shouldReadFileFromCache();
    return await (shouldReadFileFromCache ? this.readFileFromCache() : this.remoteDownload());
  }

  /* Aux */
  async _createCacheFolder () {
    const indexOf = this.filepath.lastIndexOf("/");
    if (indexOf > 0) {
      let cachePath = this.filepath.substring(0, indexOf);
      await FS.mkdir(cachePath, { recursive: true }); // Need Node.js 10.12 or will fail
    }
  }

  async _writeFileToCache (data) {
    try {
      await this._createCacheFolder();
      await FS.writeFile(this.filepath, data);
    } catch (error) { /* Silently fails */ }
  }
}

/** Download Function */
const downloadAsync = async (context, compilation, option) => {
  try {
    const data = await (new CacheRemoteFile(option)).getData();

    compilation.assets[option.filepath] = {
      size: () => data.length,
      source: () => data
    };

  } catch (error) {
    compilation.errors.push(new Error(error));
  } finally {
    return option;
  }
};

/** Webpack Module **/
module.exports = class PackRemoteFilePlugin {
  constructor(options) {
    if (options instanceof Array) {
      this.options = options;
    } else {
      this.options = [options];
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      { name: 'PackRemoteFilePlugin', context: true },
      async (context, compilation, callback) => {
        const downloadFile = downloadAsync.bind(this, context, compilation);

        const files = this.options.map(downloadFile);

        await Promise.all(files);

        callback();
      });
    }
};
