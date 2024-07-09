import TerraformDrawer from 'src/drawer/TerraformDrawer';
import TerraformComponentRenderer from 'src/drawer/render/TerraformComponentRenderer';

describe('Test class: TerraformDrawer', () => {
  const terraformDrawer = new TerraformDrawer();

  describe('Test method: initComponentRenderer', () => {
    it('Should return TerraformComponentRenderer', () => {
      const renderer = terraformDrawer.initComponentRenderer(false);

      expect(renderer).toEqual(new TerraformComponentRenderer(null, null, false));
    });
  });
});
