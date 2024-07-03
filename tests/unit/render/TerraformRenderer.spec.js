import fs from 'fs';
import TerraformRender from 'src/render/TerraformRenderer';
import TerraformParser from 'src/parser/TerraformParser';
import {
  ComponentAttribute,
  FileInformation,
  FileInput,
} from 'leto-modelizer-plugin-core';
import TerraformData from 'src/models/TerraformData';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import { getTerraformMetadata } from 'tests/resources/utils';
import TerraformComponentAttributeDefinition from 'src/models/TerraformComponentAttributeDefinition';
import TerraformComponent from 'src/models/TerraformComponent';
import TerraformMetadata from 'src/metadata/TerraformMetadata';

describe('Test TerraformRenderer', () => {
  it('Test constructor', () => {
    expect(new TerraformRender().template).not.toBeNull();
  });

  describe('Test methods', () => {
    describe('Test method: renderFiles', () => {
      it('Should render container', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './container.tf',
          content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);
        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render multiple files', () => {
        const metadata = getTerraformMetadata(
          'awsLink',
          'tests/resources/metadata/simpleLink.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const inputs = [
          new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          }),
          new FileInput({
            path: './link_reverse_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          }),
        ];
        parser.parse(new FileInformation({ path: '.' }), inputs);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual(inputs);
      });

      it('Should render container with empty attributes', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './container.tf',
          content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);
        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render single default link', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/simpleLink.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_default_single.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render multiple default links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/simpleLink.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_default_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);
        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render single reverse link', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/simpleLink.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_reverse_single.tf',
          content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render multiple reverse links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/simpleLink.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_reverse_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render app', () => {
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './app.tf',
          content: fs.readFileSync('tests/resources/tf/app.tf', 'utf8'),
        });
        parser.parse(new FileInformation({ path: '.' }), [input]);
        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render with new links', () => {
        const input = new FileInput({
          path: './link_default_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
        });

        const pluginData = new TerraformData();
        const linkAttribute = new TerraformComponentAttributeDefinition({
          name: 'toChild',
          type: 'Link',
          linkType: 'Default',
          linkRef: 'child',
          linkAttribute: 'name',
        });
        pluginData.components = [
          new TerraformComponent({
            name: 'parent_default_multiple_1',
            id: 'parent_default_multiple_1',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'parent',
              icon: 'parent',
              model: 'DefaultModel',
              definedAttributes: [linkAttribute],
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'parent_default_multiple_1',
              type: 'String',
            }), new ComponentAttribute({
              name: 'toChild',
              value: ['child_default_multiple_1', 'child_default_multiple_2'],
              type: 'Array',
              definition: linkAttribute,
            })],
          }),
          new TerraformComponent({
            name: 'child_default_multiple_1',
            id: 'child_default_multiple_1',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'child',
              icon: 'child',
              model: 'DefaultModel',
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'child_default_multiple_1',
              type: 'String',
            })],
          }),
          new TerraformComponent({
            name: 'child_default_multiple_2',
            id: 'child_default_multiple_2',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'child',
              icon: 'child',
              model: 'DefaultModel',
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'child_default_multiple_2',
              type: 'String',
            })],
          }),
        ];

        expect(new TerraformRender(pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with a reference variable', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/variable_reference.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with an ID reference', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/id_reference.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with an name reference', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/name_reference.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render an output variable', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/output.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render resources referencing other resources', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/multiple_references.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource containing multiple references in one argument', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/multiple_links.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with a local variable reference', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/local_reference.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render main file', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/main.tf', 'utf8'),
        });
        const validInput = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/validMain.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([validInput]);
      });

      it('Should parse and differentiate attribute and dynamic blocks', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/complex_field.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render an empty resource', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/empty_resource.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with attributes and blocks', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/attributes_and_blocks.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with 2 tags block', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/double_tags.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a resource with a reference attribute', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/double_tags.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render an argument with an index', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/index_argument.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should render a variable with a list as default value', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/array_variable.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });
    });

    describe('Fix related bugs', () => {
      it('Should fix prodiver rendering, https://github.com/ditrit/terrator-plugin/issues/22', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug22_providerRendering.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());
        metadata.parse();

        metadata.pluginData.components = [
          new TerraformComponent({
            path: 'new_file.tf',
            id: 'object_64f4f095',
            name: 'object_64f4f095',
            definition: metadata.pluginData.definitions.components
              .find((definition) => definition.blockType === 'provider'),
          }),
        ];
        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should fix module rendering, https://github.com/ditrit/terrator-plugin/issues/25', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug25_moduleRendering.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        metadata.pluginData.components = [
          new TerraformComponent({
            path: 'new_file.tf',
            id: 'object_64f4f095',
            name: 'object_64f4f095',
            definition: metadata.pluginData.definitions.components
              .find(({ blockType, type }) => blockType === 'module' && type === 'server'),
          }),
        ];

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should fix render of an object attribute, https://github.com/ditrit/terrator-plugin/issues/46', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug41_subObject.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });

      it('Should generate unknown definition', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/unknown_components.tf', 'utf8'),
        });
        const metadata = new TerraformMetadata(new TerraformData());

        metadata.parse();

        const parser = new TerraformParser(metadata.pluginData);

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(new TerraformRender(metadata.pluginData).renderFiles()).toEqual([input]);
      });
    });
  });
});
