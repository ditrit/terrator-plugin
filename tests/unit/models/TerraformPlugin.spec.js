import TerraformPlugin from 'src/models/TerraformPlugin';

describe('Test class: TerraformPlugin', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const plugin = new TerraformPlugin();

      expect(plugin.data).not.toBeNull();
      expect(plugin.__drawer).not.toBeNull();
      expect(plugin.__parser).not.toBeNull();
      expect(plugin.__metadata).not.toBeNull();
      expect(plugin.__renderer).not.toBeNull();
    });
  });
});
