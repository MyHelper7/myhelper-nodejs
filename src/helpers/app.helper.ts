class AppHelper {
  public async sleep(seconds: number) {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  public isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
}

export const appHelper = new AppHelper();
