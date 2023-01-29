import { render } from '@testing-library/react';
import Button from '..';

describe('Button', () => {
  it('should work', function () {
    const { container } = render(
      <Button type="error" text="Hello world!" onClick={() => {}} />,
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <button
    class="buttonModule.Button buttonModule.Button-error"
    type="button"
  >
    Hello world!
  </button>
</div>
`);
    expect(container).toBeInTheDocument();
  });
});
