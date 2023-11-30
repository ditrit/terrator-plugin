import fs from 'fs';
import TerraformParser from 'src/parser/TerraformParser';
import { getTerraformMetadata } from 'tests/resources/utils';
import {
  FileInformation,
  FileInput,
} from 'leto-modelizer-plugin-core';
import { appComponents, appVariables } from 'tests/resources/js/app';

import linkDefaultSingle from 'tests/resources/js/linkDefaultSingle';
import linkDefaultMultiple from 'tests/resources/js/linkDefaultMultiple';
import linkReverseSingle from 'tests/resources/js/linkReverseSingle';
import linkReverseMultiple from 'tests/resources/js/linkReverseMultiple';

import idReference from 'tests/resources/js/idReference';
import { nameReference, nameReferenceLink } from 'tests/resources/js/nameReference';
import multipleReferences from 'tests/resources/js/multipleReferences';
import { multipleLinks, multipleLinksLinks } from 'tests/resources/js/multipleLinks';
import { variableComponentReference, variableReference } from 'tests/resources/js/variableReference';
import { localComponentReference, localReference } from 'tests/resources/js/localReference';

import attributesAndBlocks from 'tests/resources/js/attributesAndBlocks';
import doubleTags from 'tests/resources/js/doubleTags';
import complexField from 'tests/resources/js/complexField';
import emptyResource from 'tests/resources/js/emptyResource';
import referenceAttribute from 'tests/resources/js/referenceAttribute';
import output from 'tests/resources/js/output';
import indexArgument from 'tests/resources/js/indexArgument';
import { mainComponents, mainVariables } from 'tests/resources/js/main';
import arrayVariable from 'tests/resources/js/arrayVariable';

