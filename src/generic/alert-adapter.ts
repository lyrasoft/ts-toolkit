export type AlertHandler = (title: string, text?: string, icon?: string, extra?: any) => Promise<void>;
export type ConfirmHandler = (title: string, text?: string, icon?: string, extra?: any) => Promise<boolean>;

export class AlertAdapter {
  static alert: AlertHandler = async (title: string) => window.alert(title);
  static confirm: ConfirmHandler = async (title: string) => {
    return new Promise<boolean>((resolve) => {
      const v = confirm(title);

      resolve(v);
    });
  };
  static deleteConfirm: ConfirmHandler = async (title: string) => this.confirm(title);

  static confirmText: () => string = () => '確認';
  static cancelText: () => string = () => '取消';
  static deleteText: () => string = () => '刪除';
}

