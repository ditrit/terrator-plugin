import Plugin from 'src/index';

describe('Test index of project', () => {
  it('Index should return TerraformPlugin', () => {
    expect(new Plugin().constructor.name).toEqual('TerraformPlugin');
  });
});
