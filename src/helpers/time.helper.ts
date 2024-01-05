import moment from 'moment';

class TimeHelper {
  public time() {
    return moment();
  }
}

export const timeHelper = new TimeHelper();