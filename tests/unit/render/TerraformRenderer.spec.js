import TerraformRender from 'src/render/TerraformRenderer';
import fs from 'fs';
import TerraformParser from 'src/parser/TerraformParser';
import {
  Component,
  ComponentAttribute,
  ComponentAttributeDefinition,
  DefaultData,
  FileInput,
} from 'leto-modelizer-plugin-core';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import { getTerraformMetadata } from 'tests/resources/utils';

describe('Test TerraformRenderer', () => {
  it('Test constructor', () => {
    expect(new TerraformRender().template).not.toBeNull();
  });

  describe('Test methods', () => {
    describe('Test method: render', () => {
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
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

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
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      describe('Should render multiple files', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
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
        parser.parse(inputs);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([
          new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          }),
          new FileInput({
            path: './link_reverse_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          }),
        ]);
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
        parser.parse([input]);
        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should render single default link', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_default_single.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
        });
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should render multiple default links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_default_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
        });
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should render single reverse link', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_reverse_single.tf',
          content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
        });
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should render multiple reverse links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './link_reverse_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8'),
        });
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should render app', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: './app.tf',
          content: fs.readFileSync('tests/resources/tf/app.tf', 'utf8'),
        });
        parser.parse([input]);

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should render with new links', () => {
        const input = new FileInput({
          path: './link_default_multiple.tf',
          content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
        });

        const pluginData = new DefaultData();
        pluginData.components = [
          new Component({
            name: 'parent_default_multiple_1',
            id: 'parent_default_multiple_1',
            path: './link_default_multiple.tf',
            definition: new TerraformComponentDefinition({
              blockType: 'resource',
              provider: 'awsLink',
              type: 'parent',
              icon: 'parent',
              model: 'DefaultModel',
              definedAttributes: [new ComponentAttributeDefinition({
                name: 'toChild',
                type: 'Link',
                linkType: 'Default',
                linkRef: 'child',
              })],
            }),
            attributes: [new ComponentAttribute({
              name: 'name',
              value: 'parent_default_multiple_1',
              type: 'String',
            }), new ComponentAttribute({
              name: 'toChild',
              value: ['child_default_multiple_1', 'child_default_multiple_2'],
              type: 'String',
            })],
          }),
          new Component({
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
          new Component({
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

        expect(new TerraformRender(pluginData).render()).toEqual([input]);
      });
    });

    describe('Fix related bugs', () => {
      it('Should fix prodiver rendering, https://github.com/ditrit/terrator-plugin/issues/22', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug22_providerRendering.tf', 'utf8'),
        });

        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();

        metadata.pluginData.components = [
          new Component({
            path: 'new_file.tf',
            id: 'object_64f4f095',
            name: 'object_64f4f095',
            definition: metadata.pluginData.definitions.components
              .find((definition) => definition.blockType === 'provider'),
          }),
        ];
        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });

      it('Should fix module rendering, https://github.com/ditrit/terrator-plugin/issues/25', () => {
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug25_moduleRendering.tf', 'utf8'),
        });

        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();

        metadata.pluginData.components = [
          new Component({
            path: 'new_file.tf',
            id: 'object_64f4f095',
            name: 'object_64f4f095',
            definition: metadata.pluginData.definitions.components
              .find(({ blockType, type }) => blockType === 'module' && type === 'server'),
          }),
        ];

        expect(new TerraformRender(metadata.pluginData).render()).toEqual([input]);
      });
    });
  });
});
