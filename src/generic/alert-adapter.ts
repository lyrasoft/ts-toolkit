export type AlertHandler = (title: string, text?: string, icon?: string, extra?: any) => Promise<void>;
export type ConfirmHandler = (title: string, text?: string, icon?: string, extra?: any) => Promise<boolean>;
export type NotifyHandler = (title: string, text?: string, type?: string, extra?: any) => Promise<() => any>;
export type ClearNotifiesHandler = () => Promise<void>;

export class AlertAdapter {
  static alert: AlertHandler = async (title: string, text?: string) => {
    if (text) {
      title += ' | ' + text;
    }

    return window.alert(title);
  };
  static confirm: ConfirmHandler = async (title: string, text?: string) => {
    return new Promise<boolean>((resolve) => {
      if (text) {
        title += ' | ' + text;
      }

      const v = confirm(title);

      resolve(v);
    });
  };
  static deleteConfirm: ConfirmHandler = async (title: string, text?: string) => this.confirm(title, text);

  static notify: NotifyHandler = async (title: string, text?: string, type: string = 'log') => {
    if (text) {
      title += ' | ' + text;
    }

    if (type === 'error') {
      console.error(title);
    } else if (type === 'warn') {
      console.warn(title);
    } else {
      console.log(title);
    }

    return async () => {
      // Noop
    };
  }

  static clearNotifies: ClearNotifiesHandler = async () => {
    // Noop
  }

  static confirmText: () => string = () => 'OK';
  static cancelText: () => string = () => 'Cancel';
  static deleteText: () => string = () => 'Delete';
}

