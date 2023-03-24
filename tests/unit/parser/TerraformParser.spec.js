import fs from 'fs';
import TerraformParser from 'src/parser/TerraformParser';
import { getTerraformMetadata } from 'tests/resources/utils';
import {
  FileInformation,
  FileInput,
} from 'leto-modelizer-plugin-core';
import app from 'tests/resources/js/app';
import attributesAndBlocks from 'tests/resources/js/attributesAndBlocks';
import complexField from 'tests/resources/js/complexField';
import doubleTags from 'tests/resources/js/doubleTags';
import emptyResource from 'tests/resources/js/emptyResource';
import linkDefaultSingle from 'tests/resources/js/linkDefaultSingle';
import linkDefaultMultiple from 'tests/resources/js/linkDefaultMultiple';
import linkReverseSingle from 'tests/resources/js/linkReverseSingle';
import linkReverseMultiple from 'tests/resources/js/linkReverseMultiple';
import subObject from 'tests/resources/js/subObject';
import objectAttributeDefinition from 'tests/resources/js/objectAttributeDefinition';
import referenceAttribute from 'tests/resources/js/referenceAttribute';

describe('Test TerraformParser', () => {
  describe('Test methods', () => {
    describe('Test method: isParsable', () => {
      const parser = new TerraformParser();

      it('Should return true on terraform file', () => {
        expect(parser.isParsable(new FileInformation({
          path: './file.tf',
        }))).toBeTruthy();
      });

      it('Should return false on file that is not a terraform file', () => {
        expect(parser.isParsable(new FileInformation({
          path: './file.txt',
        }))).toBeFalsy();
      });
    });

    describe('Test method: parse', () => {
      it('Test default parse', () => {
        const { pluginData } = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        );
        const parser = new TerraformParser(pluginData);
        parser.parse();
        expect(parser.pluginData.components).toEqual([]);
        expect(parser.pluginData.parseErrors).toEqual([]);
      });

      describe('Test parse: app.tf', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should have all elements in tf', () => {
          const input = new FileInput({
            path: './app.tf',
            content: fs.readFileSync('tests/resources/tf/app.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.components).toEqual(app);
        });
      });

      describe('Test parse: container', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/container.json',
        );
        metadata.parse();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should have valid tree', () => {
          const input = new FileInput({
            path: './container.tf',
            content: fs.readFileSync('tests/resources/tf/container.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.components.length).toEqual(2);
          expect(parser.pluginData.components[0].id).toEqual('parent');
          expect(parser.pluginData.components[1].id).toEqual('child');
        });
      });

      describe('Test parse: links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/tf/link.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should parse single default link', () => {
          const input = new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks()).toEqual(linkDefaultSingle);
        });

        it('Should parse multiple default links', () => {
          const input = new FileInput({
            path: './link_default_multiple.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks()).toEqual(linkDefaultMultiple);
        });

        it('Should parse single reverse link', () => {
          const input = new FileInput({
            path: './link_reverse_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks()).toEqual(linkReverseSingle);
        });

        it('Should parse multiple reverse links', () => {
          const input = new FileInput({
            path: './link_reverse_multiple.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8'),
          });
          parser.parse([input]);

          expect(parser.pluginData.getLinks()).toEqual(linkReverseMultiple);
        });
      });

      it('Should parsing object inside object, https://github.com/ditrit/terrator-plugin/issues/41', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug41_subObject.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual(subObject);
      });

      it('Should fix file content null, https://github.com/ditrit/terrator-plugin/issues/43', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: null,
        });

        let exception = null;
        try {
          parser.parse([input]);
        } catch (e) {
          exception = e;
        }

        expect(exception).toBeNull();
      });

      it('Should fix missing attribute definition for an object, https://github.com/ditrit/terrator-plugin/issues/48', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug48_objectAttributeDefinition.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual(objectAttributeDefinition);
      });
      it('Should parse a resource containing attributes and blocks', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/attributes_and_blocks.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual(attributesAndBlocks);
      });
      it('Should parse a resource with 2 blocks with the same name but different types', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/double_tags.tf', 'utf8'),
        });
        parser.parse([input]);
        expect(parser.pluginData.components).toEqual(doubleTags);
      });

      it('Should parse the tag attribute as a key/value list', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/complex_field.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual(complexField);
      });

      it('Should parse an empty resource', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/empty_resource.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual(emptyResource);
      });

      it('Should throw an error when parsing a resource with an invalid body syntax', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/wrong_body.tf', 'utf8'),
        });

        // Expect the parser to log an error to the console
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        parser.parse([input]);
        expect(spy).toHaveBeenCalled();
      });

      it('Should parse a resource with a reference to another resource', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/reference_attribute.tf', 'utf8'),
        });

        parser.parse([input]);

        expect(metadata.pluginData.components).toEqual(referenceAttribute);
      });
    });
  });
});
