import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

describe('Test class: TerraformComponentAttribute', () => {
    describe('Test constructor', () => {
      it('Check variable initialization', () => {
        const attribute = new TerraformComponentAttribute();
  
        expect(attribute.isDynamic).toEqual(false);
      });
  
      it('Check passing undefined variables to constructor', () => {
        const attribute = new TerraformComponentAttribute({});
  
        expect(attribute.isDynamic).toEqual(false);
      });
  
      it('Check passing variable to constructor', () => {
        const attribute = new TerraformComponentAttribute({
          isDynamic: true,
        });
  
        expect(attribute.isDynamic).toEqual(true);
      });
    });
  });
  