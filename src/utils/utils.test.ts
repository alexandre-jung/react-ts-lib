import { helloWorld } from '.';

describe('utils', () => {
  it('should work', function () {
    expect(helloWorld()).toEqual('HelloWorld()');
  });
});
