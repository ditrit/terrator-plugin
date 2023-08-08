import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';

describe('Test class: TerraformComponentAttribute', () => {
  describe('Test constructor', () => {
    it('Check variable initialization', () => {
      const attribute = new TerraformComponentAttribute();

      expect(attribute.isDynamic).toEqual(false);
    });

    it('Check passing undefined variables to constructor', () => {
      const attribute = new TerraformComponentAttribute();

      expect(attribute.isDynamic).toEqual(false);
    });

    it('Check passing variable to constructor', () => {
      const attribute = new TerraformComponentAttribute({
        isDynamic: true,
      });

      expect(attribute.isDynamic).toEqual(true);
    });
  });

  describe('Test getter: isVariable', () => {
    it('should be false when the attribute is not a variable', () => {
      expect(new TerraformComponentAttribute({
        value: null,
      }).isVariable).toEqual(false);
      expect(new TerraformComponentAttribute({
        value: 'notAVariable',
      }).isVariable).toEqual(false);
      expect(new TerraformComponentAttribute({
        value: ['notAVariable'],
      }).isVariable).toEqual(false);
    });

    it('should be true when the attribute is a variable', () => {
      expect(new TerraformComponentAttribute({
        value: 'var.test_variable',
      }).isVariable).toEqual(true);
      expect(new TerraformComponentAttribute({
        value: 'local.test_variable',
      }).isVariable).toEqual(true);
    });
  });

  describe('Test method: addLink', () => {
    it('Should add the new link id in value array', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link1_id.id'],
      });

      terraformComponentAttribute.addLink('link_ref.link2_id.id');

      expect(terraformComponentAttribute.value)
        .toEqual(['link_ref.link1_id.id', 'link_ref.link2_id.id']);
    });

    it('Should add the new link id in value array', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link1_id.id'],
        definition: {
          linkRef: 'link_ref',
          linkAttribute: 'id',
        },
      });

      terraformComponentAttribute.addLink('link2_id');

      expect(terraformComponentAttribute.value)
        .toEqual(['link_ref.link1_id.id', 'link_ref.link2_id.id']);
    });

    it('Should do nothing if link id already exists in value array', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link_id.id'],
      });

      terraformComponentAttribute.addLink('link_ref.link_id.id');

      expect(terraformComponentAttribute.value)
        .toEqual(['link_ref.link_id.id']);
    });
  });

  describe('Test method: getLinkValue', () => {
    it('Should only return the link id in value array', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link1_id.id'],
      });

      expect(terraformComponentAttribute.getLinkValue())
        .toEqual(['link1_id']);
    });
  });

  describe('Test method: removeLink', () => {
    it('Should return false when value array is empty after link is removed', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link1_id.id'],
      });

      const result = terraformComponentAttribute.removeLink('link1_id');

      expect(result).toBe(false);
      expect(terraformComponentAttribute.value).toEqual([]);
    });

    it('Should return true when link is not removed from value array', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link1_id.id'],
      });

      const result = terraformComponentAttribute.removeLink('link2_id');

      expect(result).toBe(true);
      expect(terraformComponentAttribute.value).toEqual(['link_ref.link1_id.id']);
    });

    it('Should return true when value array is not empty after link is removed', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['link_ref.link1_id.id', 'link_ref.link2_id.id'],
      });

      const result = terraformComponentAttribute.removeLink('link2_id');

      expect(result).toBe(true);
      expect(terraformComponentAttribute.value).toEqual(['link_ref.link1_id.id']);
    });
  });

  describe('Test method: replaceLink', () => {
    it('Should replace the occurrence of oldId with newId in variable value', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['linkRef.oldId.id'],
      });

      terraformComponentAttribute.replaceLink('oldId', 'newId');

      expect(terraformComponentAttribute.value)
        .toEqual(['linkRef.newId.id']);
    });

    it('Should not replace anything when oldId does not match', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: ['linkRef.someId.id'],
      });

      terraformComponentAttribute.replaceLink('oldId', 'newId');

      expect(terraformComponentAttribute.value)
        .toEqual(['linkRef.someId.id']);
    });
  });

  describe('Test method: getReferenceValue', () => {
    it('Should return only the reference id', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: 'ref.ref_id',
      });

      expect(terraformComponentAttribute.getReferenceValue())
        .toEqual('ref_id');
    });

    it('Should return null when value format is not valid', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        value: 'ref_id',
      });

      expect(terraformComponentAttribute.getReferenceValue())
        .toEqual(null);
    });

    it('Should return null when value is not defined', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute();

      expect(terraformComponentAttribute.getReferenceValue())
        .toEqual(null);
    });
  });

  describe('Test method: setReferenceValue', () => {
    it('Should set the valid format of the reference value', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute({
        definition: {
          containerRef: 'ref',
        },
      });

      terraformComponentAttribute.setReferenceValue('ref_id');

      expect(terraformComponentAttribute.value)
        .toEqual('ref.ref_id');
    });

    it('Should return null when parameter is not defined', () => {
      const terraformComponentAttribute = new TerraformComponentAttribute();

      terraformComponentAttribute.setReferenceValue();

      expect(terraformComponentAttribute.value)
        .toEqual(null);
    });
  });
});
