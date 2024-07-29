import { FullName } from './full-name.pipe';

describe('FullNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FullName();
    expect(pipe).toBeTruthy();
  });
});
