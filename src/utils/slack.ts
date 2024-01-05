import SlackNotify from 'slack-notify';
import { config } from '../config';
import { appHelper } from '../helpers';

class Slack {
  public notifyError({ requestId, clientIP, method, url, name, message, code, stack, body, query, params }) {
    if (!config.SLACK.NOTIFY) {
      return;
    }
    const slack = SlackNotify(config.SLACK.ERROR_WEBHOOK);
    slack.alert({
      text: `*[${config.SERVER.NAME}]:* *${message}*`,
      attachments: [
        {
          fallback: 'Important Message',
          color: '#FF0000',
          fields: [
            { title: 'Request Id', value: requestId, short: true },
            { title: 'Client IP', value: clientIP, short: true },
            { title: 'URL', value: `${method}: ${url}`, short: false },
            ...(!appHelper.isObjectEmpty(body) ? [{ title: 'Body', value: JSON.stringify(body), short: false }] : []),
            ...(!appHelper.isObjectEmpty(query) ? [{ title: 'Query', value: JSON.stringify(query), short: false }] : []),
            ...(!appHelper.isObjectEmpty(params) ? [{ title: 'Params', value: JSON.stringify(params), short: false }] : []),
            { title: 'Name', value: name, short: true },
            { title: 'Code', value: code?.toString(), short: true },
            { title: 'Error', value: message, short: false },
            { title: 'Stack', value: stack, short: false },
          ],
        },
      ],
    });
  }

  public notifyUnhandleError({ type, error }) {
    if (!config.SLACK.NOTIFY) {
      return;
    }
    const slack = SlackNotify(config.SLACK.ERROR_WEBHOOK);
    slack.alert({
      text: `*[${config.SERVER.NAME}]:* *UnhandleError*`,
      attachments: [
        {
          fallback: 'Important Message',
          color: '#FF0000',
          fields: [
            { title: 'Type', value: type, short: true },
            { title: 'Error', value: error?.message, short: false },
            { title: 'Stack', value: error?.stack, short: false },
          ],
        },
      ],
    });
  }
}

export const slack = new Slack();