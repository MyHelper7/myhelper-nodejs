import SlackNotify from 'slack-notify';
import { config } from '../config';
import { appHelper } from '../helpers';

class Slack {
  public notifyError({ method, url, name, message, code, stack, body, query, params }) {
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
            { title: 'URL', value: `${method}: ${url}`, short: false },
            ...(!appHelper.isObjectEmpty(body) ? [{ title: 'Body', value: body, short: false }] : []),
            ...(!appHelper.isObjectEmpty(query) ? [{ title: 'Query', value: query, short: false }] : []),
            ...(!appHelper.isObjectEmpty(params) ? [{ title: 'Params', value: params, short: false }] : []),
            { title: 'Name', value: name, short: true },
            { title: 'Code', value: code?.toString(), short: true },
            { title: 'Error', value: message, short: false },
            { title: 'Stack', value: stack, short: false },
          ],
        },
      ],
    });
  }
}

export const slack = new Slack();