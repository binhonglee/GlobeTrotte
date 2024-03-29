// DO NOT EDIT THIS FILE DIRECTLY!
// Edits will be overwritten on build.
//
// If you would like to make any changes, please edit the source file (src/wings/struct/parsed_url_data.wings)
// and run the following command:
// plz build //src/wings/...

import ParsedURLError from './ParsedURLError';
import { IWingsStruct } from 'wings-ts-util';

// Parsed data from given URL.
export default class ParsedURLData implements IWingsStruct {
  [key: string]: any;
  public URL: String = '';
  public title: String = '';
  public description: String = '';
  public siteName: String = '';
  public error: ParsedURLError = ParsedURLError.None;

  public constructor(obj?: any) {
    if (obj) {
      this.URL = obj.url !== undefined && obj.url !== null ? obj.url : '';
      this.title = obj.title !== undefined && obj.title !== null ? obj.title : '';
      this.description = obj.description !== undefined && obj.description !== null ? obj.description : '';
      this.siteName = obj.site_name !== undefined && obj.site_name !== null ? obj.site_name : '';
      this.error = obj.error !== undefined && obj.error !== null ? obj.error : ParsedURLError.None;
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'URL': {
        return 'url';
      }
      case 'title': {
        return 'title';
      }
      case 'description': {
        return 'description';
      }
      case 'siteName': {
        return 'site_name';
      }
      case 'error': {
        return 'error';
      }
      default: {
        return key;
      }
    }
  }
}
