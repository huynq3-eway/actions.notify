import Notify, { Context, Res } from './notify';

export default class Custom extends Notify {
  constructor(webhook: string, githubCtx: Context, inputs: any) {
    super(webhook, githubCtx, inputs);
  }
  notify(): Promise<Res> {
    throw new Error('Method not implemented.');
  }
  genSin(_signKey: string | undefined, _timestamp: string): string {
    return 'Please generate signatue yourself';
  }
}