import subObject from 'tests/resources/js/subObject';
import objectAttributeDefinition from 'tests/resources/js/objectAttributeDefinition';
import missingDefinitionOnAttribute from 'tests/resources/js/bug67_missingDefinitionOnAttribute';
import emptyListAttribute from 'tests/resources/js/bug78_emptyListAttribute';

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

    describe('Test method: getModels', () => {
      it('should return an empty array without parameter', () => {
        const parser = new TerraformParser();

        expect(parser.getModels()).toEqual([]);
      });

      it('should return an empty array if there are no files', () => {
        const parser = new TerraformParser();

        expect(parser.getModels([])).toEqual([]);
      });

      it('should return only folder path models that contain parsable files', () => {
        const parser = new TerraformParser();
        const files = [
          new FileInformation({ path: 'terraform/file.tf' }),
          new FileInformation({ path: 'terraform/readme.md' }),
          new FileInformation({ path: 'terraform/infra1/main.tf' }),
          new FileInformation({ path: 'terraform/infra1/main2.tf' }),
          new FileInformation({ path: 'common/README.md' }),
          new FileInformation({ path: 'tests/units/example.tf' }),
        ];

        expect(parser.getModels(files)).toEqual(['terraform', 'terraform/infra1', 'tests/units']);
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
          parser.parse(new FileInformation({ path: '.' }), [input]);

          expect(parser.pluginData.components).toEqual(appComponents);
          expect(parser.pluginData.variables).toEqual(appVariables);
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
          parser.parse(new FileInformation({ path: '.' }), [input]);

          expect(parser.pluginData.components.length).toEqual(2);
          expect(parser.pluginData.components[0].id).toEqual('id_1');
          expect(parser.pluginData.components[1].id).toEqual('id_2');
          expect(parser.pluginData.components[0].externalId).toEqual('parent');
          expect(parser.pluginData.components[1].externalId).toEqual('child');
        });
      });

      describe('Test parse: links', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/simpleLink.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should parse single default link', () => {
          const input = new FileInput({
            path: './link_default_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_single.tf', 'utf8'),
          });
          parser.parse(new FileInformation({ path: '.' }), [input]);

          expect(parser.pluginData.getLinks()).toEqual(linkDefaultSingle);
        });

        it('Should parse multiple default links', () => {
          const input = new FileInput({
            path: './link_default_multiple.tf',
            content: fs.readFileSync('tests/resources/tf/link_default_multiple.tf', 'utf8'),
          });
          parser.parse(new FileInformation({ path: '.' }), [input]);
          expect(parser.pluginData.getLinks()).toEqual(linkDefaultMultiple);
        });

        it('Should parse single reverse link', () => {
          const input = new FileInput({
            path: './link_reverse_single.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_single.tf', 'utf8'),
          });
          parser.parse(new FileInformation({ path: '.' }), [input]);

          expect(parser.pluginData.getLinks()).toEqual(linkReverseSingle);
        });

        it('Should parse multiple reverse links', () => {
          const input = new FileInput({
            path: './link_reverse_multiple.tf',
            content: fs.readFileSync('tests/resources/tf/link_reverse_multiple.tf', 'utf8'),
          });

          parser.parse(new FileInformation({ path: '.' }), [input]);

          expect(parser.pluginData.getLinks()).toEqual(linkReverseMultiple);
        });
      });

      describe('Test parse: references', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);

        it('Should parse a resource with an ID reference to another resource', () => {
          const input = new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/id_reference.tf', 'utf8'),
          });

          parser.parse(new FileInformation({ path: '' }), [input]);

          expect(metadata.pluginData.components).toEqual(idReference);
          expect(metadata.pluginData.getLinks()).toEqual([]);
        });

        it('Should parse a resource with a name reference to another resource', () => {
          const input = new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/name_reference.tf', 'utf8'),
          });

          parser.parse(new FileInformation({ path: '' }), [input]);

          expect(metadata.pluginData.components).toEqual(nameReference);
          expect(metadata.pluginData.getLinks()).toEqual(nameReferenceLink);
        });

        it('Should parse a subnet group with a list of references to subnets', () => {
          const input = new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/multiple_references.tf', 'utf8'),
          });

          parser.parse(new FileInformation({ path: '' }), [input]);

          expect(metadata.pluginData.components).toEqual(multipleReferences);
          // XXX: Containers have no link
          expect(metadata.pluginData.getLinks().length).toEqual(2);
        });

        it('Should parse a resource with a list of references to other resources', () => {
          const input = new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/multiple_links.tf', 'utf8'),
          });

          parser.parse(new FileInformation({ path: '' }), [input]);

          expect(metadata.pluginData.components).toEqual(multipleLinks);
          expect(metadata.pluginData.getLinks()).toEqual(multipleLinksLinks);
        });

        it('Should parse a resource with an argument refering to a input variable', () => {
          const input = new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/variable_reference.tf', 'utf8'),
          });

          parser.parse(new FileInformation({ path: '' }), [input]);

          expect(metadata.pluginData.components).toEqual(variableComponentReference);
          expect(metadata.pluginData.variables).toEqual(variableReference);
        });

        it('Should parse a resource with an argument refering to a local variable', () => {
          const input = new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/local_reference.tf', 'utf8'),
          });
          parser.parse(new FileInformation({ path: '' }), [input]);

          expect(metadata.pluginData.components).toEqual(localComponentReference);
          expect(metadata.pluginData.variables).toEqual(localReference);
        });
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

        parser.parse(new FileInformation({ path: '' }), [input]);

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
        parser.parse(new FileInformation({ path: '' }), [input]);
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

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(complexField);
      });

      it('Should parse an empty resource body', () => {
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

        parser.parse(new FileInformation({ path: '' }), [input]);

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
        const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
        parser.parse(new FileInformation({ path: '' }), [input]);
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

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(referenceAttribute);
      });

      it('Should parse an output value', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/output.tf', 'utf8'),
        });

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.variables).toEqual(output);
      });

      it('Should parse a resource with an index value', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/index_argument.tf', 'utf8'),
        });

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(indexArgument);
      });

      it('Should parse all resources and variables in main', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/main.tf', 'utf8'),
        });

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(mainComponents);
        expect(metadata.pluginData.variables).toEqual(mainVariables);
      });

      it('Should parse a variable with a list as default value', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/array_variable.tf', 'utf8'),
        });

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.variables).toEqual(arrayVariable);
        expect(metadata.pluginData.components).toEqual([]);
      });
    });

    describe('Fix related bugs', () => {
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

        parser.parse(new FileInformation({ path: '' }), [input]);

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

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(objectAttributeDefinition);
      });

      it('Should fix missing object attribute definition, https://github.com/ditrit/terrator-plugin/issues/67', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'tests/resources/metadata/bug67_missingDefinitionOnAttribute.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'new_file.tf',
          content: fs.readFileSync('tests/resources/tf/bug67_missingDefinitionOnAttribute.tf', 'utf8'),
        });

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(missingDefinitionOnAttribute);
      });

      it('Should fix empty list attribute, https://github.com/ditrit/terrator-plugin/issues/78', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );
        metadata.parse();
        metadata.pluginData.initLinkDefinitions();
        const parser = new TerraformParser(metadata.pluginData);
        const input = new FileInput({
          path: 'bug78_emptyListAttribute.tf',
          content: fs.readFileSync('tests/resources/tf/bug78_emptyListAttribute.tf', 'utf8'),
        });

        parser.parse(new FileInformation({ path: '' }), [input]);

        expect(metadata.pluginData.components).toEqual(emptyListAttribute);
      });

      it('Should only parse files into diagram folder and not in sub-folder', () => {
        const metadata = getTerraformMetadata(
          'aws',
          'src/assets/metadata/aws.json',
        );

        metadata.parse();
        metadata.pluginData.initLinkDefinitions();

        const parser = new TerraformParser(metadata.pluginData);
        const inputs = [
          new FileInput({
            path: 'other/main.tf',
            content: fs.readFileSync('tests/resources/tf/complex_field.tf', 'utf8'),
          }),
          new FileInput({
            path: 'new_file.tf',
            content: fs.readFileSync('tests/resources/tf/empty_resource.tf', 'utf8'),
          }),
        ];
        const diagram = new FileInformation({ path: '' });

        parser.parse(new FileInformation({ path: '' }), inputs);
        expect(metadata.pluginData.components).toEqual(emptyResource);

        diagram.path = '';
        parser.parse(new FileInformation({ path: '' }), inputs);
        expect(metadata.pluginData.components).toEqual(emptyResource);
      });
    });
  });
});
