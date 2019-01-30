import { InternalStateProvider } from "../internal/internal";

export class LTZStateProvider extends InternalStateProvider{
  constructor(chain: string = 'LTZ') {
    super(chain);
  }
}
