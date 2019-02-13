import ExtendableError from "./extendableError";

export class NotFoundSheet extends ExtendableError {
  constructor(ssid: string) {
    super(
      `「${ssid}」というIDをもつスプレッドシートを確認できませんでした。IDを確認するか、スプレッドシートを作成してください。`
    );
  }
}

export class NotSetColumnName extends ExtendableError {
  constructor() {
    super(
      "DB用のカラムが設定されていません。スプレッドシートを作成してください。"
    );
  }
}
